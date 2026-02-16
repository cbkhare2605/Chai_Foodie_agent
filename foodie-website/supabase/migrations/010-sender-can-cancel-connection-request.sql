-- Allow sender (from_user) to cancel their own pending connection request
create policy "Users can cancel requests they sent" on connection_requests for update using (auth.uid() = from_user);
