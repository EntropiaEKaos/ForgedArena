# Milestone Evidence — Dribble / Carry v0.1

**Date:** 2026-10-03
**CI:** #66 — GREEN
**Certified commit:** `b0beb10513850532a6daf0b60c36067a70e217bb`

## Certified behavior
- Carry is resolved by the authoritative server.
- Carry uses discrete micro-touches rather than attaching the ball to the player.
- Movement is required.
- Ball must remain inside carry range.
- Carry cadence prevents per-tick magnetic correction.
- Fast escaping balls cannot be recaptured by carry.
- Pass/shoot actions take priority over carry.
- First Touch and Carry remain separate mechanics.

## Automated tests
- Requires movement.
- Requires ball range.
- Enforces cadence.
- Rejects fast escaping ball.
- Produces forward micro-touch.

## Certified football loop
Run → First Touch → Carry → Pass / Shoot.

## Visual evidence
Real browser screenshot remains pending actual client/server execution; synthetic screenshots are not accepted.

## Next gate
Independent aim: movement direction and football action direction become separate input concepts.
