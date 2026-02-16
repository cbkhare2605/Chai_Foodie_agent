/**
 * Foodie API - Supabase backend for database-backed demo mode
 * Load after config.js and Supabase client. When SUPABASE_URL is set, uses Supabase.
 */
(function() {
  const cfg = window.FOODIE_CONFIG || {};
  const url = (cfg.SUPABASE_URL || '').trim();
  const key = (cfg.SUPABASE_ANON_KEY || '').trim();
  if (!url || !key) {
    window.FOODIE_API = { enabled: false };
    return;
  }

  let supabase;
  try {
    supabase = window.supabase?.createClient(url, key);
  } catch (e) {
    console.warn('Foodie API: Supabase init failed', e);
    window.FOODIE_API = { enabled: false };
    return;
  }

  async function getProfileByUserId(uid) {
    const { data } = await supabase.from('profiles').select('display_name, bio, avatar_url').eq('id', uid).single();
    return data;
  }

  async function loadData(sessionOrUser) {
    let user = sessionOrUser?.user || sessionOrUser;
    if (!user) {
      const { data: { user: u } } = await supabase.auth.getUser();
      user = u;
    }
    if (!user) {
      return { user: null, reviews: [], comments: {}, connections: {}, connectionRequests: [], saved: [], notifications: [], profiles: {}, privateNotes: {}, groupLists: {}, trustScores: {}, groups: [] };
    }

    const myProfile = await getProfileByUserId(user.id);
    const displayName = myProfile?.display_name || user.email?.split('@')[0] || 'User';

    const [reviewsRes, commentsRes, connRes, reqRes, savedRes, notesRes, notifRes, listRes, profilesRes, likesRes, groupsRes, groupMembersRes] = await Promise.all([
      supabase.from('reviews').select('*').order('created_at', { ascending: false }),
      supabase.from('comments').select('*'),
      supabase.from('connections').select('user_a, user_b'),
      supabase.from('connection_requests').select('*'),
      supabase.from('saved').select('saved_key').eq('user_id', user.id),
      supabase.from('private_notes').select('review_id, note').eq('user_id', user.id),
      supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(50),
      supabase.from('group_list_items').select('list_name, saved_key').eq('user_id', user.id),
      supabase.from('profiles').select('id, display_name, bio, avatar_url'),
      supabase.from('review_likes').select('review_id, user_id'),
      supabase.from('groups').select('id, name, created_by, created_at'),
      supabase.from('group_members').select('group_id, user_id')
    ]);

    const groupsDebug = {
      userId: user.id,
      displayName,
      groupsRaw: groupsRes.data,
      groupsError: groupsRes.error?.message || null,
      groupMembersRaw: groupMembersRes.data,
      groupMembersError: groupMembersRes.error?.message || null
    };

    const profileById = {};
    (profilesRes.data || []).forEach(p => { profileById[p.id] = p; });

    const RETENTION_WEEKS = 8;
    const retentionMs = RETENTION_WEEKS * 7 * 24 * 60 * 60 * 1000;
    const visibleReviews = (reviewsRes.data || []).filter(r => {
      if (!r.deleted_at) return true;
      return Date.now() - new Date(r.deleted_at).getTime() < retentionMs;
    });
    const likesByReview = {};
    (likesRes.data || []).forEach(l => {
      if (!likesByReview[l.review_id]) likesByReview[l.review_id] = [];
      const name = profileById[l.user_id]?.display_name;
      if (name) likesByReview[l.review_id].push(name);
    });
    const allReviews = visibleReviews.map(r => {
      const likedBy = likesByReview[r.id] || [];
      return {
        id: r.id,
        restaurant: r.restaurant,
        lat: r.lat,
        lng: r.lng,
        by: profileById[r.user_id]?.display_name || 'Unknown',
        text: r.text,
        rating: r.rating,
        date: r.created_at,
        cuisine: r.cuisine || 'Various',
        price: r.price || 2,
        photos: r.photos || [],
        verifiedVisit: r.verified_visit || false,
        wouldGoAgain: r.would_go_again !== false,
        likes: likedBy.length,
        liked: likedBy.includes(displayName),
        likedBy
      };
    });

    const connections = {};
    for (const c of (connRes.data || [])) {
      const nameA = profileById[c.user_a]?.display_name;
      const nameB = profileById[c.user_b]?.display_name;
      if (nameA && nameB) {
        if (!connections[nameA]) connections[nameA] = [];
        if (!connections[nameA].includes(nameB)) connections[nameA].push(nameB);
        if (!connections[nameB]) connections[nameB] = [];
        if (!connections[nameB].includes(nameA)) connections[nameB].push(nameA);
      }
    }

    const visibleNames = new Set([displayName]);
    (connections[displayName] || []).forEach(c => { visibleNames.add(c); });
    (connections[displayName] || []).forEach(friend => {
      (connections[friend] || []).forEach(fof => visibleNames.add(fof));
    });
    let reviews = allReviews.filter(r => visibleNames.has(r.by)).sort((a, b) => (b.date || 0) - (a.date || 0));

    const comments = {};
    for (const c of (commentsRes.data || [])) {
      if (!comments[c.review_id]) comments[c.review_id] = [];
      comments[c.review_id].push({
        by: profileById[c.user_id]?.display_name || 'Unknown',
        text: c.text
      });
    }

    const connectionRequests = [];
    for (const r of (reqRes.data || [])) {
      const fromName = profileById[r.from_user]?.display_name || 'Unknown';
      const toName = profileById[r.to_user]?.display_name || 'Unknown';
      connectionRequests.push({ id: r.id, from: fromName, to: toName, status: r.status, date: r.created_at });
    }

    const saved = (savedRes.data || []).map(s => s.saved_key);
    const privateNotes = {};
    (notesRes.data || []).forEach(n => { privateNotes[n.review_id] = n.note; });
    const notifications = (notifRes.data || []).map(n => ({
      id: n.id,
      type: n.type,
      text: n.text,
      read: n.read,
      recipient: n.recipient,
      date: n.created_at
    }));
    const groupLists = {};
    (listRes.data || []).forEach(l => {
      if (!groupLists[l.list_name]) groupLists[l.list_name] = [];
      groupLists[l.list_name].push(l.saved_key);
    });
    const profiles = {};
    (profilesRes.data || []).forEach(p => {
      profiles[p.display_name] = { bio: p.bio, avatar: p.avatar_url };
    });

    const groups = [];
    const membersByGroup = {};
    (groupMembersRes.data || []).forEach(gm => {
      if (!membersByGroup[gm.group_id]) membersByGroup[gm.group_id] = [];
      const name = profileById[gm.user_id]?.display_name || (gm.user_id === user.id ? displayName : null);
      if (name) membersByGroup[gm.group_id].push(name);
    });
    (groupsRes.data || []).forEach(g => {
      const memberNames = membersByGroup[g.id] || [];
      const isCreator = g.created_by === user.id;
      const isMemberByName = memberNames.some(m => m && displayName && String(m).trim().toLowerCase() === String(displayName).trim().toLowerCase());
      if (isCreator || isMemberByName || memberNames.includes(displayName)) {
        const names = memberNames.length ? memberNames : (isCreator ? [displayName] : []);
        groups.push({
          id: g.id,
          name: g.name,
          createdBy: profileById[g.created_by]?.display_name || 'Unknown',
          memberNames: names
        });
      }
    });

    return {
      user: { id: user.id, displayName },
      reviews,
      comments,
      connections,
      connectionRequests,
      saved,
      notifications,
      profiles,
      privateNotes,
      groupLists,
      trustScores: {},
      groups,
      groupsDebug
    };
  }

  async function createGroup(name) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not logged in');
    const norm = (n) => (n || '').trim().replace(/\s+/g, ' ').toLowerCase();
    const { data: existing } = await supabase.from('groups').select('id, name');
    const match = (existing || []).find(g => norm(g.name) === norm(name));
    if (match) throw new Error('You already have a group named "' + match.name + '". Use a different name.');
    const id = 'g_' + crypto.randomUUID().replace(/-/g, '');
    const { error: groupErr } = await supabase.from('groups').insert({ id, name, created_by: user.id });
    if (groupErr) throw groupErr;
    return id;
  }

  async function addGroupMember(groupId, userId) {
    const { error } = await supabase.from('group_members').insert({ group_id: groupId, user_id: userId });
    if (error) throw error;
  }

  async function addGroupMemberByName(groupId, displayName) {
    const userId = await getUserIdByDisplayName(displayName);
    if (!userId) throw new Error('User not found');
    await addGroupMember(groupId, userId);
  }

  async function removeGroupMember(groupId, userId) {
    const { error } = await supabase.from('group_members').delete().eq('group_id', groupId).eq('user_id', userId);
    if (error) throw error;
  }

  async function leaveGroup(groupId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not logged in');
    await removeGroupMember(groupId, user.id);
  }

  async function deleteGroup(groupId) {
    const { error } = await supabase.from('groups').delete().eq('id', groupId);
    if (error) throw error;
  }

  async function signUp(email, password, displayName) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } }
    });
    if (error) throw error;
    if (data.user) {
      await supabase.from('profiles').update({ display_name: displayName }).eq('id', data.user.id);
    }
    return data;
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function getUserIdByDisplayName(displayName) {
    const { data } = await supabase.from('profiles').select('id').eq('display_name', displayName.trim()).single();
    return data?.id;
  }

  async function searchProfiles(query) {
    const q = (query || '').trim();
    if (q.length < 2) return [];
    const { data } = await supabase.from('profiles').select('id, display_name, avatar_url').ilike('display_name', '%' + q + '%').limit(20);
    return (data || []).map(p => ({ id: p.id, displayName: p.display_name, avatarUrl: p.avatar_url }));
  }

  async function saveReview(review) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not signed in');
    const photos = (review.photos || []).filter(p => typeof p === 'string' && p.startsWith('data:image'));
    const { error } = await supabase.from('reviews').upsert({
      id: review.id,
      user_id: user.id,
      restaurant: review.restaurant,
      lat: review.lat,
      lng: review.lng,
      text: review.text,
      rating: review.rating,
      cuisine: review.cuisine || 'Various',
      price: review.price || 2,
      photos: photos,
      verified_visit: !!review.verifiedVisit,
      would_go_again: review.wouldGoAgain !== false,
      likes: review.likes || 0,
      created_at: review.date
    }, { onConflict: 'id' });
    if (error) throw error;
  }

  async function deleteReview(id) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not signed in');
    const { error } = await supabase.from('reviews').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('user_id', user.id);
    if (error) throw error;
  }

  async function fixReviewLocation(reviewId, lat, lng) {
    const { error } = await supabase.rpc('fix_review_location', {
      p_review_id: reviewId,
      p_lat: lat,
      p_lng: lng
    });
    if (error) throw error;
  }

  async function toggleLike(reviewId, add) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not signed in');
    if (add) {
      const { error } = await supabase.from('review_likes').upsert({ review_id: reviewId, user_id: user.id }, { onConflict: 'review_id,user_id' });
      if (error) throw error;
    } else {
      const { error } = await supabase.from('review_likes').delete().eq('review_id', reviewId).eq('user_id', user.id);
      if (error) throw error;
    }
  }

  async function addComment(reviewId, text) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('comments').insert({
      id: 'c' + Date.now() + '-' + Math.random().toString(36).slice(2),
      review_id: reviewId,
      user_id: user.id,
      text: text,
      created_at: Date.now()
    });
  }

  async function sendConnectionRequest(toDisplayName, reqId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const toId = await getUserIdByDisplayName(toDisplayName);
    if (!toId || toId === user.id) return;
    const id = reqId || 'req' + Date.now();
    await supabase.from('connection_requests').insert({
      id: id,
      from_user: user.id,
      to_user: toId,
      status: 'pending',
      created_at: Date.now()
    });
    await supabase.from('notifications').insert({
      id: 'n' + Date.now(),
      user_id: toId,
      type: 'connection_request',
      text: (await getProfileByUserId(user.id))?.display_name + ' wants to connect with you',
      read: false,
      created_at: Date.now()
    });
  }

  async function acceptConnectionRequest(reqId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: req } = await supabase.from('connection_requests').select('*').eq('id', reqId).eq('to_user', user.id).single();
    if (!req) return;
    const ua = req.from_user < req.to_user ? req.from_user : req.to_user;
    const ub = req.from_user < req.to_user ? req.to_user : req.from_user;
    await supabase.from('connections').insert({ user_a: ua, user_b: ub });
    await supabase.from('connection_requests').update({ status: 'accepted' }).eq('id', reqId);
    await supabase.from('notifications').insert({
      id: 'n' + Date.now(),
      user_id: req.from_user,
      type: 'connection',
      text: 'You and ' + (await getProfileByUserId(user.id))?.display_name + ' are now connected.',
      read: false,
      created_at: Date.now()
    });
  }

  async function ignoreConnectionRequest(reqId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('connection_requests').update({ status: 'ignored' }).eq('id', reqId).eq('to_user', user.id);
  }

  async function cancelConnectionRequest(reqId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('connection_requests').update({ status: 'cancelled' }).eq('id', reqId).eq('from_user', user.id);
  }

  async function removeConnection(otherDisplayName) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const otherId = await getUserIdByDisplayName(otherDisplayName);
    if (!otherId) return;
    const ua = user.id < otherId ? user.id : otherId;
    const ub = user.id < otherId ? otherId : user.id;
    await supabase.from('connections').delete().eq('user_a', ua).eq('user_b', ub);
  }

  async function toggleSave(savedKey, add) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    if (add) {
      await supabase.from('saved').upsert({ user_id: user.id, saved_key: savedKey }, { onConflict: 'user_id,saved_key' });
    } else {
      await supabase.from('saved').delete().eq('user_id', user.id).eq('saved_key', savedKey);
    }
  }

  async function setPrivateNote(reviewId, note) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('private_notes').upsert({ user_id: user.id, review_id: reviewId, note: note || null }, { onConflict: 'user_id,review_id' });
  }

  async function toggleList(listName, savedKey, add) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not signed in');
    if (add) {
      const { error } = await supabase.from('group_list_items').upsert({ user_id: user.id, list_name: listName, saved_key: savedKey }, { onConflict: 'user_id,list_name,saved_key' });
      if (error) throw error;
    } else {
      const { error } = await supabase.from('group_list_items').delete().eq('user_id', user.id).eq('list_name', listName).eq('saved_key', savedKey);
      if (error) throw error;
    }
  }

  async function updateProfile(displayName, bio, avatarUrl) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('profiles').update({ display_name: displayName, bio: bio || null, avatar_url: avatarUrl || null, updated_at: new Date().toISOString() }).eq('id', user.id);
  }

  async function resetPasswordForEmail(email) {
    const redirectTo = typeof location !== 'undefined' ? (location.origin + location.pathname).replace(/\/index\.html$/i, '/') : '';
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
    if (error) throw error;
  }

  async function updateUserPassword(newPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  }

  window.FOODIE_API = {
    enabled: true,
    supabase,
    loadData,
    getProfileByUserId,
    signUp,
    signIn,
    signOut,
    getUserIdByDisplayName,
    searchProfiles,
    saveReview,
    deleteReview,
    fixReviewLocation,
    toggleLike: toggleLike,
    addComment,
    sendConnectionRequest,
    acceptConnectionRequest,
    ignoreConnectionRequest,
    cancelConnectionRequest,
    removeConnection,
    toggleSave,
    setPrivateNote,
    toggleList,
    updateProfile,
    resetPasswordForEmail,
    updateUserPassword,
    createGroup,
    addGroupMember,
    addGroupMemberByName,
    removeGroupMember,
    leaveGroup,
    deleteGroup
  };
})();
