# WisperHub 🕵️

> **An anonymous social media platform where privacy comes first.**

WisperHub is a full stack social networking application built with Node.js and MongoDB, designed around anonymous user interactions. Users can post, like, comment, and follow others — all without revealing their real identity.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (JSON Web Tokens) |
| API Docs | Swagger UI |
| Background Jobs | Cron Jobs |
| Security | Rate Limiting, CORS, Cookie Parser, UA Parser |

---

## ✨ Features

- **Anonymous Identity** — Users are identified by a generated unique ID, not personal info
- **Authentication** — Secure register, login, and logout using JWT stored in cookies
- **Posts** — Create, read, update, and delete posts
- **Likes** — Toggle like/dislike on posts with live count sync
- **Comments** — Add and delete comments on posts
- **Follow System** — Follow/unfollow users with bidirectional relationship tracking
- **Ban System** — IP-based user banning with automatic expiry via cron job
- **Rate Limiting** — Protects API from abuse (100 requests/hour)
- **UA Parsing** — Detects user device and browser info per request
- **API Documentation** — Full Swagger UI at `/api-doc-wisperhub`

---

## 📁 Project Structure

```
├── index.js                  # Entry point, middleware setup
├── swagger_ui.json           # Swagger API documentation config
└── src/
    ├── routes/
    │   ├── users.routs.js
    │   ├── post.routs.js
    │   ├── like.routs.js
    │   ├── comment.routes.js
    │   ├── follow.routs.js
    │   └── ban.routs.js
    ├── controllers/          # Request handlers
    ├── services/
    │   └── cron.job.js       # Auto-expiry for bans
    ├── middlewares/
    │   └── jwtAuth.js        # JWT authentication middleware
    ├── repositories/         # Database logic layer
    │   ├── users_repo.js
    │   ├── post_repo.js
    │   ├── like_repo.js
    │   ├── comment_repo.js
    │   ├── follow_repo.js
    │   └── ban_user_repo.js
    └── models/               # Mongoose schemas
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/wisperhub.git
cd wisperhub

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/wisperhub
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

### Run the Server

```bash
# Development
npm run dev

# Production
npm start
```

The server will start at `http://localhost:3000`

---

## 📖 API Reference

Full interactive documentation is available at:

```
http://localhost:3000/api-doc-wisperhub
```

### Quick Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/user/register` | ❌ | Register new user |
| POST | `/api/user/login` | ❌ | Login and get JWT |
| DELETE | `/api/user/logout` | ✅ | Logout user |
| POST | `/api/post/create` | ✅ | Create a post |
| PUT | `/api/post/update/:postId` | ✅ | Update a post |
| GET | `/api/post/get/:userId` | ✅ | Get posts by user |
| DELETE | `/api/post/delete/:postId` | ✅ | Delete a post |
| POST | `/api/like/create-like/:postId` | ✅ | Toggle like/dislike |
| POST | `/api/comment/create-comment` | ✅ | Add a comment |
| GET | `/api/comment/read-comment/:postId` | ✅| Read comments |
| DELETE | `/api/comment/delete-comment/:id` | ✅ | Delete a comment |
| POST | `/api/audience/follow/:targetUserId` | ✅ | Follow a user |
| DELETE | `/api/audience/unfollow/:targetUserId` | ✅ | Unfollow a user |
| POST | `/api/ban` | ✅ | Ban a user |

> ✅ = Requires JWT token in cookie

---

## 🔐 Authentication Flow

1. Register via `POST /api/user/register`
2. Login via `POST /api/user/login` — receives a JWT stored as a cookie
3. All protected routes automatically validate the JWT via `jwtAuth` middleware
4. Logout via `DELETE /api/user/logout` — clears the cookie

---

## 🏗️ Architecture Decisions

**Repository Pattern** — Business logic is separated from route handlers using a dedicated repository layer for each feature. This keeps controllers clean and makes the data layer easy to test or swap.

**MongoDB Transactions** — The ban system and follow/unfollow system use MongoDB sessions and transactions to ensure atomic operations across multiple collections. If any step fails, the entire operation rolls back.

**Cron Job for Bans** — Rather than checking ban expiry on every request, a scheduled cron job handles cleanup in the background, keeping request latency low.

**Toggle Like Logic** — The like system checks for an existing like record before deciding to like or dislike, and syncs the count in the Post document — no extra query needed to get the current count.

---

## 🛠️ Known Improvements (Future Scope)

- [ ] Input validation with Zod
- [ ] Notification system
- [ ] Redis-based rate limiting for distributed environments

---

## 👤 Author

Built by **[Rohan Reddy]**

---