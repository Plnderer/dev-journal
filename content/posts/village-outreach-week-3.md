---
title: "Week 3: Planning the Village Outreach Backend"
description: "Connecting the app's features to data, permissions, and specific backend tasks."
author: "Eric Reyes"
date: "2026-10-18"
category: "Village Outreach"
cover: "/images/village-outreach-backend-planning.png"
draft: false
---

This week (October 12–18), I worked on the backend plan for Village Outreach. Last week, I wrote about our first design document draft and the style tile. The next step was to connect those ideas to specific development tasks.

Village Outreach is our team's mutual-aid app. People would be able to request help, offer assistance, and find nearby community resources. My responsibility is the backend API and database. The API receives requests from the app, checks them, and works with stored data.

## Turning features into data

The main problem was deciding what each action on a screen requires behind it. A help request needs more than a title and description. It needs an owner, a status, and a way to connect offers to the right request. Those relationships also affect who can change a record or join a conversation.

The planned database has six core entities: **User, HelpRequest, Offer, Message, Resource, and Report**. An entity represents a type of information the application stores. For example, an Offer connects a helper to a HelpRequest. Keeping those records separate lets us describe each person's role without mixing the request itself with the responses it receives.

![Proposed backend structure: the mobile app sends requests to an API that validates input, checks permissions, and accesses six planned data entities.](/images/village-outreach-backend-plan.svg)

*A simplified view of the planned backend responsibilities. Implementation and testing are upcoming work.*

## Defining the rules

The design calls for a Flutter mobile app, a FastAPI backend hosted on Vercel, and Supabase for authentication and PostgreSQL storage. The mobile app signs in through Supabase Auth. FastAPI then checks the access token before handling protected data requests. Application tables won't store passwords.

Writing down the permission rules made the scope more specific. For example, only the person who created a help request should be able to accept an offer. The planned messaging flow connects the requester with the accepted helper. A request that has been completed or canceled should stop accepting new offers and messages.

These rules give us concrete cases to check later. A successful response is only one part of the test. We also need to check what happens when another account tries to change the request or when someone offers help on a closed request.

## Making the backlog usable

I organized backend work in Jira around the foundation and the minimum viable product, or MVP. The tasks cover models, database migrations, route groups, tests, and API documentation. Migrations track changes to the database structure so the team can apply those changes consistently.

Separating the work also makes dependencies easier to follow. The User model needs to exist before the initial migration can include it. Request creation depends on authentication and the request model. Each task needs completion criteria so we can review a specific result instead of deciding whether a broad item like "build the backend" is finished.

## What comes next

The result this week is a more specific design and backlog. The next step is to implement the foundation, check the migration and API behavior, and record the results in the related tasks.

Working through the plan showed me how many decisions sit behind a simple button. Describing the data, permissions, and failure cases now gives me a clearer starting point for development and gives the team something specific to review.

## Project references

- [Village Outreach team repository](https://github.com/HaleyLou333/village-outreach)
- [Backend foundation tasks in Jira](https://village-outreach.atlassian.net/browse/CCVO-26)
- [MVP backend tasks in Jira](https://village-outreach.atlassian.net/browse/CCVO-27)
- [Week 2: Planning and Design for Village Outreach](/blog/village-outreach-week-2)
