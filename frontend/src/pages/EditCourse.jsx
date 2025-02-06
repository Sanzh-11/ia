import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/courses/${id}`
        );
        setFormData({
          title: response.data.title,
          description: response.data.description,
        });
      } catch (error) {
        setError("Error fetching course.", error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = new FormData();
    courseData.append("title", formData.title);
    courseData.append("description", formData.description);
    if (file) courseData.append("material", file);

    try {
      await axios.put(`http://localhost:8080/api/courses/${id}`, courseData);
      navigate("/teacher-dashboard");
    } catch (error) {
      setError("Error updating course.");
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          className="border p-2 rounded w-full"
          value={formData.title}
          onChange={handleChange}
          data-gramm="false"
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          className="border p-2 w-full"
          value={formData.description}
          onChange={handleChange}
          data-gramm="false"
          required
        />
        <input
          type="file"
          name="material"
          accept=".pdf"
          onChange={handleFileChange}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
