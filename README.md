# 🕵️ WhisperHub: Full-Stack Anonymous Social Media

**WhisperHub** is a privacy-first MERN application. It allows users to interact, post, and follow without revealing their real-world identities. The platform features a robust Node.js/MongoDB backend and a sleek, responsive React frontend.

---

## 🚀 Tech Stack


### Backend (Server)
* **Node.js & Express.js**
* **MongoDB & Mongoose** (Repository Pattern)
* **Socket.IO** (Real-Time Bidirectional Event-Based Communication)
* **JWT** (Cookie-based Authentication)
* **Node-Cron** (Background Ban Cleanup)
* **Swagger UI** (API Documentation)

### Frontend (Client)
* **React.js** (Functional Components, Hooks)
* **Tailwind CSS** (Styling & Dark Mode)
* **Axios** (API Requests)
* **React Router Dom** (Navigation)

---

## ✨ Key Features

* **Anonymous Identity:** Unique IDs generated for users; no personal data stored.
* **Secure Auth:** JWT-in-cookie authentication for seamless, secure sessions.
* **Social Interactions:** Live updates using Socket.IO for like toggles, threaded comments, and a bidirectional follow system.
* **User Profiles:** Customizable profiles featuring anonymous names, avatars, bios, and follower statistics.
* **Admin Safety:** IP-based banning with automatic expiry handled by cron jobs.
* **Performance:** Rate limiting and UA parsing for security and analytics.
* **Modern UI:** A minimalist, dark-themed interface built for focus and privacy.

---

## 📁 Project Structure

```text
wisperhub/
├── Frontend/              # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI (Buttons, Cards, Modals)
│   │   ├── pages/         # Feed, Profile, Login, Register
│   │   ├── hooks/         # Custom hooks for Auth and API
│   │   └── utils/         # Axios config and helpers
├── Backend/               # Node.js Backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── repositories/  # Database logic (Repo Pattern)
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API endpoints
│   │   └── middlewares/   # JWT and Ban checks
│   └── index.js           # Server entry point
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/wisperhub.git
cd wisperhub

# Install Backend deps
cd Backend && npm install

# Install Frontend deps
cd ../Frontend && npm install
```

### 2. Environment Setup
Create a `.env` in the `Backend` folder:
```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
```

### 3. Run Development
**Start Backend:**
```bash
cd Backend
npm run dev
```
**Start Frontend:**
```bash
cd Frontend
npm run dev
```

---

## 🏗️ Architecture Decisions

* **The Repository Pattern:** We separate the "How" (Database queries) from the "What" (Business logic in controllers). This makes the backend highly maintainable.
* **State Management:** Utilizing React's `Context API` or `Redux` (optional) to handle user authentication status globally.
* **Atomic Transactions:** Follow/Unfollow actions use MongoDB transactions to ensure data consistency between the `Followers` and `Following` counts.
* **The "Silent" Ban:** The IP-based ban system integrates with the `jwtAuth` middleware to block access immediately without requiring extra lookups during active sessions.

---

## 📖 API Documentation
Once the server is running, visit:
`http://localhost:3000/api-doc-wisperhub`

---

## 🛠️ Roadmap
- [ ] **Image Uploads:** Anonymous image sharing via Cloudinary/AWS S3.
- [x] **Real-time Notifications:** Socket.io integration for likes and follows.
- [ ] **Global Search:** Search for posts by keywords or unique User IDs.

---

## 👤 Author
Built with 💚 by **Rohan Reddy**