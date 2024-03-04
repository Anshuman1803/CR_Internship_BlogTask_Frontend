import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
import MyBlog from "../pages/Dashboard/MyBlog";
import DynamicReadBlog from "../pages/DynamicReadBlog";

const HomePage = lazy(() => import("../pages/HomePage"));
const BlogPage = lazy(() => import("../pages/BlogPage"));
const ProfilePage = lazy(() => import("../pages/Dashboard/Profile"));
const CreateBlog = lazy(() => import("../pages/Dashboard/CreateBlog"));
const UpdateBlog = lazy(() => import("../pages/Dashboard/UpdateBlog"));
const UpdatePassword = lazy(() => import("../pages/Dashboard/UpdatePassword"));
const DashboardContainer = lazy(() =>
  import("../pages/Dashboard/DashboardContainer")
);
function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        }
      />

      <Route
        path="/blogs"
        element={
          <Suspense fallback={<Loader />}>
            <BlogPage />
          </Suspense>
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


      <Route
        path={`/user/dashboard`}
        element={
          <Suspense fallback={<Loader />}>
            <DashboardContainer />
          </Suspense>
        }
      >
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
              <MyBlog/>
            </Suspense>
          }
        />

      </Route>

    </Routes>
  );
}

export default AppRouter;
