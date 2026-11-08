# Deliverable 4

**Due Friday 27 November, 18:00 · teams · submit on GitHub and PrairieLearn**

The Registrar's Office has been using the **Section Assignments** tab provided in the web frontend to help them build course schedules.
However, they are running into a number of limitations: (1) rooms are not booked through the entire day, (2) they lose their schedule when they reload the page, and (3) building one schedule sends dozens of requests from the browser, which is slow and sometimes fails at peak scheduling times.
They want your team to fix these problems for v3.

## The request

From the Registrar's Office:

> We want to pick a year, the departments we're scheduling, and the rooms we have to work with, choosing
> departments and rooms from lists rather than typing them in. Every section those departments ran that year
> should get one of those rooms and one of the usual 15 teaching slots (nine one-hour slots on Monday,
> Wednesday, and Friday, and six 90-minute slots on Tuesday and Thursday).
>
> Each section's room must have enough seats for everyone who passed, failed, or audited it, and two
> sections of the same course can't be at the same time, so students have a choice of times. Sometimes not
> everything fits and we need to see which sections can't be assigned a room.
>
> We also want to be able to open and delete previous schedules.

## Plan the work

How you meet the request is up to you, with three constraints:

- The Section Assignments tab creates a schedule with one request to a new endpoint under `/api/v3`, specified in
  `openapi.yml`. Other requests can fill in the tab's lists.
- Saved schedules are stored on disk and survive a restart.
- The scheduling rules and the scheduler's interface are specified by the files in the [Appendix](#appendix).

As in D3, each of you leads one part, split along the line you drew in D3:

- **2A: API and frontend:** the routes and everything in front of them.
- **2B: Core scheduler:** everything behind the routes, from scheduling to saving.
- **2C: Editing schedules (groups of three):** changing a saved schedule.

The boundary is one function: 2A's route calls a function of 2B's with the year, departments, and rooms,
and turns its result into a response. Agree on it early; until 2B's code is merged, 2A can build against
a fake, as with `FakeGeoLocator` in D3.

