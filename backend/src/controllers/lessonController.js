const Lessons = require("../models/lessons");
const Course = require("../models/course"); // ✅ ADD THIS
const z = require('zod');

const addLessonBody = z.object({
    title: z.string().min(3),
    description: z.string(),
    videoURL: z.string()
});

// ✅ addLesson - CORRECTED
exports.addLesson = async (req, res) => {
    try {
        const parsed = addLessonBody.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ // ✅ Changed to 400
                error: "Invalid lesson data",
                details: parsed.error.errors
            });
        }

        const {title, description, videoURL} = req.body;
        const courseId = req.params.courseId;

        // ✅ Fixed findById syntax
        const courseExists = await Course.findById(courseId);
        if (!courseExists) {
            return res.status(404).json({ error: "Course not found" });
        }

        // TODO: Upload video to cloudinary

        const lesson = await Lessons.create({
            title,
            description,
            videoURL,
            courseId
        });

        // ✅ OPTIONAL: Push lesson to course.lessons array
        await Course.findByIdAndUpdate(courseId, {
            $push: { lessons: lesson._id }
        });

        return res.status(201).json({ // ✅ 201 for created
            message: "Lesson created successfully!",
            lesson
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create lesson",
            error: error.message
        });
    }
}

// ✅ getLessonsByCourse - CORRECTED
exports.getLessonsByCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId; // ✅ Fixed destructuring
        
        // ✅ Changed to find() and added await
        const lessons = await Lessons.find({ courseId: courseId });
        
        if(!lessons || lessons.length === 0) {
            return res.status(404).json({
                message: "No lessons found for this course"
            });
        }

        return res.status(200).json({
            message: "Lessons found",
            count: lessons.length,
            lessons // ✅ Renamed variable
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error while finding lessons",
            error: error.message
        });
    }
}

// ✅ getLessonById - CORRECTED
exports.getLessonById = async (req, res) => {
    try {
        const lessonId = req.params.lessonId;
        
        // ✅ Simplified - just fetch the lesson
        const lesson = await Lessons.findById(lessonId);
        
        // ✅ Added response
        if (!lesson) {
            return res.status(404).json({ error: "Lesson not found" });
        }

        return res.status(200).json({
            message: "Lesson found",
            lesson
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            error: "Server Error",
            message: error.message 
        });
    }
}

// ✅ updateLesson - CORRECTED
exports.updateLesson = async (req, res) => {
    try {
        const lessonId = req.params.lessonId;
        
        if(!lessonId) {
            return res.status(400).json({
                message: "Lesson ID is required"
            });
        }

        const userId = req.user.id;
        
        // ✅ First find the lesson
        const lesson = await Lessons.findById(lessonId);
        if (!lesson) {
            return res.status(404).json({ error: "Lesson not found" });
        }

        // ✅ Then check if user is the course instructor
        const course = await Course.findById(lesson.courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        if (course.instructor.toString() !== userId) {
            return res.status(403).json({
                error: "You are not authorized to update this lesson"
            });
        }

        const {title, description, videoURL} = req.body;

        // TODO: If new video uploaded, upload to cloudinary
        // const updatedVideoURL = await uploadToCloudinary(videoURL);

        // ✅ Fixed updateOne syntax
        const updatedLesson = await Lessons.findByIdAndUpdate(
            lessonId,
            {
                title,
                description,
                videoURL // ✅ Use videoURL instead of thumbnail
            },
            { new: true } // Return updated document
        );

        return res.status(200).json({
            message: "Lesson updated successfully!",
            lesson: updatedLesson
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            error: "Server Error",
            message: error.message 
        });
    }
}

// ✅ deleteLesson - COMPLETED
exports.deleteLesson = async (req, res) => {
    try {
        const lessonId = req.params.lessonId; // ✅ Fixed params access
        
        if(!lessonId) {
            return res.status(400).json({
                message: "Lesson ID is required"
            });
        }

        // Find the lesson
        const lesson = await Lessons.findById(lessonId);
        if (!lesson) {
            return res.status(404).json({ error: "Lesson not found" });
        }

        // ✅ Fetch parent course
        const course = await Course.findById(lesson.courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // ✅ Verify instructor
        const userId = req.user.id;
        if (course.instructor.toString() !== userId) {
            return res.status(403).json({
                error: "You are not authorized to delete this lesson"
            });
        }

        // ✅ Delete lesson
        await Lessons.findByIdAndDelete(lessonId);

        // ✅ Remove from course.lessons array
        await Course.findByIdAndUpdate(course._id, {
            $pull: { lessons: lessonId }
        });

        return res.status(200).json({
            message: "Lesson deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            error: "Server Error",
            message: error.message 
        });
    }
}