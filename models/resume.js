// models/Resume.js
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
    required: true,
  },
  template: {
    type: mongoose.Schema.Types.ObjectId, // Template ID
    ref: "Template",
    // required:true,
  },
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  title: {
    type: String,
    required: true,
  },
  phone:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  professionalSummary: {
    type: String, // Brief professional summary or objective
    required: true,
  },
  designation: {
    type: String, // Current or desired job designation
    required: true,
  },
  education: [
    {
      degree: { type: String, required: true }, // e.g., B.Tech, MBA
      institution: { type: String, required: true }, // e.g., XYZ University
      year: { type: String, required: true }, // e.g., 2023
      cgpa:{type:String}
    },
  ],
  experience: [
    {
      jobTitle: { type: String, required: true }, // e.g., Software Engineer
      company: { type: String, required: true }, // e.g., ABC Corp
      duration: { type: String, required: true }, // e.g., Jan 2020 - Dec 2022
      description: { type: String }, // Optional description of responsibilities
    },
  ],
  skills: {
    type: [String], // Array of skills, e.g., ["JavaScript", "React", "Node.js"]
    required: true,
  },
  hobbies: {
    type: [String], // Array of hobbies, e.g., ["Chess", "Reading", "Cycling"]
  },
  socialMediaLinks: {
    linkedIn: { type: String }, // LinkedIn URL
    github: { type: String }, // GitHub URL
    twitter: { type: String }, // Twitter URL
    portfolio: { type: String }, // Portfolio or personal website URL
  },
  projects: [
    {
      title: { type: String, required: true }, // Project title
      description: { type: String, required: true }, // Project description
      technologies: { type: [String], required: true }, // Technologies used
      link: { type: String }, // Link to the project (optional)
    },
  ],
  certifications: [
    {
      name: { type: String, required: true }, // Certification name
      organization: { type: String, required: true }, // Issuing organization
      issueDate: { type: Date, required: true }, // Date of issue
      expirationDate: { type: Date }, // Optional expiration date
    },
  ],
  image: {
    type: String, // URL of the profile picture or resume image
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
