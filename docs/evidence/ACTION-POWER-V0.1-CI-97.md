# Milestone Evidence — Action Power v0.1

**Date:** 2026-10-03
**CI:** #97 — GREEN
**Certified commit:** `e9bb389fb4cc2dcd7273ce73a332d661bd4accce`

## Certified behavior
- PlayerInput carries normalized actionPower.
- GameCore clamps untrusted values to 0..1.
- Ground pass maps to a 0.34..0.82 power curve.
- Shot maps to a 0.46..1.00 power curve.
- Pass and shot remain distinct football actions.
- Server remains authoritative over strike range, cooldown and final ball state.

## Automated coverage
- Pass power floor.
- Shot power ceiling.
- Distinct pass/shot curves.
- Existing range, aim and cooldown behavior remains covered.

## Next gate
Charge & Release v0.1: hold E/Space to charge, release once to send the action, with HUD feedback and no repeated strike spam.
