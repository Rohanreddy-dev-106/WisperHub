# WisperHub Frontend

React + Vite frontend for the WisperHub anonymous social platform.

## Tech Stack

- **React 19** + **Vite**
- **React Router v7** – routing
- **Axios** – API calls (centralized instance with JWT interceptor)
- **Tailwind CSS v4** – styling
- **Framer Motion** – animations
- **React Icons** – icon set

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy `.env` or create one with:
```
VITE_API_URL=http://localhost:3000/api
```

### 3. Start development server
```bash
npm run dev
```

Make sure the backend is running on port **3000**.

---

## Folder Structure

```
src/
├── api/
│   └── axiosInstance.js       # Axios base URL + JWT + 401 interceptors
├── context/
│   └── AuthContext.jsx        # Global auth state (user, signIn, signOut)
├── services/
│   ├── auth.service.js        # POST /user/register, /user/login, DELETE /user/logout
│   ├── post.service.js        # GET/POST/PUT/DELETE /post/*
│   ├── comment.service.js     # GET/POST/DELETE /comment/*
│   └── social.service.js      # POST /like/*, POST+DELETE /audience/*
├── components/
│   ├── ProtectedRoute.jsx     # Redirect unauthenticated users
│   ├── AppNav/                # Authenticated top navigation bar
│   ├── PostCard/              # Post display with like, comment link, edit, delete
│   ├── CreatePost/            # Modal for creating or editing posts
│   └── CommentSection/        # Comments list + add/delete
└── pages/
    ├── LoginPage.jsx          # /login
    ├── RegisterPage.jsx       # /register
    ├── FeedPage.jsx           # /feed  (protected)
    ├── ProfilePage.jsx        # /profile/:userId  (protected)
    └── PostDetailPage.jsx     # /post/:postId  (protected)
```

---

## API → Page Mapping

| Page | Endpoint(s) |
|------|-------------|
| LoginPage | `POST /user/login` |
| RegisterPage | `POST /user/register` |
| FeedPage | `GET /post/get/:userId`, `POST /post/create`, `PUT /post/update/:id`, `DELETE /post/delete/:id` |
| ProfilePage | `GET /post/get/:userId`, `POST /audience/follow/:id`, `DELETE /audience/unfollow/:id` |
| PostDetailPage | `GET /post/get/:userId`, `POST /like/create-like/:postId`, `DELETE /post/delete/:id` |
| CommentSection | `GET /comment/read-comment/:postId`, `POST /comment/create-comment`, `DELETE /comment/delete-comment/:id` |

---

## Auth Flow

1. User logs in → server returns `{ token, user }`
2. Token stored in `localStorage` as `wh_token`, user object as `wh_user`
3. Axios request interceptor attaches `Authorization: Bearer <token>` to every request
4. Axios response interceptor catches `401` globally → clears storage and redirects to `/login`
5. `ProtectedRoute` wraps authenticated pages — unauthenticated visitors are redirected to `/login`
