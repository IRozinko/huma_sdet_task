# Testing Notes

## Exploration Performed

- Loaded the supplied file directly and through a local web origin.
- Inspected the rendered DOM and available `data-testid` attributes.
- Mapped registration/login, navigation, Play, Profile, History, settings, and
  destructive actions.
- Reviewed game state transitions around human turns, computer thinking,
  terminal results, reset, difficulty, and hint highlighting.
- Examined browser persistence behavior and the app's use of local storage.
- Reviewed semantic roles, disabled states, live status, RTL attributes, and
  responsive CSS at a basic level.

## Main Flows Discovered

- First-time users register with a name of at least two characters.
- Returning users switch to Login and use the same name; no password exists.
- Signed-in navigation exposes Play, Profile, History, and Logout.
- The player uses X and the computer uses O. Computer selection varies by
  difficulty and may be random.
- Hint highlights a legal cell but does not make a move.
- Completed games feed both History and Profile statistics.
- Profile supports renaming and account deletion.
- Theme and language are global preferences; Persian switches the document to
  RTL.

## Risk-Based Prioritization

Data integrity and playable game rules were treated as P0. The highest-risk
failures are inability to enter the app, overwritten cells, duplicate users,
missing results, incorrect statistics, or destructive actions affecting the
wrong data. Preference controls and hints are P1 because they are visible but
do not block the core journey. Visual polish and broad accessibility checks are
P2 for this timebox.

## Automation Selection

Automation covers deterministic contracts with business value. Exact AI moves
and exact outcomes are deliberately excluded. Instead, tests verify mark
counts, disabled occupied cells, legal state transitions, and eventual terminal
state. This produces stronger regression value than scripting one lucky board.

Page objects remain small because the app is small. Shared helpers cover
storage isolation, test data, selectors, and confirmation dialogs. One browser
instance runs at a time to avoid local-storage races.

## Limitations and Assumptions

- The minified artifact is treated as a black box.
- No backend means accounts are local browser records, not secure identities.
- Current-game persistence is not assumed without an explicit product
  requirement; account/history persistence is expected.
- Chrome is the only automated browser in the timebox.
- A full accessibility audit requires assistive technology and manual review.
- AI quality needs statistical or unit-level analysis beyond these UI checks.

## Execution Result

- Full suite: 17 passed, 0 failed
- Smoke suite: 4 passed, 0 failed
- Browser: Google Chrome 149 on Linux
- The headed command is configured but was not exercised in the headless
  execution environment.
