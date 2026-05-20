const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const INFERENCE_IP = "10.0.2.75"; // we'll fill this

app.post("/v1/chat/completions", async (req, res) => {
  try {
    const response = await axios.post(`http://${INFERENCE_IP}:5000`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("API running on port 3000"));

