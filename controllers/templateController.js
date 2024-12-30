import Template from "../models/template.js";

export const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find({});

    if (!templates || templates.length === 0) {
      return res.status(404).json({ msg: "No templates available" });
    }

    res.status(200).json(templates);
  } catch (err) {
    console.error("Error during template fetching:", err.message);
    res.status(500).json({ msg: "Error during template fetching" });
  }
};

