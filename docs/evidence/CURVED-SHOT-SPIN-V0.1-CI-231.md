# Milestone Evidence — Curved Shot / Spin v0.1

**Date:** 2026-10-04
**CI:** #231 — GREEN
**Certified commit:** `b7a8787cebd8a9243dcf4b544935f83dc777d8a9`

## Certified behavior
- PlayerInput carries signed spin intent.
- GameCore sanitizes non-finite values and clamps spin to [-1, 1].
- Curve is eligible only for shot and placed-shot; ground pass and lob pass remain neutral.
- Physics converts signed intent into bounded ball yaw spin.
- Authoritative server applies Magnus force from the ball's actual angular and linear velocity.
- Left/right spin and Magnus behavior are covered as mirrored deterministic cases.
- Neutral spin produces no yaw.
- Client exposes Z = left, X = right, C = neutral with HUD feedback.
- Placed-shot release cannot leak into carry behavior.
- No RNG and no client-controlled raw angular velocity.

## Competitive invariant
The client expresses curve intent only. Server/GameCore validates magnitude and the authoritative physics simulation determines the resulting trajectory.
