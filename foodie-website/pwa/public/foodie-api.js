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

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { user: null, reviews: [], comments: {}, connections: {}, connectionRequests: [], saved: [], notifications: [], profiles: {}, privateNotes: {}, groupLists: {}, trustScores: {} };
    }

    const myProfile = await getProfileByUserId(user.id);
    const displayName = myProfile?.display_name || user.email?.split('@')[0] || 'User';

    const [reviewsRes, commentsRes, connRes, reqRes, savedRes, notesRes, notifRes, listRes, profilesRes] = await Promise.all([
      supabase.from('reviews').select('*').order('created_at', { ascending: false }),
      supabase.from('comments').select('*'),
      supabase.from('connections').select('user_a, user_b'),
      supabase.from('connection_requests').select('*'),
      supabase.from('saved').select('saved_key').eq('user_id', user.id),
      supabase.from('private_notes').select('review_id, note').eq('user_id', user.id),
      supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(50),
      supabase.from('group_list_items').select('list_name, saved_key').eq('user_id', user.id),
      supabase.from('profiles').select('id, display_name, bio, avatar_url')
    ]);

    const profileById = {};
    (profilesRes.data || []).forEach(p => { profileById[p.id] = p; });

    const reviews = (reviewsRes.data || []).map(r => ({
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
      likes: r.likes || 0,
      liked: false
    }));

    const comments = {};
    for (const c of (commentsRes.data || [])) {
      if (!comments[c.review_id]) comments[c.review_id] = [];
      comments[c.review_id].push({
        by: profileById[c.user_id]?.display_name || 'Unknown',
        text: c.text
      });
    }

    const connections = {};
    for (const c of (connRes.data || [])) {
      const otherId = c.user_a === user.id ? c.user_b : c.user_a;
      const otherName = profileById[otherId]?.display_name;
      if (otherName) {
        if (!connections[displayName]) connections[displayName] = [];
        if (!connections[displayName].includes(otherName)) connections[displayName].push(otherName);
      }
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
      trustScores: {}
    };
  }

  window.FOODIE_API = {
    enabled: true,
    supabase,
    loadData,
    getProfileByUserId
  };
})();
