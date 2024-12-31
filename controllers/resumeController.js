import Resume from "../models/resume.js";
import User from "../models/User.js";
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

export const getUserResumes = async (req, res) => {
  try {
    // Extract user ID from authenticated request
    const userId = req.user.id;

    // Fetch user data from the database
    const user = await User.findById(userId).populate("resumes");

    // Check if user exists
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Send the user's resumes
    res.status(200).json({ resumes: user.resumes });
  } catch (err) {
    console.error("Error occurred while fetching resumes:", err.message);
    res.status(500).json({ msg: "Error occurred while fetching resumes" });
  }
};

export const updateResume = async (req, res) => {
  try {
    const resumeId = req.params.id; // Resume ID from route parameters
    const userId = req.user.id; // User ID from authenticated user (middleware)

    // Find the resume by ID
    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ msg: "No resume found with this ID" });
    }

    // Check if the resume belongs to the logged-in user
    if (resume.user.toString() !== userId) {
      return res.status(403).json({ msg: "You are not authorized to edit this resume" });
    }

    // Extract the fields to be updated from the request body
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

    // Update the resume fields
    if (template) resume.template = template;
    if (title) resume.title = title;
    if (professionalSummary) resume.professionalSummary = professionalSummary;
    if (designation) resume.designation = designation;
    if (education) resume.education = education;
    if (experience) resume.experience = experience;
    if (skills) resume.skills = skills;
    if (hobbies) resume.hobbies = hobbies;
    if (socialMediaLinks) resume.socialMediaLinks = socialMediaLinks;
    if (projects) resume.projects = projects;
    if (certifications) resume.certifications = certifications;
    if (image) resume.image = image;

    // Save the updated resume
    const updatedResume = await resume.save();

    // Send the updated resume in the response
    res.status(200).json({
      msg: "Resume updated successfully",
      resume: updatedResume,
    });
  } catch (error) {
    console.error("Error updating resume:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};


export const deleteResume = async (req, res) => {
  try {
    const resumeId = req.params.id; // Resume ID from route parameters
    const userId = req.user.id; // User ID from authenticated user (middleware)

    // Find the resume by ID
    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ msg: "No resume found with this ID" });
    }

    // Check if the resume belongs to the logged-in user
    if (resume.user.toString() !== userId) {
      return res.status(403).json({ msg: "You are not authorized to delete this resume" });
    }

    // Delete the resume
    await Resume.findByIdAndDelete(resumeId);

    // Remove resume reference from user's resumes array
    await User.findByIdAndUpdate(userId, { $pull: { resumes: resumeId } });

    res.status(200).json({
      msg: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting resume:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};