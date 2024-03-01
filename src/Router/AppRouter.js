import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage"));
const BlogPage = lazy(() => import("../pages/BlogPage"));
function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense>
            <HomePage />
          </Suspense>
        }
      />

      <Route
        path="/blogs"
        element={
          <Suspense>
            <BlogPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default AppRouter;
