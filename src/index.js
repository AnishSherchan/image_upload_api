const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

const image_Stroage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  //   dest: "./upload/images",
  storage: image_Stroage,
});
app.use("/profile", express.static("upload/images"));
app.post("/upload", upload.single("profile"), async (req, res) => {
  res.json({
    sucess: "1",
    url: `http://localhost:4000/profile/${req.file.filename}`,
  });
});

app.listen(4000, () => {
  console.log("server running on port 4000");
});
