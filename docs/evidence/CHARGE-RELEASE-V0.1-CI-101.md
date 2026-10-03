# Milestone Evidence — Charge & Release v0.1

**Date:** 2026-10-03
**CI:** #101 — GREEN
**Certified commit:** `7277beca8a1ee646266c648ede75287572ce7b5d`

## Certified behavior
- Pass and shot charge while the action key is held.
- Action is emitted once on key release rather than continuously while held.
- Pass reaches full charge around 700 ms.
- Shot reaches full charge around 1100 ms.
- HUD displays normalized charge feedback from 0–100%.
- Server still validates the resulting action and owns ball state.

## Next gate
Deterministic Precision v0.1: execution quality derived from player intent/timing without hidden competitive RNG.
