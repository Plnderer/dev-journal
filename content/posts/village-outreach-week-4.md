---
title: "Week 4: Building and Testing the Village Outreach Backend"
description: "From backend planning to a tested database foundation: what I built, checked, and learned."
author: "Eric Reyes"
date: "2026-10-25"
category: "Village Outreach"
cover: "/images/village-outreach-week-4-backend.png"
draft: false
---

This week (October 19–25), I built the first database foundation for Village Outreach, our team's mutual-aid app. People would use it to request help, offer assistance, and find community resources. My work focused on making the backend ready to store and check user profiles.

## From plan to implementation

The shared FastAPI scaffold returned a health response, but that didn't prove user records could be saved. I needed repeatable checks for the database itself.

Before that work could run, I fixed a configuration import. Our Pydantic 2 setup needed `BaseSettings` from `pydantic-settings`. Then I implemented the four pieces shown above. A model describes the record; a migration creates the matching database structure.

## What the tests proved

The full suite passed when I reran it for this week's review. I used disposable local PostgreSQL so the tests could save records, reject invalid data, and reverse migrations without touching shared data.

For example, two profiles can't share the same authentication identity. I checked that the database rejects the duplicate, rather than only checking the model's fields. My changes went through a pull request from `feature/backend` into `dev`.

The test setup also rolls back records between tests and rejects database targets that don't meet its local test restrictions. That gives me a repeatable starting point when I add more backend features.

## Next step

Next, I'll work on token verification and connecting verified identities to application profiles. Request and offer features can then use the same test setup. This week showed me why each task needs its own evidence: a healthy API, a saved record, and a complete user journey prove different things.

## Project references

- [Backend implementation and setup instructions](https://github.com/HaleyLou333/village-outreach/tree/05a09366653e22332b56bad7560c8f8224e59c54/backend)
- [Backend pull request into dev](https://github.com/HaleyLou333/village-outreach/pull/2)
- [Sprint 1 backend test task](https://village-outreach.atlassian.net/browse/CCVO-30)
- [Final Software Design Document](https://docs.google.com/document/d/1jHAX5MNiE9HQ4lKZ0HHIHjGlyKtQqxiE/edit)
- [Week 3: Planning the Village Outreach Backend](/blog/village-outreach-week-3)
