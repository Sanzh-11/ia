import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import PrivateRoute from "./components/PrivateRoute";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";

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
      <Route path="/create-course" element={<CreateCourse />} />
      <Route path="/edit-course/:id" element={<EditCourse />} />
    </Routes>
  );
};

export default App;
