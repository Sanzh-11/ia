import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/courses");
        console.log("Courses response:", response.data);
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses");
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/courses/${id}`);
      setCourses(courses.filter((course) => course._id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
      setError("Failed to delete course");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        placeholder="Search courses..."
        className="border p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button
        className="bg-green-500 text-white p-2 rounded mb-4"
        onClick={() => navigate("/create-course")}
      >
        + Create New Course
      </button>

      {courses.length === 0 ? (
        <p className="text-gray-500">No courses available.</p>
      ) : (
        <ul className="space-y-4">
          {courses
            .filter((course) =>
              course.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((course) => (
              <li
                key={course._id}
                className="border p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-bold">{course.title}</h2>
                  <p className="text-sm text-gray-600">{course.description}</p>
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                    onClick={() => navigate(`/edit-course/${course._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherDashboard;
