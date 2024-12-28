import User from "../models/User.js"

export const profile=async(req,res)=>{
    res.status(200).json({
        id:req.user.id,
        email:req.user.email
    })
}

export const updateProfile = async (req, res) => {
    try {
      const { newName, newPhoneNumber } = req.body;
      const newProfilePicture = req.file ? req.file.path : null; // Save the file path
      const { id } = req.user; // Extract user ID from the request
  
      // Find the user by ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Prepare the update object
      const updateData = {};
      if (newName) updateData.name = newName;
      if (newPhoneNumber) updateData.phoneNumber = newPhoneNumber;
      if (newProfilePicture) updateData.profilePicture = newProfilePicture;
  
      // Update the user
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
      });
  
      // Send success response
      res.status(200).json({
        message: "Profile updated successfully",
        updatedUser,
      });
    } catch (error) {
      console.error("Error updating profile:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  