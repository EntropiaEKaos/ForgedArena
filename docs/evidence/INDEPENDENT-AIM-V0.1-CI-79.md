# Milestone Evidence — Independent Aim v0.1

**Date:** 2026-10-03
**CI:** #79 — GREEN
**Certified commit:** `5cd6b3ea121e9c69069c1eee9637cea38cee8349`

## Certified behavior
- PlayerInput separates movement (moveX/moveZ) from football aim (aimX/aimZ).
- WASD controls movement independently.
- Arrow keys provide the first independent aim implementation.
- Pass and shot resolve from aim rather than movement direction.
- Server remains authoritative over strike validity and ball state.
- Automated coverage proves movement and strike aim can point in different directions.

## Current controls
- WASD: movement
- Shift: sprint
- Arrow keys: aim
- E: ground pass
- Space: shot

## Next gate
Mouse Aim v0.1: project pointer through the isometric camera onto the pitch and convert the result into normalized football aim, with a visible direction indicator. Gamepad follows the same protocol contract.

## Visual evidence
Real ingame screenshot remains pending execution of the actual browser client/server build. Synthetic screenshots are not accepted.
