# Milestone Evidence — Placed Shot v0.1

**Date:** 2026-10-03
**CI:** #194 — GREEN
**Certified commit:** `0cb8f1c4e8a0bb0323839c30e11abf8ba6e8e39f`

## Certified behavior
- R is the dedicated Placed Shot input.
- Placed Shot uses authoritative charge/release timing with a 30-tick maximum window.
- Server validates release kind against the action that began charging.
- GameCore resolves the action as the dedicated `placed-shot` StrikeKind.
- Placed Shot uses the shot power curve while preserving its dedicated physics profile.
- Automated tests cover dedicated resolution and power behavior.
- Client remains presentation/input only; strike power authority remains server-side.

## Design rule preserved
Placed Shot extends the shared football core without randomness, character abilities, or mode-specific dependencies.
