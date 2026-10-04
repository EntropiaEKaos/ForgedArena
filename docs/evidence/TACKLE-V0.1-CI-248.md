# Milestone Evidence — Tackle v0.1

**Date:** 2026-10-04
**CI:** #248 — GREEN
**Certified commit:** `bf7e0563d064b4f03e2dc6337f94157ef9494e7f`

## Certified behavior
- Tackle is resolved authoritatively in GameCore/server.
- Client sends a one-shot tackle intent with F; holding the key does not repeatedly fire tackles.
- Each player/session owns an authoritative tackle cooldown.
- Tackle validates ball range and player facing direction.
- Zero/invalid facing is rejected.
- Exact range boundary is covered by tests.
- Knock velocity is deterministic and bounded.
- A successful tackle has priority over First Touch, Strike and Carry for that simulation tick.
- No RNG is used in tackle resolution.

## Current tuning
- Range: 1.7
- Cooldown: 24 ticks
- Horizontal knock speed: 10.5
- Minimum facing dot: 0.2

## Competitive invariant
The client only expresses tackle intent. Range, facing, cooldown and ball response are resolved by the authoritative simulation.
