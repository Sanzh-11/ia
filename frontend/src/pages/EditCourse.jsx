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
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/courses/${id}`
        );
        const course = response.data.course;
        setFormData({
          title: course.title,
          description: course.description,
        });
        setCurrentMaterial(course.material);
        setCurrentThumbnail(course.thumbnail);
      } catch (error) {
        console.error("Error fetching course:", error);
        setError("Error fetching course details");
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create URL for PDF preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = new FormData();
    courseData.append("title", formData.title);
    courseData.append("description", formData.description);
    if (file) courseData.append("material", file);

    try {
      await axios.put(`http://localhost:8080/api/courses/${id}`, courseData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Fetch updated course data after successful update
      const response = await axios.get(
        `http://localhost:8080/api/courses/${id}`
      );
      const updatedCourse = response.data.course;

      // Update local state with new data
      setFormData({
        title: updatedCourse.title,
        description: updatedCourse.description,
      });
      setCurrentMaterial(updatedCourse.material);
      setCurrentThumbnail(updatedCourse.thumbnail);
      setFile(null);
      setPreviewUrl(null);

      // Show success message or navigate
      navigate("/teacher-dashboard");
    } catch (error) {
      console.error("Error updating course:", error);
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Current Material
            {currentMaterial && (
              <div className="mt-2">
                <iframe
                  src={`http://localhost:8080${currentMaterial}`}
                  width="100%"
                  height="500px"
                  className="border mt-2"
                  title="Current PDF"
                />
              </div>
            )}
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload New Material (PDF file)
            <input
              type="file"
              name="material"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload your new course material in PDF format (leave empty to keep
              current material)
            </p>
          </label>
          {previewUrl && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Preview New Material:
              </h3>
              <iframe
                src={previewUrl}
                width="100%"
                height="500px"
                className="border"
                title="PDF Preview"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Current Thumbnail
            {currentThumbnail && (
              <img
                src={`http://localhost:8080${currentThumbnail}`}
                alt="Current thumbnail"
                className="mt-2 max-w-xs"
              />
            )}
          </label>
        </div>

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
