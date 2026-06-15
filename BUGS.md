# Bugs and Observations

The following items were identified during exploratory review. Automated
execution results should be used as the final pass/fail evidence for covered
flows.

## BUG-001: User name validation has no maximum length

- **Severity:** Low
- **Steps:** Register with a very long name (for example, 500 characters).
- **Actual:** The input and application contract expose a minimum of two
  characters but no maximum; long identity text can be stored and is then
  truncated in navigation.
- **Expected:** A documented, consistently enforced maximum should protect
  usability and storage.
- **Notes:** The exact desired maximum requires a product decision.

## OBS-001: New Game and Reset appear behaviorally equivalent

- **Severity:** Informational
- **Steps:** Make moves; use New Game. Repeat and use Reset.
- **Actual:** Both controls return the board to a new initial game.
- **Expected:** Controls should have distinct intent or one should be removed.
- **Notes:** Confirm whether Reset was intended to restore a different state.

## OBS-002: Accounts are browser-local and unauthenticated

- **Severity:** Informational / product limitation
- **Steps:** Register any name; inspect browser storage or open another browser
  profile.
- **Actual:** A name is the only credential and all records are browser-local.
- **Expected:** Acceptable for a demo game; not suitable for real account or
  security requirements.

## OBS-003: Name matching rules are not communicated

- **Severity:** Informational
- **Steps:** Compare login/registration behavior for case, surrounding spaces,
  and visually equivalent Unicode names.
- **Actual:** The UI does not state how names are normalized or compared.
- **Expected:** Matching rules should be consistent and documented if names are
  account identifiers.
