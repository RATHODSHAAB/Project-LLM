const Course = require("../models/course").default;
const z = require('zod');

const createCourseBody = z.object({
    title: z.string().min(3),
    description: z.string(),
    category: z.string()
});

exports.createCourse = async (req, res) => {
    try {
        // Validate input
        const parsed = createCourseBody.safeParse(req.body);

        if (!parsed.success) {
            return res.status(403).json({
                error: "Sent data is not correct!"
            });
        }

        const { title, description, category, instructorId } = req.body;

        // Get local file path from multer
        const thumbnail = req.file.path;

        // Create course
        const newCourse = await Course.create({
            title,
            description,
            thumbnail,
            category,
            instructorId
        });

        return res.status(200).json({
            message: "New course added!!",
            course: newCourse
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error!"
        });
    }
};



exports.getAllCourses = (req, res) => {
    
};


exports.getCourseById = (req, res) => {

};
