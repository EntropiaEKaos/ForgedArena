# Milestone Evidence — First Touch v0.1

**Date:** 2026-10-03
**CI:** #56 — GREEN
**Certified commit:** `a7b291dc0e2ba949fc887853829640e205f73e9c`

## Certified behavior
- First touch is decided by the authoritative server.
- Control only occurs inside a contextual proximity zone.
- Excessively fast balls are not magically controlled.
- Player movement contributes to the resulting touch.
- First touch triggers once when entering the touch zone.
- Remaining beside the ball does not reapply control every simulation tick.
- Pass/shoot requests bypass passive first-touch handling.

## Automated tests
- Distant ball cannot be controlled.
- Excessively fast ball cannot be controlled.
- Nearby controllable ball is settled.
- Moving player transfers momentum into the touch.

## Engineering principle
The ball remains physically free. First Touch is a contextual physical interaction, not a magnetic attachment system.

## Visual evidence
Real ingame screenshot remains pending browser execution of the actual client/server build. Synthetic evidence is not accepted.

## Next gate
Dribble / Carry v0.1: repeated but discrete micro-touches while moving, with strict range, cadence and speed limits.
