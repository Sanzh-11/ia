import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !file || !thumbnail) {
      setError("All fields are required.");
      return;
    }

    const courseData = new FormData();
    courseData.append("title", formData.title);
    courseData.append("description", formData.description);
    courseData.append("material", file);
    courseData.append("thumbnail", thumbnail);

    try {
      await axios.post("http://localhost:8080/api/courses", courseData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/teacher-dashboard");
    } catch (error) {
      console.error("Error details:", error);
      setError(error.response?.data?.message || "Error creating course.");
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          className="border p-2 rounded w-full"
          value={formData.title}
          onChange={handleChange}
          required
          data-gramm="false"
        />
        <textarea
          name="description"
          placeholder="Course Description"
          className="border p-2 w-full"
          value={formData.description}
          onChange={handleChange}
          required
          data-gramm="false"
        />
        <input type="file" accept=".pdf" onChange={handleFileChange} required />
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleThumbnailChange}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
