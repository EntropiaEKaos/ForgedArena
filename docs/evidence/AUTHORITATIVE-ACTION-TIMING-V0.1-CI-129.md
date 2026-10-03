# Milestone Evidence — Authoritative Action Timing v0.1

**Date:** 2026-10-03
**CI:** #129 — GREEN
**Certified commit:** `5930b17f9a841ff3bee013ec11dde9a2c7b16f75`

## Certified behavior
- Client exposes charge state every input tick.
- Server records charge start using authoritative match ticks.
- Release power is derived from server-observed hold duration.
- Pass and shot use distinct authoritative maximum charge durations.
- GameCore clamps overcharge.
- Client HUD remains presentation feedback, not source of truth.

## Security follow-up
Remove the legacy fallback that could allow a release without active server timing to reach strike resolution with client-declared actionPower.
