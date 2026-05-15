# ListflowAI App

React/TypeScript application for the ListflowAI campaign and lead workflow MVP.

## Setup

```bash
cp .env.example .env
npm install
npm start
```

Runs on:

```text
http://localhost:12000
```

## Environment

```env
REACT_APP_SUPABASE_URL=replace-with-supabase-url
REACT_APP_SUPABASE_ANON_KEY=replace-with-supabase-anon-key
```

## Available scripts

```bash
npm start
npm run build
npm test
```

## Notes

This app currently focuses on the frontend workflow shell: onboarding, dashboard views, campaign setup, authentication flow, and Supabase client wiring. Backend campaign automation and persistence are planned follow-up work.
