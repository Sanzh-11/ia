import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/courses");
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          className="border p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course._id}
            className="border p-4 cursor-pointer hover:bg-gray-100 rounded-lg shadow"
            onClick={() => navigate(`/course/${course._id}`)}
          >
            <img
              src={`http://localhost:8080${course.thumbnail}`}
              alt={course.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-bold">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>
        ))}
      </div>
      {filteredCourses.length === 0 && (
        <p className="text-gray-500 text-center mt-4">
          {courses.length === 0
            ? "No courses available."
            : "No courses match your search."}
        </p>
      )}
    </div>
  );
};

export default Dashboard;
