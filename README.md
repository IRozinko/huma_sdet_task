# Tic-Tac-Toe WebdriverIO Test Assignment

Risk-based UI automation and exploratory test documentation for the provided
single-file Tic-Tac-Toe application.

## Stack

- JavaScript (ES modules)
- WebdriverIO
- Mocha
- Chrome
- WDIO static server service

WebdriverIO and JavaScript were selected because they match the target role and
provide concise browser APIs, automatic waiting, reusable page objects, and
good local debugging support.

## Prerequisites

- Node.js 18+
- npm 9+
- Google Chrome

## Install

```bash
npm install
```

## Run

```bash
npm test
npm run test:headless
npm run test:headed
npm run test:smoke
```

`npm test` and `npm run test:headless` run the complete suite in headless
Chrome. The application is served automatically at `http://localhost:4173`.
Failure screenshots are written to `artifacts/screenshots/`.

To run one spec:

```bash
npx wdio run wdio.conf.js --spec test/specs/game.spec.js
```

## Repository Structure

```text
.
|-- index.html
|-- wdio.conf.js
|-- test/
|   |-- helpers/
|   |-- pageobjects/
|   `-- specs/
|-- TEST_PLAN.md
|-- TEST_CASES.md
|-- TESTING_NOTES.md
`-- BUGS.md
```

## Automated Coverage

The suite contains **22 automated tests** across five spec files:

- Application shell smoke check
- Registration, validation, duplicate user, logout, and login
- Board rendering, human move, AI response, and occupied-cell protection
- New Game and Reset
- Difficulty and Hint controls
- Profile rename, duplicate-name protection, and account deletion
- Completed-game history/statistics and history clearing
- Theme and Persian/RTL switching, including reload persistence

The suite uses `data-testid` selectors, unique users, explicit state waits, and
invariant-based AI assertions. Tests do not depend on an exact computer move.

## Manual Coverage

Responsive visual quality, complete keyboard traversal, screen-reader output,
cross-browser behavior, localization quality, and all AI strategy permutations
remain manual or broader-suite candidates. See [TEST_PLAN.md](TEST_PLAN.md) and
[TEST_CASES.md](TEST_CASES.md).

## Design Notes

- Page objects are grouped by user-facing area and contain behavior, not test
  assertions.
- Storage is cleared before isolated tests; persistence tests opt out.
- A game is completed by repeatedly choosing an available cell and waiting for
  the AI, avoiding assumptions about random moves.
- Browser confirmation dialogs are handled explicitly.
- The supplied `index.html` is copied unchanged and treated as the system under
  test.

## Known Limitations

- The application stores identity and game history only in browser
  `localStorage`; it is not real authentication.
- AI randomness prevents deterministic win/loss expectations.
- Execution currently targets local Chrome only.
- The minified application source limits code-level diagnosis; observations are
  based on black-box behavior and rendered DOM.
- The dependency tree is intentionally pinned to WebdriverIO 8 for compatibility
  with the supplied Node.js environment; all dependencies are development-only.
