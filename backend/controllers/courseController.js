const Course = require("../models/Course");

const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.files || !req.files.thumbnail || !req.files.material) {
      return res
        .status(400)
        .json({ message: "Both thumbnail and material files are required" });
    }

    const thumbnail = `/uploads/${req.files.thumbnail[0].filename}`;
    const material = `/uploads/${req.files.material[0].filename}`;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCourse = await Course.create({
      title,
      description,
      thumbnail,
      material,
    });

    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error("Course creation error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ message: "Courses fetched successfully", courses });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course fetched successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.title = title || course.title;
    course.description = description || course.description;
    if (req.file) {
      course.material = req.file.filename;
    }

    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    await course.deleteOne();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
