# 📡 Addis Pulse
### **Real-time Workspace Resilience & Booking Platform**

**Addis Pulse** is a high-performance system designed to bridge the infrastructure gap for remote workers and freelancers in Addis Ababa. It provides a real-time "Pulse" on power and internet availability across local workspaces, integrated with a secure booking and payment ecosystem.

---

## 🏗️ System Architecture

This project is built using a **Production-First** mindset, moving beyond simple CRUD to a distributed, containerized architecture.

### **The Stack**
- **Frontend:** Next.js 15 (App Router), React Server Components (RSC), TypeScript, Tailwind CSS.
- **State & Sync:** BroadcastChannel API (Cross-tab sync), React Suspense (Streaming).
- **Backend:** Next.js Server Actions, Node.js.
- **Persistence:** PostgreSQL with Prisma ORM.
- **Hot-State Cache:** Redis (Status heartbeats and rate limiting).
- **Infrastructure:** Docker & Docker Compose (3-node application cluster pattern).

### **Engineering Highlights**
- **Streaming Architecture:** Leverages RSC and Suspense to achieve sub-second perceived performance by streaming workspace data while the UI shell remains interactive.
- **Geospatial Handshake:** Implements a Client-to-Server bridge via the Geolocation API and HTTP Cookies, allowing for server-side distance calculations without layout shifts.
- **Stateless Scaling:** Uses Redis as a distributed source of truth for "Live Pulse" data, ensuring consistency across horizontally scaled application nodes.
- **Confidence-Score Logic:** A custom timestamp-based algorithm that categorizes data freshness (Fresh, Stale, Unverified) to ensure users can trust the availability signals.

---

## 🚀 Key Features

- **Live Pulse Map:** Interactive geospatial search for workspaces with real-time power and internet status.
- **Owner Verification System:** A dedicated dashboard for workspace owners to update status with contextual notes (e.g., "Maintenance until 2 PM").
- **Smart Bookings:** Slot-based reservation system with a built-in "Outage Credit" protocol for user protection.
- **Cross-Tab Consistency:** Instant UI updates across multiple browser tabs using the BroadcastChannel API.

---

## 🛠️ Local Development (Docker)

This project is fully containerized to ensure **Environment Parity**. To spin up the local cluster (Next.js, Postgres, Redis):

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Bezaaa/addis-pulse.git
   cd addis-pulse