# Milestone Evidence — Precision Hardening v0.1

**Date:** 2026-10-04
**CI:** #199 — GREEN
**Certified commit:** `dc21a657df671cec3b955427c4f59660f9221f81`

## Certified behavior
- Neutral timing bias produces exactly zero lateral angular deviation.
- Power error can reduce execution quality without inventing a left/right direction.
- Negative timing bias produces signed negative deviation.
- Positive timing bias produces signed positive deviation.
- Deviation remains bounded by the deterministic precision limit.
- No hidden RNG is introduced.

## Why this gate exists
Curved Shot / Spin must use explicit player intent for curve direction. The precision model may affect quality, but it must not fabricate curve direction.
