import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/courses/${id}`
        );
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error details:", error);
        setError("Error fetching course details");
      }
    };
    fetchCourse();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!course) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p className="mt-2 text-gray-600">{course.description}</p>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Course Material</h2>
        <iframe
          src={`http://localhost:8080${course.material}`}
          width="100%"
          height="500px"
          className="border mt-2"
        />
      </div>
    </div>
  );
};

export default CourseDetails;
