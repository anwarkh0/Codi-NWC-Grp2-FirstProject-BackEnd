import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    let ext = file.originalname.split(".")[1];
    cb(null, Date.now() + "." + ext);
  },
});

const uploadImage = multer({ storage: storage });
export default uploadImage;
