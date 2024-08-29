// routes/buttonRoutes.js
const express = require("express");
const Button = require("../models/Button");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router();

// Save button properties
router.post("/button", async (req, res) => {
  try {
    const button = new Button({
      ...req.body,
      creationDate: new Date(), // Set creation date to now
    });
    await button.save();
    res.status(201).json(button);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET request to fetch all button properties
router.get("/bulk", async (req, res) => {
  try {
    // Fetch all button documents from the database
    const buttons = await Button.find({});

    // Map the results to include only necessary fields
    const buttonData = buttons.map((button) => ({
      _id: button._id,
      width: button.width,
      height: button.height,
      roundedness: button.roundedness,
      color: button.color,
      opacity: button.opacity,
      strokeWidth: button.strokeWidth,
      strokeColor: button.strokeColor,
      text: button.text,
      name: button.name,
      lastUpdated: button.lastUpdated,
    }));

    // Send the response as JSON
    res.json(buttonData);
  } catch (error) {
    console.error("Error fetching button properties:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/button/:id", async (req, res) => {
  try {
    const button = await Button.findById(req.params.id);
    res.json(button);
  } catch (error) {
    res.status(500).json({ error: "Error fetching button" });
  }
});

// Update button
router.put("/button/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedButton = await Button.findByIdAndUpdate(
      id,
      { ...req.body, lastUpdated: Date.now() }, // Update lastUpdated field
      { new: true }
    );

    if (!updatedButton) {
      return res.status(404).json({ message: "Button not found" });
    }

    res.status(200).json(updatedButton);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
