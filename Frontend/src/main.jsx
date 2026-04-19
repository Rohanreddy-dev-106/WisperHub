import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import App from "./App";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Protected pages
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import PostDetailPage from "./pages/PostDetailPage";
import ExplorePage from "./pages/ExplorePage";

import ApiDocsPage from "./pages/ApiDocsPage";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path='/' element={<App />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* Protected – requires authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path='/feed' element={<FeedPage />} />
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='/profile/:userId' element={<ProfilePage />} />
          <Route path='/post/:postId' element={<PostDetailPage />} />
        </Route>

        {/* Fallback */}
         <Route
            path="/api-doc-wisperhub"
            element={<ApiDocsPage />}
          />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
);
