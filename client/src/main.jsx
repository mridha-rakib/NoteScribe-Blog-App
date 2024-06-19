import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider.jsx";
import HomeScreen from "./pages/HomeScreen.jsx";
import RegisterScreen from "./pages/RegisterScreen.jsx";
import LoginScreen from "./pages/LoginScreen.jsx";
import AboutScreen from "./pages/AboutScreen.jsx";
import ProjectsScreen from "./pages/ProjectsScreen.jsx";
import DashboardScreen from "./pages/DashboardScreen.jsx";
import CreatePostScreen from "./pages/CreatePostScreen.jsx";
import OnlyAdminPrivateRoute from "./components/onlyAdminPrivateRoute.jsx";
import UpdatePost from "./pages/UpdatePostScreen.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import PrivateRoute from "./components/PrivateRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/sign-in" element={<LoginScreen />} />
      <Route path="/sign-up" element={<RegisterScreen />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardScreen as="div" />} />
      </Route>
      <Route element={<OnlyAdminPrivateRoute />}>
        <Route path="create-post" element={<CreatePostScreen />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
      </Route>
      <Route path="/projects" element={<ProjectsScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
