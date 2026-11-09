---
title: "Week 6: From a Help Offer to a Private Conversation"
description: "How I connected helper offers and private messaging in Village Outreach, and what our two-account Android walkthrough verified."
author: "Eric Reyes"
date: "2026-11-08"
category: "Village Outreach"
cover: "/images/village-outreach-week-6-conversation.webp"
draft: false
---

Last week, I worked on how people post and manage help requests in Village Outreach, our team’s mutual-aid app. This week, I worked on what happens when someone responds. If a neighbor asks for help picking up groceries, another person can offer to help. Once the requester chooses a helper, those two people need a private way to work out the details.

## Deciding when a conversation opens

A request can receive several offers, but the app needs one clear answer about who is helping. An offer might contain a note for the requester. It should only be visible to the requester and the person who wrote it. Once the requester accepts an offer, the API uses that accepted offer to decide who can read and send messages. That check happens on the server, so knowing the request ID or calling the API directly gives another user no access to the conversation.

![Before acceptance, a helper can offer and only the requester can accept. Once one helper is accepted, those two accounts can read and send messages. After the request closes, they can only read the history. Other accounts have no chat access at any stage.](/images/village-outreach-week-6-offer-flow.svg)

*The accepted offer determines who can use the conversation. Closing the request changes what those same two accounts can do.*

## Keeping acceptance and retries consistent

If the requester taps Accept on two offers from different devices, both calls could see an unassigned request before either one saves. I made acceptance lock the request row in PostgreSQL. A second call waits, then checks the updated state. In the same transaction, the API accepts the selected offer and declines the other pending offers. A partial unique index covers just the accepted offers and gives the database its own way to reject a second accepted offer for the same request. [PostgreSQL row locks](https://www.postgresql.org/docs/18/explicit-locking.html#LOCKING-ROWS) · [Partial indexes](https://www.postgresql.org/docs/18/indexes-partial.html)

A lost response creates a different problem. A message may already be saved even though the phone still shows a send failure. I added retry keys for new offers and messages. If the app repeats the same operation with the same key and content, the API returns the saved record. If the same key arrives with changed content, the API returns a conflict. That lets the app retry without posting the same message twice. [Sprint 3 backend contract](https://github.com/HaleyLou333/village-outreach/blob/70e640f/docs/sprint-3-backend-contract.md)

## Connecting the Flutter screens

I connected Matthew’s offer and conversation screens to the API using the signed-in user’s session. The helper can submit an offer from the request details, and the requester can review and accept it. Each account can then open the conversation and refresh its saved history. After the request is completed or canceled, those two accounts can still see the conversation, and the API blocks new messages. The backend and Flutter changes both merged into `dev`. [Backend PR #11](https://github.com/HaleyLou333/village-outreach/pull/11) · [Flutter integration PR #13](https://github.com/HaleyLou333/village-outreach/pull/13)

## What the tests showed

| Check | Result |
| --- | --- |
| Backend suite | 305 tests passed against disposable PostgreSQL. The suite covered competing acceptances, retries, and migration rollback. |
| Local HTTP | 23 checks passed against a running API, including access rules and read-only history after closure. |
| Flutter integration | 69 Flutter tests passed. A separate live transport check covered retry behavior, denial for a third account, and history after closure. |
| Android emulator | Two local test accounts posted a request, submitted and accepted an offer, exchanged two messages, and refreshed the conversation. A database check found one accepted offer and two saved messages. |

The emulator run checked the path from a tap in Flutter to a saved record in PostgreSQL. It used local test sign-in and a disposable database. The next verification step is to repeat the same two-account walkthrough in the shared environment after applying the two database migrations there. [Backend verification in PR #11](https://github.com/HaleyLou333/village-outreach/pull/11) · [Emulator and transport results in PR #13](https://github.com/HaleyLou333/village-outreach/pull/13)
