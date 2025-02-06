import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import PrivateRoute from "./components/PrivateRoute";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import CourseDetails from "./pages/CourseDetails";
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute role="student">
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/teacher-dashboard"
        element={
          <PrivateRoute role="teacher">
            <TeacherDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-course"
        element={
          <PrivateRoute role="teacher">
            <CreateCourse />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-course/:id"
        element={
          <PrivateRoute role="teacher">
            <EditCourse />
          </PrivateRoute>
        }
      />
      <Route
        path="/course/:id"
        element={
          <PrivateRoute role="student">
            <CourseDetails />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
