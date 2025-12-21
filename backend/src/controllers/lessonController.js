const Lessons = require("../models/lessons");
const Course = require("../models/course");
const cloudinary = require("../../config/cloudinary");
const z = require("zod");

/* -------------------- VALIDATION -------------------- */
const addLessonBody = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

/* ====================================================
   ADD LESSON (INSTRUCTOR ONLY)
==================================================== */
exports.addLesson = async (req, res) => {
  try {
    // Validate body
    const parsed = addLessonBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }

    const { title, description } = req.body;
    const { courseId } = req.params;
    const userId = req.user.id;

    // Check course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // 🔐 Authorization
    if (course.instructor.toString() !== userId) {
      return res.status(403).json({
        error: "You are not authorized to add lessons to this course",
      });
    }

    // Check video
    if (!req.file) {
      return res.status(400).json({ error: "Video file is required" });
    }

    // ☁️ Upload video to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        resource_type: "video",
        folder: "course-videos",
      }
    );

    // Create lesson
    const lesson = await Lessons.create({
      title,
      description,
      videoURL: uploadResult.secure_url,
      courseId,
    });

    // Link lesson to course
    course.lessons.push(lesson._id);
    await course.save();

    return res.status(201).json({
      message: "Lesson created successfully",
      lesson,
    });
  } catch (error) {
    console.error("Add Lesson Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

/* ====================================================
   GET LESSONS BY COURSE (PUBLIC)
==================================================== */
exports.getLessonsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const lessons = await Lessons.find({ courseId }).sort({ createdAt: 1 });

    return res.status(200).json({
      message: "Lessons fetched successfully",
      count: lessons.length,
      lessons,
    });
  } catch (error) {
    console.error("Get Lessons Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

/* ====================================================
   GET SINGLE LESSON (PUBLIC)
==================================================== */
exports.getLessonById = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lessons.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    return res.status(200).json({
      message: "Lesson fetched successfully",
      lesson,
    });
  } catch (error) {
    console.error("Get Lesson Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
