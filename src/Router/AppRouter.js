import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
import MyBlog from "../pages/Dashboard/MyBlog";
import DynamicReadBlog from "../pages/DynamicReadBlog";
import HomePage from "../pages/HomePage"
import BlogPage from "../pages/BlogPage"
import DashboardContainer from "../pages/Dashboard/DashboardContainer";
const ProfilePage = lazy(() => import("../pages/Dashboard/Profile"));
const CreateBlog = lazy(() => import("../pages/Dashboard/CreateBlog"));
const UpdateBlog = lazy(() => import("../pages/Dashboard/UpdateBlog"));
const UpdatePassword = lazy(() => import("../pages/Dashboard/UpdatePassword"));

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <HomePage />
        }
      />

      <Route
        path="/blogs"
        element={
            <BlogPage />
        }
      />

      <Route
        path="/blogs/blog/:id"
        element={
          <Suspense fallback={<Loader />}>
            <DynamicReadBlog />
          </Suspense>
        }
      />

      <Route path={`/user/dashboard`} element={<DashboardContainer />}>
        <Route
          path={`/user/dashboard/profile`}
          element={
            <Suspense fallback={<Loader />}>
              <ProfilePage />
            </Suspense>
          }
        />
        <Route
          path={`/user/dashboard/create-blog`}
          element={
            <Suspense fallback={<Loader />}>
              <CreateBlog />
            </Suspense>
          }
        />
        <Route
          path={`/user/dashboard/update-blog`}
          element={
            <Suspense fallback={<Loader />}>
              <UpdateBlog />
            </Suspense>
          }
        />
        <Route
          path={`/user/dashboard/update-password`}
          element={
            <Suspense fallback={<Loader />}>
              <UpdatePassword />
            </Suspense>
          }
        />
        <Route
          path={`/user/dashboard/my-blogs`}
          element={
            <Suspense fallback={<Loader />}>
              <MyBlog />
            </Suspense>
          }
        />
        <Route
          path={`/user/dashboard/update-blog/:id`}
          element={
            <Suspense fallback={<Loader />}>
              <UpdateBlog/>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRouter;
