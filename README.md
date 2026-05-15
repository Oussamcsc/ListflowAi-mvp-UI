# ListflowAI MVP UI

**AI-assisted campaign and lead workflow dashboard built with React, TypeScript, Material UI, and Supabase.**

ListflowAI is a product/UI MVP for outbound campaign operations. It focuses on the workflow layer around onboarding, audience definition, lead operations, campaign creation, dashboard views, notifications, and authenticated user flows.

This repo demonstrates frontend/product engineering for a realistic SaaS workflow. Backend automation can be connected through Supabase, n8n, OpenAI-assisted personalization, and REST APIs.

---

## Why this project matters

Outbound tools are usually messy: lead data, campaign setup, account configuration, inbox operations, personalization, and reporting are spread across many screens. ListflowAI explores how to turn that workflow into a clean operator dashboard.

The goal is not just a landing page — it is an app shell for a real campaign operations product.

---

## Current features

- Landing page and authentication flow
- Multi-step onboarding wizard
- Business information setup
- Email setup flow
- Geography and target audience setup
- Dashboard and campaign creation pages
- Notification panel
- Protected route structure
- Supabase client integration
- React Router based navigation
- Material UI component system

---

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 19, TypeScript |
| Routing | React Router |
| UI | Material UI, Lucide React |
| Auth/data client | Supabase client |
| Build tooling | Create React App |

---

## Project structure

```text
listflow-ai/
  src/
    components/              reusable UI and protected route components
    components/onboarding/   multi-step onboarding screens
    contexts/                auth and onboarding state
    pages/                   landing, auth, dashboard, campaign creation
    supabaseClient.ts        Supabase client setup
```

---

## Local development

```bash
git clone https://github.com/Oussamcsc/ListflowAi-mvp-UI.git
cd ListflowAi-mvp-UI/listflow-ai
cp .env.example .env
npm install
npm start
```

The app starts on port `12000` based on the current `start` script:

```text
http://localhost:12000
```

---

## Environment variables

```env
REACT_APP_SUPABASE_URL=replace-with-supabase-url
REACT_APP_SUPABASE_ANON_KEY=replace-with-supabase-anon-key
```

The Supabase anon key is designed for browser usage, but project-specific keys should still live in local `.env` files rather than committed source.

---

## Roadmap

- Add screenshots or a short demo GIF
- Connect campaign creation to backend persistence
- Add lead scoring and personalization workflows
- Add tests around onboarding and campaign creation
- Deploy a public demo
- Introduce backend API routes for campaign operations

---

## Status

Active MVP. The UI foundation is in place; demo assets, backend workflows, and production hardening are the next priorities.
