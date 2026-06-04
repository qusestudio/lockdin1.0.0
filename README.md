# Lockdin

> *Pick a room. Lock in.*

Lockdin is a free, mobile-first live study accountability platform built specifically for South African high school students. Students join live subject-specific rooms — Pure Mathematics Grade 11, Life Sciences Grade 12 — and study alongside peers in real time. No messages. No social feeds. No distractions.

The mechanism is simple. Accountability through presence.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running the Backend](#running-the-backend)
  - [Running the Mobile App](#running-the-mobile-app)
- [API Reference](#api-reference)
- [Database](#database)
- [Caching Strategy](#caching-strategy)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [Roadmap](#roadmap)

---

## Overview

Lockdin addresses a documented crisis in South African secondary education — academic isolation. With only 11% of South African homes having a dedicated study space and 40% of learners dropping out between Grade 10 and Grade 12, the absence of peer study environments is a measurable contributor to underperformance.

Lockdin applies the psychological principle of body doubling — the proven effect that working in the presence of others improves focus and task completion — to the context of the South African learner. Anywhere. Any device. Any time.

**Key characteristics:**
- CAPS and IEB aligned — Grade 8 through Grade 12
- Zero private messaging by design
- Avatar-based presence — student identity protected
- Real-time participant counts per room
- Subject category filtering — STEM, Commerce, Humanities, Creative Arts
- Notification Engineering — personalised study reminders and exam countdown campaigns

Lockdin is a subsidiary product of [The Future Academy](https://thefutureacademy.co.za) — an EdTech company providing affordable supplementary education to South African high school students.

---

## Architecture

Lockdin follows a clean layered architecture across both the backend and mobile frontend.

```
┌─────────────────────────────────────────────────────┐
│                  React Native Client                 │
│         Expo Router · Zustand · TanStack Query       │
└─────────────────────┬───────────────────────────────┘
                      │ HTTPS · JWT
┌─────────────────────▼───────────────────────────────┐
│                  Actix-web API                       │
│              Rust · REST · Middleware                │
├──────────────────────────────────────────────────────┤
│   Auth Domain  │  Users Domain  │  Rooms Domain      │
│   Notifications Domain  │  (Rooms → LiveKit)         │
└──────┬──────────────────────────────────┬────────────┘
       │                                  │
┌──────▼──────┐                  ┌────────▼────────────┐
│  PostgreSQL │                  │       Redis          │
│  (Neon)     │                  │   Participant Counts │
│  Source of  │                  │   Room List Cache    │
│  Truth      │                  │   OTP Storage        │
└─────────────┘                  └─────────────────────┘
```

**Data flow for room discovery:**
1. Client hits `GET /api/rooms` with optional grade and category filters
2. JWT middleware validates access token, extracts `user_id`
3. Rooms service checks Redis cache for the specific filter combination
4. Cache hit — returns immediately from Redis
5. Cache miss — queries PostgreSQL, merges live participant counts from Redis, caches result with 60 second TTL, returns to client

---

## Tech Stack

### Mobile — React Native
| Technology | Purpose |
|---|---|
| React Native + Expo | Cross-platform mobile framework |
| Expo Router | File-based navigation |
| TypeScript | Type safety throughout |
| Zustand | Client state management — auth, UI state |
| TanStack Query | Server state — fetching, caching, synchronisation |
| Axios | HTTP client with JWT interceptors |
| Expo SecureStore | Persistent encrypted token storage |
| Expo Notifications + FCM | Push notification delivery |


### Infrastructure
| Service | Purpose |
|---|---|
| PostgreSQL on Neon | Primary relational database |
| Redis (Upstash) | Caching and ephemeral data |
| Render | Backend hosting |
| Cloudflare | CDN, DDoS protection, DNS |
| Resend | Email delivery via thefutureacademy.co.za domain |
| Google Play | Android app distribution |

---

## Project Structure

### Mobile

```
lockdin-app/
├── app/
│   ├── index.tsx              # Carousel onboarding — entry point
│   ├── _layout.tsx            # Root layout — font loading, auth guard
│   ├── (auth)/
│   │   ├── _layout.tsx        # Auth stack layout
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── verify-otp.tsx
│   ├── (onboarding)/
│   │   ├── _layout.tsx
│   │   ├── subjects.tsx       # Subject selection
│   │   ├── location.tsx       # Province and city
│   │   └── welcome.tsx        # Final onboarding screen
│   ├── (tabs)/
│   │   ├── _layout.tsx        # Tab bar
│   │   ├── index.tsx          # Discover Rooms
│   │   └── me.tsx             # Profile
│   └── room/
│       └── [id].tsx           # Live room screen
├── src/
│   ├── api/
│   │   ├── client.ts          # Axios instance, JWT interceptors
│   │   ├── auth.ts            # signup, login, verifyOtp
│   │   ├── rooms.ts           # fetchRooms
│   │   └── users.ts           # getProfile, updateProfile
│   ├── stores/
│   │   ├── authStore.ts       # Zustand — token, user, isAuthenticated
│   │   └── uiStore.ts         # Zustand — UI state
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useRooms.ts
│   ├── components/
│   │   ├── RoomCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── PulseDot.tsx
│   │   └── GradePickerModal.tsx
│   └── types/
│       ├── user.ts
│       └── room.ts
├── assets/
│   ├── fonts/
│   │   ├── DTGetaiGroteskDisplay-Black.ttf
│   │   └── Geist-Medium.ttf
│   └── images/
└── app.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli`
- Android Studio with Android SDK (for mobile development)

---



### Running the Mobile App

```bash
cd lockdin1.0.0/mobile

# Install dependencies
npm install

# Start on Android emulator
npx expo run:android

# Start on physical device
npx expo run:android --device
```

> Requires a connected Android device or running emulator with Android SDK configured. See [Expo documentation](https://docs.expo.dev/get-started/set-up-your-environment/) for environment setup.

---

## API Reference

All protected endpoints require a valid JWT access token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | Public | Create account, trigger OTP |
| POST | `/api/auth/login` | Public | Login with email, trigger OTP |
| POST | `/api/auth/verify-otp` | Public | Verify OTP, receive tokens |
| POST | `/api/auth/refresh` | Public | Exchange refresh token for new access token |
| POST | `/api/auth/logout` | Protected | Revoke refresh token |

### Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/users/me` | Protected | Get authenticated user profile |
| PUT | `/api/users/me` | Protected | Update profile |

### Rooms

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/rooms` | Protected | Get all rooms with optional filters |
| POST | `/api/rooms/:id/join` | Protected | Join a room, increment participant count |
| POST | `/api/rooms/:id/leave` | Protected | Leave a room, decrement participant count |

**Room query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `grade` | `integer` | Filter by grade (8–12) |
| `category` | `string` | Filter by category: `stem`, `commerce`, `humanities`, `creative_arts` |
| `search` | `string` | Full-text search across room name and subject |

---

## Authentication

Lockdin uses a phone number OTP authentication flow — no passwords.

**Signup flow:**
1. Client submits name, school, grade, email
2. User created with `is_verified: false`
3. 6-digit OTP generated, stored in PostgreSQL with 10 minute expiry
4. OTP delivered via email through Resend from `@thefutureacademy.co.za`
5. Client submits OTP code
6. OTP validated — `is_verified` flipped to `true`
7. JWT access token (60 minute expiry) and refresh token (30 day expiry) issued
8. Refresh token stored in PostgreSQL — revocable on logout or security incident

**Token strategy:**
- Access token — short-lived JWT, lives in Zustand memory only, never persisted to disk
- Refresh token — opaque 64-character alphanumeric string, persisted in Expo SecureStore, stored in PostgreSQL for revocation support
- Silent refresh — axios interceptor catches 401 responses, exchanges refresh token for new access token transparently

---

## Roadmap

- [x] Auth flow — signup, OTP verification, JWT, refresh tokens
- [x] Discover Rooms screen with real-time participant counts
- [x] Room search with full-text and trigram support
- [x] Redis caching layer
- [ ] Onboarding flow — subject selection, location, welcome screen
- [ ] Rooms API wired to frontend via TanStack Query
- [ ] LiveKit WebRTC integration — live video presence
- [ ] Avatar generation — selfie to avatar via Ready Player Me
- [ ] Notification Engineering — exam countdowns, study reminders
- [ ] Lockdin Assist — on-demand tutoring network
- [ ] Google Play Store release
- [ ] iOS release

---

## About

Lockdin is built and maintained by the team at **The Future Academy** — an EdTech company on a mission to deliver quality education to every South African student regardless of postcode, income, or circumstance.

*It is not just about school. It is about accountability in life itself. Start here.*
