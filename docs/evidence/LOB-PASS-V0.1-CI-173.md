# Milestone Evidence — Lob Pass v0.1

**Date:** 2026-10-03
**CI:** #173 — GREEN
**Certified commit:** `619a7324a787a442c7c550f8d68636c7bb2e736e`

## Certified behavior
- Q is the dedicated Lob Pass input.
- Lob charge is observed and timed by the authoritative server.
- Lob has its own 27-tick maximum charge window.
- Release kind must match the action that started charging.
- Switching action kind cannot reset authoritative charge timing.
- Carry is suppressed while a football action is charging.
- GameCore resolves Lob as `lob-pass`, not a cosmetic ground pass.
- Physics applies substantially more vertical lift than ground pass.
- Automated tests cover dedicated Lob resolution and lift comparison.

## Design rule preserved
The mechanic is part of the shared football core and does not depend on character abilities, randomness, or mode-specific rules.
