---
title: "Week 5: From Sprint Planning to Tested Request APIs"
description: "Aligning our sprint, verifying real sign-in, and building profile and request APIs with ownership, safe retries, and approximate location."
author: "Eric Reyes"
date: "2026-10-31"
category: "Village Outreach"
draft: false
---

This week (October 26–31), I worked on Sprint 2 planning, authentication, profiles, and help requests for Village Outreach, our team's mutual-aid app. A person needs to sign in, post a request, find nearby requests, and update their own request when help is no longer needed.

The backend now supports those operations. The harder part was checking what happens around them: repeated submissions, another user's edits, closed requests, and location searches that could reveal more than the response shows.

## Making the sprint match the dependencies

At the start of planning, the backend scope grew to include requests, offers, and messaging. Each feature brought its own database work, permissions, tests, and frontend dependencies. The plan needed a smaller flow we could build and verify in order.

I narrowed my Sprint 2 commitment to authentication, profiles, and requests. After coordinating with Matthew, I aligned his Flutter tasks around sign-in and profiles, the request feed and details, and request creation and owner updates. Offers and messaging moved to the backlog.

I updated Jira with owners, estimates, completion criteria, and dependencies. I also removed an outdated dependency link between the new request-model task and the already completed user migration. The purpose was practical: make it clear which API each screen needs and what evidence is required before calling a task complete.

## Verifying real sign-in

I implemented backend token verification so the API can connect a signed-in identity to an application profile. The authentication work went through PR #5 and was merged into `dev` before I prepared the remaining profile and request changes.

One question this week was whether I had to wait for the Flutter screens to test sign-in. I could test the backend directly. Using a dedicated test account, I verified real Supabase sign-in through the local FastAPI backend and checked profile persistence in the hosted database.

All **13 live sign-in and profile checks passed** on October 30. They covered profile creation, reading, updating, rejected access, and protected fields. Repeated calls reused one profile, and the test restored the original display name afterward. This checked the hosted identity and profile connection while mobile integration remained separate.

## Connecting identity to requests

Authentication checks who is making a request. Authorization checks what that person can change. I needed both before connecting profiles to help requests.

I added authenticated profile reads and display-name updates, with identity, role, and account-status fields protected from those updates. For help requests, the backend assigns ownership from the verified user. The client cannot choose a different owner.

The request flow works in this order:

1. Verify the access token and load the user's profile.
2. Validate the request fields and save the request with that user's identity.
3. Return active requests near a selected search center.
4. Allow the owner to edit, complete, or cancel their request.

Completed and canceled requests leave the active feed. Another signed-in user can read request details, but cannot change the owner's request.

I also handled submission retries. If a connection drops after a request saves, repeating the same submission with the same operation key returns the existing record. Reusing that key with different content returns a conflict. This prevents a retry from creating a second request.

## Fixing a location-privacy problem

The API returns approximate coordinates, rounded to two decimal places. During review, a problem came up: the nearby search initially used the original coordinates before the response rounded them.

That meant someone could change the search radius and watch when a request appeared or disappeared. Even with rounded coordinates in the response, the search behavior could help narrow down the original location.

![Before the fix, radius filtering used the original location while the response showed an approximate location. After the fix, filtering, ordering, distance, and the response all use the same approximate location.](/images/village-outreach-week-5-location.svg)

*Location handling before and after the fix. The diagram describes backend behavior; it contains no user locations.*

I changed filtering, ordering, and distance calculations to use the same approximate coordinates returned by the API. The tradeoff is that nearby results describe an approximate area. That is consistent with the location detail the API is intended to share.

Regression tests check two different original locations that round to the same public location. Distance and radius searches must not distinguish those original positions. Those tests failed before the fix and passed afterward. I also checked that PostgreSQL and Python agree on rounding at boundary values.

## Checking the complete backend flow

The October 31 verification report records **272 passing automated tests** and **13 passing local HTTP checks**. The automated suite covers token validation, ownership failures, database constraints, migration reversals, retries, and location boundaries.

The HTTP checks exercise a running backend with disposable local PostgreSQL. They create a request, retry it, reject another user's attempt to close it, save an owner edit, and confirm that closing a request removes it from the active feed. Reading the saved records afterward checks that the changes persisted.

These local HTTP checks are separate from the earlier 13 hosted sign-in and profile checks. The request migration still needs to be applied to the hosted database, and the Flutter screens still need integration.

## Cleanup, review, and team progress

Before publishing the backend changes for review, I removed two unused database helpers and updated stale startup and setup instructions. I kept the versioned migrations, reusable verification script, API examples, and verification report so the team can repeat the checks. Backend lint and formatting checks also passed.

I pushed the combined profile and request work in commit `b282091` and opened **PR #7 into `dev`**. At this week's review, Jira shows the following:

| Work | Status |
| --- | --- |
| Authentication — CCVO-6 | Done; merged through PR #5 |
| Profiles, request storage, creation, browsing, and owner updates — CCVO-5, CCVO-7, CCVO-8, CCVO-9, CCVO-35 | Waiting for Review; PR #7 |
| Flutter sign-in and request integration — CCVO-64, CCVO-65, CCVO-66 | To Do |

Alongside my backend work, Haley updated the repository's team roles and worked on the AI foundation. Jira marks the synthetic dataset/privacy task and local environment/adapter scaffold Done. The repository includes synthetic evaluation fixtures, validation tooling, and rules keeping real personal data out of the dataset. The baseline preprocessing and mock-classifier task remains To Do. That is groundwork for later AI features, rather than a completed classifier in the app.

## What I learned and what comes next

Rounding a response was only one part of protecting location data. I also had to check the calculations that decide what a user can see. This gives me a more useful review question for future features: can the behavior reveal information that the response leaves out?

Sprint planning also made the handoff clearer. An implemented API, a reviewed change, and a working mobile flow each need their own verification. Next, the request changes need teammate review, the hosted-database migration, and integration with Matthew's screens. The next verification target is the same request journey through the mobile interface.

## Project references

- [Village Outreach Jira board](https://village-outreach.atlassian.net/jira/software/projects/CCVO/boards/3)
- [Authentication PR #5](https://github.com/HaleyLou333/village-outreach/pull/5)
- [Profile and request API PR #7](https://github.com/HaleyLou333/village-outreach/pull/7)
- [Sprint 2 backend verification report](https://github.com/HaleyLou333/village-outreach/blob/b282091207ef11b2f2f392a977bfcba4ee69c496/docs/sprint-2-backend-verification.md)
- [Request persistence and location calculations](https://github.com/HaleyLou333/village-outreach/blob/b282091207ef11b2f2f392a977bfcba4ee69c496/backend/app/services/requests.py)
- [Backend setup and API handoff](https://github.com/HaleyLou333/village-outreach/blob/b282091207ef11b2f2f392a977bfcba4ee69c496/backend/README.md)
- [Synthetic AI dataset and privacy rules](https://github.com/HaleyLou333/village-outreach/blob/b282091207ef11b2f2f392a977bfcba4ee69c496/ai/evaluation/README.md)
- [Week 4: Building and Testing the Village Outreach Backend](/blog/village-outreach-week-4)
