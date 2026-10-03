# Milestone Evidence — Mouse Aim v0.1

**Date:** 2026-10-03
**CI:** #83 — GREEN
**Certified commit:** `57f0a4d837f14fa12b74b41fa8126e32edbbb07a`

## Certified behavior
- Pointer is projected through the isometric Three.js camera onto the pitch plane.
- The client converts that world-space target into normalized aimX/aimZ.
- A world-space direction marker gives immediate visual feedback.
- Movement remains independent from football aim.
- Server remains authoritative over strike validation and ball state.

## Controls
WASD movement · Shift sprint · Mouse aim · E pass · Space shot

## Next gate
Action Power v0.1: normalized charge intent, server clamping/validation, GameCore power mapping and client feedback.

## Visual evidence
A real browser screenshot is still pending actual client/server browser execution. Synthetic screenshots are not accepted.
