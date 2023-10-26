import multer from "multer";
import path from "path";
let dirname = path.resolve(path.dirname(""));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("reached here");
    cb(null, path.join(dirname, "/images"));
  },
  filename: (req, file, cb) => {
    console.log(file);
    let ext = file.originalname.split(".")[1];
    cb(null, Date.now() + "." + ext);
  },
});

const uploadImage = multer({ storage: storage });
export default uploadImage;
