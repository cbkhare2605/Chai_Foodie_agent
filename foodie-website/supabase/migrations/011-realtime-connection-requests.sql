-- Enable Realtime for connection_requests so users get notified when someone wants to connect
-- Run this once. If you get "already member" error, the table is already in the publication.
alter publication supabase_realtime add table connection_requests;
