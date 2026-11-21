# SSAG Command Center: service status

## Not ready for live use

The old service accepted deal names and values from anyone who could reach it, allowed any website to connect, and kept records only in server memory. Those records disappeared when the server restarted. It had no verified sign-in or user permissions.

Deal entry, deal lists, and deal totals are now paused. The backend returns an unavailable response for those routes until a protected sign-in and durable database are built and verified. The web page explains this limitation and does not offer a working deal-entry form.

Do not enter real customer, payment, or private business information into this service. A health response only means the server process answered; it does not mean that the CRM works.

## Before reopening deal features

- Add account sign-in and owner/admin access checks.
- Connect durable storage and backups.
- Confirm data belongs to the right account.
- Verify a real authorized record saves and is still there after a restart.
- Re-enable deal entry only after that evidence exists.

Follow the repository's `AGENTS.md` and record what was actually checked in plain language.
