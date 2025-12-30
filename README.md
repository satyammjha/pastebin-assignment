---

# Pastebin-Lite

A secure, ephemeral text sharing application built with Next.js. Users can create pastes with optional expiration settings (Time-to-Live and Max Views).

**Live Demo:** [https://pastebin.satyamm.in](https://pastebin.satyamm.in)

## 🛠 Tech Stack

- **Framework:** Next.js (Pages Router)
- **Database:** MongoDB (via Mongoose)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI & Lucide React
- **Notifications:** Sonner
- **Deployment:** Vercel

## 💾 Persistence Layer Choice

**MongoDB Atlas** was chosen for persistence.

- **Why:** The document-based model maps perfectly to JSON paste data.
- **Robustness:** utilized MongoDB's atomic operators (`$inc`) to strictly enforce **Max View** limits. This ensures thread safety and prevents race conditions where concurrent requests could exceed the view limit.

## ✅ Functional Requirements

- [x] Create pastes with arbitrary text.
- [x] **TTL Expiry:** Pastes automatically expire after a set duration.
- [x] **View Limits:** Pastes delete themselves after a specific number of reads (Atomic decrement).
- [x] **Test Mode:** Supports `x-test-now-ms` header for deterministic time travel testing.
- [x] **Health Check:** `/api/healthz` endpoint verifying DB connectivity.
- [x] **Responsive UI:** Full mobile support with Dark/Light mode.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/satyammjha/pastebin-assignment.git
cd pastebin-assignment
```

### 2. Install dependencies

```bash
npm install
# or
bun install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory. You can copy the example template:

```bash
cp .env.example .env.local
```

Fill in your variables in `.env.local`:

```bash
MONGODB_URI="your_mongodb_connection_string"
# Set to 1 only if testing time-travel logic locally
TEST_MODE=1
```

### 4. Run the development server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 👤 Author

**Satyam Jha**

- **LinkedIn:** [linkedin.com/in/satyammjha](https://www.linkedin.com/in/satyammjha)
- **Website:** [satyamm.in](https://satyamm.in)
