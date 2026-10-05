# Milestone Evidence — Timing Grade + Release Hardening v0.1

**Date:** 2026-10-03
**CI:** #136 — GREEN
**Certified commit:** `0996a9432f7de39aa100ce80347cf95692756aa2`

## Certified behavior
- Untimed releases are rejected by the server.
- Mismatched charged/released action kinds are rejected.
- Client actionPower cannot be used as a fallback authority.
- Deterministic timing grades exist: EARLY, GOOD, PERFECT, LATE.
- Grade windows are clamped and covered by automated tests.

## Next gate
Server-produced execution feedback delivered to the owning client/HUD.
