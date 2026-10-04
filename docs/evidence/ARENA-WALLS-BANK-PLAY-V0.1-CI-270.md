# Milestone Evidence — Arena Walls / Bank Play v0.1

**Date:** 2026-10-04
**CI:** #270 — GREEN
**Certified commit:** `c17905b950408c6dda8069dfe2cce0ea813e4bff`

## Certified behavior
- Closed arena uses four authoritative Rapier wall colliders.
- Client renders the same arena geometry from shared `@forged-arena/physics` tuning.
- Wall restitution and friction are explicit, bounded tuning.
- Deterministic rebound oracle verifies incoming/outgoing wall trajectories.
- Normal-axis rebound cannot gain energy.
- Tangential and vertical velocity components are preserved by the rebound oracle.
- Equivalent left/right bank plays are mirrored.
- Spin remains independent state across rebound.
- Magnus naturally recomputes curve from post-wall velocity.
- Opposite spin produces mirrored curved bank behavior.
- Neutral spin produces zero Magnus acceleration after a bank.
- No RNG or artificial wall-curve rule is used.

## Arena tuning
- Half width: 12
- Half depth: 7
- Wall thickness: 0.3
- Wall height: 2.4
- Wall restitution: 0.82
- Wall friction: 0.22

## Competitive invariant
The server owns collision physics. Shared tuning prevents client/server arena geometry drift; tests provide deterministic reference behavior for bank plays.
