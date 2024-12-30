import Resume from "../models/resume";
import User from "../models/User";
export const createResume=async(req,res)=>{
    try {
        const {
          template,
          title,
          professionalSummary,
          designation,
          education,
          experience,
          skills,
          hobbies,
          socialMediaLinks,
          projects,
          certifications,
          image,
        } = req.body;
    
        // Validate required fields
        if (!template || !title || !skills) {
          return res.status(400).json({ msg: "Missing required fields" });
        }
    
        // Validate education and experience arrays
        if (!education || !education.length) {
          return res.status(400).json({ msg: "At least one education entry is required" });
        }
    
        // Create a new resume
        const newResume = new Resume({
          user: req.user.id, // User ID from authentication middleware
          template,
          title,
          professionalSummary,
          designation,
          education,
          experience,
          skills,
          hobbies,
          socialMediaLinks,
          projects,
          certifications,
          image,
        });
    
        // Save the resume to the database
        const savedResume = await newResume.save();
        

        await User.findByIdAndUpdate(req.user.id, { $push: { resumes: savedResume._id } });


        res.status(201).json({
          msg: "Resume created successfully",
          resume: savedResume,
        });
      } catch (error) {
        console.error("Error creating resume:", error.message);
        res.status(500).json({ msg: "Internal server error" });
      }
}