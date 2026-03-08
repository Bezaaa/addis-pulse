📡 Project: Addis Pulse
Vision: A real-time availability and booking platform for the Addis Ababa remote workforce.
Objective: Optimize the search for stable power and internet while creating a monetization loop for workspace owners.
🏗️ 1. Technical Stack (The Infrastructure)
Framework: Next.js 15 (App Router, React Server Components).
Language: TypeScript (Strict Mode).
Database: PostgreSQL (Managed via Prisma ORM).
Cache/Hot State: Redis (For real-time status and rate limiting).
Containerization: Docker & Docker Compose (Environment Parity).
Security: NextAuth (RBAC), Middleware-level Geofencing.
🗺️ 2. Core Architectural Workflows
A. Geolocation Handshake (Client-to-Server)
To ensure sub-second performance without "Loading Spinners":
Client: Captures Lat/Lng via Browser API.
Bridge: Encodes coordinates into HTTP Cookies.
Server: RSC reads cookies on the initial request.
Database: Performs a distance-based query to return only nearby workspaces.
B. The "Heartbeat" Confidence System
To solve the "Truth Gap" in the Ethiopian context:
Green (Fresh): Updated/Verified within < 4 hours.
Yellow (Stale): 4–12 hours since last update.
Gray (Unverified): > 12 hours. Triggers a "Request Heartbeat" notification to the Owner.
Status Note: Allows owners to provide context (e.g., "Planned maintenance until 4 PM").
C. Booking & Refund Protocol
Booking: Atomic transaction to reserve a seat.
Fault Policy: If a user reports "No Power" during a paid booking, the system initiates a Conditional Credit.
Resolution: The owner has 1 hour to dispute. If no dispute, the user receives an automatic credit for their next session (minimizing manual admin work).
📊 3. Data Schema (Simplified)
User: (Roles: USER, OWNER, ADMIN).
Workspace: (Geo-coordinates, price, official status, verification status).
StatusReport: (Crowdsourced verification logs to keep owners honest).
Booking: (Time-slotted reservations with payment status).
🚀 4. Development Roadmap (Phase 1: MVP)
Milestone 1: The Foundation

Dockerized environment (App, DB, Redis) stable.

Prisma schema migrated to local Postgres.

User Auth (Login/Register) with Role selection.
Milestone 2: The Discovery Engine

Geolocation-to-Cookie bridge implemented.

Workspace Registration form for OWNER role.

Dashboard: List of nearby workspaces with "Live" power/internet icons.
Milestone 3: The Status Loop

Owner-only "Status Toggle" with Redis-backed hot-cache.

Automatic "Confidence" styling (Green/Yellow/Gray) based on timestamps.

User "Verification Ping" logic.
💡 5. Senior Strategy Notes
Scalability: We use Redis for status because checking "Power status" is a high-frequency read. We don't want to hit Postgres for every single map move.
Resilience: We implement Global Error Boundaries specifically for the Map and Payment modules.
Performance: Use React Suspense to stream the workspace list so the map shell is visible immediately.