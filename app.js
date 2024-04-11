const express = require("express");
const brain = require("./brain.js");
const path = require("path");

const app = express();
app.use(express.json());

// Set up static directory to serve HTML and JavaScript
app.use(express.static(path.join(__dirname, "public")));

// Route to serve HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Route to handle updating colors
app.post("/updateGame", (req, res) => {
  const data = req.body;
  // console.log(data)
  // You can perform further actions with the received colors data here
  // console.log("Recived data:", data);

  // Simulate some server response data
  const responseData = { message: "game updated successfully", data: data };

  let action = brain.compute(data)

  data.action = action

  res.json(action); // Send response with some data
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
