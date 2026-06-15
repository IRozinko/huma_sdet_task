# Test Cases

| ID | Priority | Area | Title | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|---|
| APP-001 | P0 | Shell | Load application | App served | Open `/` | Title, subtitle, and registration form render without console-blocking failure | Automated |
| AUTH-001 | P0 | Auth | Register new user | Clean storage | Enter unique valid name; create account | User is signed in and Play view opens | Automated |
| AUTH-002 | P0 | Auth | Login existing user | Registered user is logged out | Switch to Login; enter exact name; submit | Existing profile opens with preserved data | Automated |
| AUTH-003 | P0 | Auth | Reject empty name | Registration view | Submit empty name | Inline validation error is shown; no user is created | Automated |
| AUTH-004 | P0 | Auth | Reject too-short name | Registration view | Enter one character; submit | Inline validation error is shown | Automated |
| AUTH-005 | P0 | Auth | Reject duplicate registration | Existing user is logged out | Open Register; enter existing name; submit | Duplicate error appears; original account is unchanged | Automated |
| AUTH-006 | P0 | Auth | Logout and login again | Signed-in user | Logout; log in with same name | Session ends, then account can be reopened | Automated |
| AUTH-007 | P1 | Auth | Unknown user login | Login view | Enter unregistered name; submit | Error appears and app remains signed out | Automated |
| GAME-001 | P0 | Game | Board initial state | Signed in | Open Play | Nine empty enabled cells are displayed; human turn is announced | Automated |
| GAME-002 | P0 | Game | Valid human move | New game | Select empty cell | Cell becomes X and cannot change | Automated |
| GAME-003 | P0 | Game | Computer responds | Human made non-terminal move | Wait for AI | At least one O appears and control returns or game ends | Automated |
| GAME-004 | P0 | Game | Occupied cell protected | Cell contains X or O | Attempt activation | Cell is disabled and state is unchanged | Automated |
| GAME-005 | P0 | Game | New Game clears board | Game has moves | Select New Game | Board returns to nine empty cells with same difficulty | Automated |
| GAME-006 | P0 | Game | Reset clears board | Game has moves | Select Reset | Board returns to initial playable state | Automated |
| GAME-007 | P0 | Result | Completed result recorded | Signed in, active game | Play legal moves until terminal state | Win/loss/draw status appears and one history record is saved | Automated |
| GAME-008 | P1 | Difficulty | Change difficulty | New game | Select Hard | New game uses Hard and preference survives reload | Automated |
| GAME-009 | P1 | Difficulty | Change mid-game confirmation | Board has moves | Change difficulty; cancel then confirm | Cancel preserves game; confirm starts new game at selection | Automated |
| GAME-010 | P1 | Hint | Hint does not play | Human turn, empty cells exist | Select Hint | One available cell is highlighted temporarily; board marks do not change | Automated |
| GAME-011 | P2 | Result | Winning line highlighted | Terminal human/computer win | Inspect board | Exactly the winning three cells have visible win styling | Manual |
| PROFILE-001 | P0 | Profile | Update name | Signed in | Open Profile; enter unique valid name; save | Success appears and navigation identity updates | Automated |
| PROFILE-002 | P0 | Profile | Reject duplicate profile name | Two users exist; second signed in | Rename second to first user's name | Error appears; identities are not merged | Automated |
| PROFILE-003 | P0 | Profile | Statistics update | At least one completed game | Open Profile | Win/loss/draw totals include completed game | Automated |
| PROFILE-004 | P0 | Profile | Delete account | Signed in | Delete; confirm | User returns to auth and deleted name cannot log in | Automated |
| PROFILE-005 | P1 | Profile | Cancel account deletion | Signed in | Delete; cancel | Account and session remain intact | Automated |
| HIST-001 | P0 | History | Display completed games | One completed game | Open History | One row shows date, difficulty, and result | Automated |
| HIST-002 | P0 | History | Clear history | History contains entries | Clear; confirm | Empty state appears and statistics return to zero | Automated |
| HIST-003 | P1 | History | Cancel history clearing | History contains entries | Clear; cancel | Existing rows remain | Automated |
| SET-001 | P1 | Theme | Toggle and persist theme | App open | Toggle theme; reload | `data-theme` changes and remains selected | Automated |
| SET-002 | P1 | Language | Switch to Persian/RTL | App open | Select Persian | Labels translate; document `lang=fa` and `dir=rtl` | Automated |
| SET-003 | P1 | Language | Persist language | Persian selected | Reload | Persian and RTL remain active | Automated |
| STATE-001 | P1 | Persistence | Preserve signed-in user | Signed in | Reload | User remains signed in and account data remains | Automated |
| STATE-002 | P1 | Persistence | Current game reload behavior | Game has moves | Reload | Behavior matches product decision and does not corrupt history | Automated |
| A11Y-001 | P2 | Accessibility | Keyboard smoke | Any view | Navigate with Tab; activate controls with keyboard | Logical order, visible focus, and no keyboard trap | Manual |
| A11Y-002 | P2 | Accessibility | Names and live status | Game view | Inspect accessibility tree; play a turn | Controls have useful names and status updates are announced | Manual |
| RESP-001 | P2 | Responsive | Small viewport smoke | Signed in | Test 320x568 and 375x667 | No horizontal clipping; board and actions remain usable | Manual |
| DATA-001 | P2 | Validation | Boundary and Unicode names | Registration/Profile | Try spaces, long text, emoji, Persian, case variants | Normalization and limits are consistent and layout remains usable | Manual |
