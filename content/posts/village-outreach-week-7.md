---
title: "Week 7: Finding Local Resources and Reporting Safety Concerns"
description: "How I built location-optional resource browsing and private safety reporting for Village Outreach, and what I verified on the backend."
author: "Eric Reyes"
date: "2026-11-15"
category: "Village Outreach"
cover: "/images/village-outreach-week-7-resources-and-reporting.webp"
draft: false
---

Last week, I connected help offers to private conversations in Village Outreach, our team’s mutual-aid app. This week, I worked on two other things someone might need while using the app. A person looking for a public library should be able to find one without sharing their phone’s location. A person who sees a suspicious help request should have a private way to report it.

## Finding resources without location permission

I added area and category filters to the resource API. For example, someone can look up libraries in the Oklahoma City metro area without sending coordinates or using Google Maps. If the app sends coordinates, the same API can filter by radius and return the closest matches first. Both searches use the same records, and the same detail endpoint provides the address, phone number, website, source, and last verification date. [Sprint 4 backend contract](https://github.com/HaleyLou333/village-outreach/blob/38d0b991968dcef7e1aeb7f56b6a07b4b256733b/docs/sprint-4-backend-contract.md)

I started with 11 library listings from the Metropolitan Library System. A directory can send someone to the wrong place if an old address stays visible, so both the list and detail endpoints hide disabled listings and listings that haven’t been verified in more than 180 days. The import skips existing records, which keeps a repeat import from bringing back a listing someone already disabled. [Metropolitan Library System locations](https://www.metrolibrary.org/locations)

## Giving users a private way to report a concern

I added a submission endpoint for reports about help requests and accounts. The API takes the reporter’s identity from the signed-in session and returns a receipt with the initial status. Report details stay in a private database table, and the app-facing API only exposes submission. That keeps report descriptions out of the feed and away from the account being reported.

| What happens on the phone | What the API does |
| --- | --- |
| The app sends a new report. | Saves the report and returns a pending receipt. |
| The connection drops, and the app retries with the same key and report. | Returns the original receipt without creating another report. |
| The app sends changed report details with the same key. | Returns a conflict so the app can tell the submission changed. |

The retry key matters because a dropped connection can hide the response even after the database has saved the report. Returning the original receipt lets the app confirm that the first submission went through. [Sprint 4 backend PR](https://github.com/HaleyLou333/village-outreach/pull/14)

## What I checked

The backend suite passed 317 tests against a disposable PostgreSQL database. The new tests checked resource filters, hidden listings, report privacy, and retry behavior. I also verified that the hosted database had the new migration and all 11 active listings. The backend PR merged into `dev` on November 14. [Test results and merge](https://github.com/HaleyLou333/village-outreach/pull/14)

My next end-to-end check is to open the Flutter app with location permission denied, browse by area, and open a listing. Then I want to submit a test report through Flutter and check that retrying after a lost response still gives the app one receipt for one saved report.
