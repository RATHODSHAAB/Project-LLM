const course = require("../models/course");
const Course = require("../models/course");
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

        const { title, description, category} = req.body;
        const instructorId = req.userId;

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



exports.getAllCourses = async (req, res) => {

    try {
        //Filtering the Database if query is sented
        let filter = {}; //default no filter
        const { category , search } = req.query; //Accessing the category and search from url params using the query
        if(category) {
           filter.category = category;
        }
        if (search) filter.title = { $regex: search, $options: 'i' };
    
        //Fetch all data(course entries) from database
        const allCourse = await Course.find();
        
        return res.status(200).json({
            message: "Data Fetched successfuly!:)",
            Course:allCourse
        })
    } catch (error) {
        console.log(error);
        return res.status(201).json({
            success:false, error : "Server Error while fetching all course!!:("
        })     
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
