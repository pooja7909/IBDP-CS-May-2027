# Security Specification: IBDP CS Timeline

## 1. Data Invariants
- A `curriculum` document must exist for each `planId` (`dp1_sl`, `dp2_sl`, `dp1_hl`, `dp2_hl`).
- The `items` array must be present and bounded by the 18-month curriculum length (max 24 items for safety).
- Only the documented Admin (poojaaro@gmail.com) can write. All other users can only read.

## 2. The "Dirty Dozen" Payloads (Denial Tests)
1. **Unauthenticated Write**: `{ "items": [] }` -> `PERMISSION_DENIED`
2. **Student Authenticated Write**: User `student@example.com` trying to modify `items` -> `PERMISSION_DENIED`
3. **Admin Identity Spoofing**: Trying to set `updatedBy` to another user's ID -> `PERMISSION_DENIED`
4. **Invalid Schema**: `{ "items": [ { "topic": "Invalid" } ] }` (missing `month`, `type`) -> `PERMISSION_DENIED`
5. **Array Bomb**: `{ "items": [ ...1000 items ] }` -> `PERMISSION_DENIED`
6. **Path Poisoning**: Trying to write to `/curriculum/random_junk_id_1234567890...` -> `PERMISSION_DENIED`
7. **Bypass Lock**: Trying to update a terminal state (if any) -> `PERMISSION_DENIED`
8. **Field Injection**: `{ "items": [], "isAdmin": true }` -> `PERMISSION_DENIED`
9. **Type Mismatch**: `{ "items": "not-an-array" }` -> `PERMISSION_DENIED`
10. **Malicious Month**: `{ "items": [ { "month": "SuperLongMonthNameThatIsActuallyAMaliciousScript..." } ] }` -> `PERMISSION_DENIED`
11. **Admin Deletion**: Trying to delete a core plan document -> `PERMISSION_DENIED` (unless explicitly allowed)
12. **State Shortcut**: Updating `lastUpdated` to a future date manually -> `PERMISSION_DENIED` (must use server time)

## 3. Test Runner
(Tests would be implemented in `firestore.rules.test.ts`)
