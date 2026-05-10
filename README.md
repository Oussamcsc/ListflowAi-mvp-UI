# ListflowAI MVP UI

**AI-assisted campaign and lead workflow interface built with React, TypeScript, Material UI, and Supabase.**

ListflowAI is a frontend MVP for managing outbound campaign workflows: onboarding, audience definition, lead operations, campaign creation, dashboard views, notifications, and authenticated user flows. The repository currently focuses on the product/UI layer while backend automation workflows are planned around Supabase, n8n, OpenAI-assisted personalization, and REST APIs.

---

## Why This Project Matters

This project demonstrates product engineering around a real business workflow: turning lead data into structured campaign operations. It is intended to show frontend architecture, authenticated app flows, onboarding UX, dashboard design, and the product thinking behind an AI-assisted sales/email automation system.

---

## Current Features

- Landing page and authentication flow
- Multi-step onboarding wizard
- Business information, email setup, geography, and target audience setup screens
- Dashboard and campaign creation pages
- Notification panel and protected routes
- Supabase client integration
- React Router based navigation
- Material UI and custom styling

---

## Tech Stack

- React 19
- TypeScript
- React Router
- Material UI
- Supabase client
- Lucide React icons
- Create React App

---

## Project Structure

```text
listflow-ai/
  src/
    components/          Reusable UI and protected route components
    components/onboarding/ Multi-step onboarding screens
    contexts/            Auth and onboarding state
    pages/               Landing, auth, dashboard, campaign creation
    supabaseClient.ts    Supabase client setup
```

---

## Local Development

```bash
git clone https://github.com/Oussamcsc/ListflowAi-mvp-UI.git
cd ListflowAi-mvp-UI/listflow-ai
npm install
npm start
```

The app starts on port `12000` based on the current `start` script.

---

## Roadmap

- Add screenshots and/or a short product demo video
- Add example environment file and setup notes for Supabase
- Connect campaign creation to backend persistence
- Integrate lead scoring and personalization workflows
- Add tests for core onboarding and campaign flows
- Deploy a public demo

---

## Status

Active MVP. The UI foundation is in place; documentation, demo assets, and backend workflow integration are the next priorities.
