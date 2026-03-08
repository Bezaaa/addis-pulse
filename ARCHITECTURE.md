# 🏗️ Addis Pulse: Architectural Specification

This document outlines the high-level architectural decisions, data flow patterns, and infrastructure design for the **Addis Pulse** platform.

---

## 🏛️ Architectural Philosophy

Addis Pulse is built on the principle of **Infrastructure-First Development**. By containerizing the entire stack and defining strict data contracts via Prisma, the system ensures **Environment Parity**—the application behaves identically in local development, staging, and production.

---

## 💻 Tech Stack & Component Roles

| Layer         | Technology              | Responsibility                                                         |
| :------------ | :---------------------- | :--------------------------------------------------------------------- |
| **Framework** | Next.js 15 (App Router) | Handles Routing, Rendering (RSC), and Server-side logic via Actions.   |
| **Language**  | TypeScript              | Ensures type safety and reduces runtime errors across the full stack.  |
| **Database**  | PostgreSQL              | The primary "Source of Truth" for users, workspaces, and bookings.     |
| **ORM**       | Prisma                  | Acts as the type-safe bridge between TypeScript and the relational DB. |
| **Hot Cache** | Redis                   | Manages ephemeral state like real-time power status and rate limits.   |
| **Container** | Docker                  | Encapsulates dependencies and system-level libraries (OpenSSL).        |

---

## 📡 Core Data Flows

### 1. Geolocation Handshake (Client-to-Server)
To optimize for **Largest Contentful Paint (LCP)**, we avoid client-side fetching for the initial map load:
1.  **Detection:** A lightweight Client Component captures the user's coordinates via the `navigator.geolocation` API.
2.  **The Bridge:** Coordinates are persisted in **HTTP Cookies**.
3.  **Consumption:** The Server Component reads these cookies on the initial request, allowing PostgreSQL to perform distance-based queries *before* the HTML is even sent to the browser.

### 2. The "Heartbeat" Confidence System
Reliability in a high-fluctuation environment is managed through a confidence-score algorithm:
- **State Storage:** The "Live Status" is stored in **Redis** for sub-millisecond retrieval.
- **TTL (Time to Live):** Reports have an expiration window. After 6 hours, the system marks the status as "Stale" unless an **Owner Heartbeat** (manual verification) is received.
- **Background Tasks:** A revalidation process handles the transition from Postgres history to Redis hot-state.

---

### 3. Distributed State Synchronization
We leverage the **BroadcastChannel API** to ensure real-time consistency without the overhead of a centralized WebSocket server:
- **Event Emission:** Any mutation (e.g., updating power status) emits a signal on a shared browser bus.
- **Reactive Refresh:** All open tabs listen for this signal and trigger an on-demand `router.refresh()`, ensuring the user sees consistent data across their entire browser session.

---

## 🗄️ Data Modeling (ERD Logic)

The schema is designed for **Atomic Integrity** and future scalability:
- **RBAC:** Role-Based Access Control is enforced at the database level using Enums (`USER`, `OWNER`, `ADMIN`).
- **Relational Integrity:** Foreign key constraints and Cascading Deletes (specifically for notifications) prevent "Orphaned Data."
- **Indexing:** High-traffic columns (like `workspace.ownerId` and `user.email`) are indexed to maintain $O(\log N)$ lookup performance as the user base grows.

---

## 🛠️ Infrastructure & DevOps

The application is deployed as a **3-node application cluster**:
1.  **Nginx (Layer 7):** Acts as the ingress gateway, performing load balancing and SSL termination.
2.  **Stateless App Nodes:** Multiple instances of the Next.js container ensure that if one node fails, the load balancer redistributes traffic to healthy nodes with zero downtime.
3.  **Persistence Layer:** Named volumes are utilized to ensure that PostgreSQL data persists across container restarts and updates.

---

## 🧪 Architect's Intent

> "In architecting Addis Pulse, the primary goal was to solve the **'Stale Data'** problem prevalent in local infrastructure tracking. By combining **React Suspense** for streaming with **Redis** for hot-state management, the system provides immediate visual feedback while maintaining strong data consistency. This architecture is built to be **cloud-agnostic**, ready to move from local Docker Compose to AWS ECS or Kubernetes without refactoring."