const Course = require("../models/course");
const z = require('zod');

const fs = require('fs');
const cloudinary  = require("../../config/cloudinary");

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

        const { title, description, category} = req.body;
        const instructorId = req.user.id;
        if (req.user.role !== "instructor") {
        return res.status(403).json({ error: "Only instructors can create courses" });
        }

        
        //Checking if the file exist or not !
        if(!req.file) {
            return res.status(400).json({
                error : "Thumbnail is required!"
            });
        }
        
        //Uploaidng the the file to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'course-thumbnails',
            resource_type: 'image'
        });

        // Delete local file after upload
        fs.unlinkSync(req.file.path);

        // Create course
        const newCourse = await Course.create({
            title,
            description,
            thumbnail : result.secure_url,
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



exports.getAllCourses = async (req, res) => {
    
  try {
    let filter = {};

    const { category} = req.query;

    if (category) {
      filter.category = category;
    }

    const allCourse = await Course.find(filter);

    return res.status(200).json({
      message: "Data fetched successfully",
      courses: allCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Server error while fetching courses",
    });
  }
};


exports.getCourseById = (req, res) => {
    //getting id from the URL
    const id = req.param.id;
   try {
     const courseById = Course.findById(id)
     .select('title, description ,thumbnail');
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        error: "Server error while fetching course"
    })
   }
};
