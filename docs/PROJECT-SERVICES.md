# Project Services & Accounts

**Purpose:** Track external sites/services where this project has accounts. Do **not** store passwords here—use a password manager for credentials.

**Last updated:** 2025-02-15

---

## Services with login/password

| Service | URL | Purpose | Notes |
|---------|-----|---------|-------|
| **Supabase** | https://supabase.com/dashboard | Database, Auth | Project: Foodie demo. Credentials in password manager. |
| **Vercel** | https://vercel.com/dashboard | Hosting, deployment | Deploys from GitHub. Credentials in password manager. |
| **GitHub** | https://github.com | Code repo, triggers Vercel | Repo: Chai_Foodie_agent. Credentials in password manager. |

---

## Live app (user-facing)

| App | URL | Auth |
|-----|-----|------|
| **Foodie** | *(Add your Vercel URL here, e.g. https://chai-foodie-agent-xxx.vercel.app)* | Supabase Auth (email signup/login) |

---

## How to use

1. **Add new services:** When you create an account for this project, add a row to the table above (URL, purpose, no passwords).
2. **Store credentials:** Use 1Password, Bitwarden, or similar. Do not commit passwords to the repo.
3. **Update live URL:** Replace the placeholder with your actual Vercel URL once you have it.
