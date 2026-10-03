# Milestone Evidence — Football Interaction v0.1

**Date:** 2026-10-03  
**CI:** #47 — GREEN  
**Certified commit:** `711d618ad91be1f0f79f2a3ed063b1f5091d56b2`

## Certified behavior
- Client sends pass/shoot intent only.
- Server validates ball range.
- Server enforces strike cooldown.
- Server chooses whether the action is valid.
- GameCore resolves ground-pass vs shot.
- Ball Model calculates strike velocity/spin.
- Rapier receives the authoritative ball velocity.
- Client renders snapshots instead of authoring ball state.

## Automated interaction tests
- Reject strike outside server range.
- Ground pass succeeds in valid range.
- Shot is selected when requested.
- Cooldown rejects repeated strike spam.

## Controls in current client
- WASD: movement
- Shift: sprint
- E: ground pass
- Space: shot

## Visual evidence
A real ingame screenshot is intentionally pending until the client/server build is executed in a browser. No synthetic screenshot is accepted as engineering evidence.

## Next gate
First Touch v0.1: contextual ball control based on proximity and relative ball speed, without hard magnetic attachment.