Work as in D3: weekly issues, small commits, and every pull request reviewed before merging (see
[Working as a team](d3-design-v3.md#working-as-a-team) and the
[check-ins](d3-design-v3.md#weekly-check-ins)).

## 1. Update your repository

1. **Add the provided files.** Make the three changes listed in the [Appendix](#appendix). Don't modify
   `src/scheduling/types.ts` or `.redocly.yaml` afterwards.
2. **Copy in the frontend.** Copy `frontend/` from one of your D2 repositories, if you didn't do it in D3.
3. **Launch it.** After `yarn start`, the frontend should be at `http://localhost:<port>/`. `App.ts`
   serves it with `express.static("frontend/public")`; if that line went missing in D2 or D3, put it back.

## 2A: API and frontend

1. Specify the v3 API under `/api/v3` in `openapi.yml`, in the style of the existing operations, with an
   example request and response for each operation. `yarn docs:lint` must pass. The design is up to your
   team.
2. Implement the API on top of 2B's code. Keep the routes thin by having them only translate between HTTP and the
   core.
3. Test the API through HTTP with `supertest`, like most of the existing tests, with at least one test per
   operation. Tests outside `test/online/` must pass offline. Uploading a facilities dataset needs
   geolocation, so either use your `FakeGeoLocator` from D3 or create the buildings and rooms you need with
   the `PUT` endpoints.
4. Update the Section Assignments tab in `frontend/public/index.html` to use the API in place of
   `matchSectionsToRooms`. Users choose a year, departments, and rooms from lists to create a schedule,
   and can list and open saved schedules. For a schedule, show each section's room and slot, and the
   sections that weren't placed. We're looking for something that works, not a polished interface: plain
   lists and tables are fine, and a good place to start.

## 2B: Core scheduler

1. Implement `checkSchedule` and `schedule` in `src/scheduling/`. The rules are in the doc comments. A
   greedy scheduler is enough.
2. Implement the function 2A's route calls: look up the chosen departments' sections for the year and the
   chosen rooms through the existing courses and facilities code, turn them into the scheduler's inputs,
   and schedule them.
3. Save every schedule to disk, and provide a way for schedules to be listed, read, and deleted.
4. Write tests that call this code directly, not through the HTTP API, including that a schedule saved by
   one instance can be read by a new one on the same directory. Put the tests for `checkSchedule` and
   `schedule` in `test/scheduling/`: we run them against our own implementation, and against versions
   with bugs in them, to check they are complete and thorough. Our `schedule` makes different valid
   choices each time it runs, so test what every correct scheduler must do, not what yours happens to do.

<!-- ### Optional: the leaderboard

The bot also scores your `schedule` on a few fixed inputs, combining the share of enrolled seats it places
(70%) with how close together the buildings it uses are (30%). Rooms carry their building's coordinates
for this. Scores appear in your `#d4` feedback and on a class leaderboard under a team alias. It isn't
graded: a greedy scheduler is enough for full marks. -->

## 2C: Editing schedules (groups of three)

Scheduling staff adjust schedules by hand: moving a section to another room or slot, or placing one the
scheduler left out.

1. Specify and implement this as an operation on a saved schedule. Run `checkSchedule` on the edited
   schedule, with its own sections and rooms; if it reports anything, save nothing and return what's
   wrong. Keep the route thin, as in 2A.
2. Test it through HTTP, including a rejected change.
3. Let users make these changes to an open schedule in the Section Assignments tab, and show why a change
   was rejected.

## Demo video

Record a video demo of your feature that includes each of the points below.
It must be one _continuous_ recording that is at most five minutes long (six for groups of three).
You may want to rehearse once but we are not looking for a polished work of art.
Each lead must narrate their own part (the exact order of the steps is up to you).

The 2A lead:

1. Chooses a year, departments, and rooms from the lists in the Section Assignments tab.
2. Creates a schedule, with the browser's network tab showing the single request. Compare the request and response with the endpoint in your rendered spec (`yarn docs:build`).
3. Shows the schedule, including each section's room and slot, and the sections that weren't placed.
4. Restarts the server. Then lists saved schedules, opens the one you made, then deletes it.

The 2B lead:

1. Traces the schedule creation request through the code, from the route through the core to where the
   schedule is written to disk.

The 2C lead (groups of three):

1. Opens an existing schedule in the Section Assignments tab.
2. Moves a section, then restarts the server and shows the change persisted in the frontend.
3. Makes a change that is rejected with the corresponding error message.

## Design viva

In your Nov 27–Dec 3 lab, your team will meet with your TA for about 15 minutes to talk about your design.
This is not a demo but a conversation about what you did and why.
Each of you is marked on your own answers about the work you completed as the lead.

## Submit in DELIV4

1. **Demo video:** a link to it (see [Demo video](#demo-video)). Make sure course staff can open the link.
2. **Specification:** a permalink to your final `openapi.yml`.
3. **Pull requests:** each lead links to the merged pull request that best shows their work.
4. **One specification decision:** a choice you made in your API and an alternative you rejected.
5. **Retrospective:** this is the first feature you built from the browser to the disk.
   Where did what you learned about the existing system in D1 to D3 save you work (how its endpoints
   handle validation, pagination, errors, and storage), and where did you have to work around it or change
   it? Link to code.

## Grading

30% autograded, 70% manual. Request feedback with `@310-bot #d4`; your highest-scoring commit on `main`
before the deadline counts.

- **Autograded (30%):** `checkSchedule` and `schedule` against our tests; your `test/scheduling/` tests against
  our implementations, with and without bugs; tests outside `test/online/` pass offline; `yarn docs:lint`;
  no file in `src/` other than `App.ts` and `index.ts` imports both `fs` and `express` (as in D3);
  existing v1 and v2 behaviour.
- **Manual (70%),** split as follows:
  - **Specification (20%):** your `openapi.yml`: how a client sends the year, departments, and rooms, how
    sections that can't be placed are reported, your error responses (including an unknown schedule), and
    whether it covers every operation the tab uses.
  - **DELIV4 and check-ins (20%):** your pull requests and reviews, your specification decision and
    retrospective, and your D4 plan and process check-ins.
  - **Demo video (30%):** each item in the [checklist](#demo-video).
  - **Design viva (30%):** each of you, on your own part.

In groups of three, 2C is graded in each of these, alongside 2A and 2B.

## Appendix

Make these three changes to your repository, then run `yarn prettier:fix` so the new files match the
project's formatting. The new `.redocly.yaml` adds stricter rules for `yarn docs:lint` (to help ensure the spec remains consistent when adding the new API).

1. Update `.redocly.yaml` to:

    ```yaml
    extends:
      - minimal
    rules:
      operation-operationId: off
      security-defined: off
      no-server-example.com: off
      operation-2xx-response: error
      operation-4xx-response: error
      operation-summary: error
      no-invalid-media-type-examples: error
    ```

2. Create a new file `src/scheduling/types.ts` with:

    ```ts
    /**
     * The scheduling contract. These types and the signatures in ./index.ts are fixed so that your scheduler and your
     * tests can be checked automatically; you can design everything else about scheduling. Don't modify this file.
     */

    /** The 15 teaching slots. Two placements overlap only if they have the same slot. */
    export const SLOTS = [
      "MWF 08:00-09:00",
      "MWF 09:00-10:00",
      "MWF 10:00-11:00",
      "MWF 11:00-12:00",
      "MWF 12:00-13:00",
      "MWF 13:00-14:00",
      "MWF 14:00-15:00",
      "MWF 15:00-16:00",
      "MWF 16:00-17:00",
      "TR 08:00-09:30",
      "TR 09:30-11:00",
      "TR 11:00-12:30",
      "TR 12:30-14:00",
      "TR 14:00-15:30",
      "TR 15:30-17:00",
    ] as const;

    export type Slot = (typeof SLOTS)[number];

    /** A section to be scheduled. */
    export interface SchedSection {
      id: string; // e.g. "CPSC 310 101"; unique among the sections given
      course: string; // e.g. "CPSC 310"
      enrolment: number; // a non-negative integer
    }

    /** A room sections can be scheduled into. */
    export interface SchedRoom {
      id: string; // e.g. "DMP_110"; unique among the rooms given
      seats: number; // a non-negative integer
      lat: number; // the room's building, from the facilities data
      lon: number;
    }

    /** One section in one room at one slot. May name a section or room that isn't in the input. */
    export interface Placement {
      section: string; // a SchedSection id
      room: string; // a SchedRoom id
      slot: Slot;
    }

    /**
     * What's wrong with a list of placements (see checkSchedule in ./index.ts).
     *
     * - unknown-section: one for each placement whose section isn't among the sections given.
     * - unknown-room: one for each placement whose room isn't among the rooms given.
     * - placed-twice: one for each section that appears in more than one placement, however many.
     * - overflow: one for each placement whose section's enrolment is greater than its room's seats. A full room is not
     *   an overflow. Not checked if the section or room is unknown.
     * - double-booked: one for each pair of placements with the same room and slot (even if they place the same
     *   section). `sections` is in alphabetical order.
     * - same-course: one for each pair of placements in the same slot whose sections are different, both known, and in
     *   the same course. `sections` is in alphabetical order.
     * - Every violation is reported exactly once, in no particular order.
     */
    export type ScheduleViolation =
      | { kind: "unknown-section"; section: string }
      | { kind: "unknown-room"; section: string; room: string }
      | { kind: "placed-twice"; section: string }
      | { kind: "overflow"; section: string; room: string }
      | { kind: "double-booked"; room: string; slot: Slot; sections: [string, string] }
      | { kind: "same-course"; course: string; slot: Slot; sections: [string, string] };
    ```

3. Create a new file `src/scheduling/index.ts` with:

    ```ts
    import { Placement, SchedRoom, SchedSection, ScheduleViolation } from "./types";

    /*
     * The scheduling contract. These signatures (and the types in ./types.ts) are fixed so that your scheduler and your
     * tests can be checked automatically; everything else is yours to design. The rules are in the doc comments here and
     * in ./types.ts.
     *
     * You may move the implementation into other files, but these two functions must stay exported from here.
     */

    /** Reports everything wrong with `placements`, in no particular order. */
    export function checkSchedule(placements: Placement[], sections: SchedSection[], rooms: SchedRoom[]): ScheduleViolation[] {
      throw new Error("checkSchedule is not implemented yet (D4)");
    }

    /**
     * Places as many of `sections` into `rooms` as it can. Sections it can't place are left out.
     *
     * - checkSchedule(schedule(sections, rooms), sections, rooms) is always [].
     * - On any input where this greedy approach places every section, schedule does too: take sections largest first,
     *   and put each in the smallest room that fits it, at the first slot where that room is free and no other section of
     *   its course is placed.
     */
    export function schedule(sections: SchedSection[], rooms: SchedRoom[]): Placement[] {
      throw new Error("schedule is not implemented yet (D4)");
    }
    ```
