const express = require("express");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", upload, createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", upload, updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
