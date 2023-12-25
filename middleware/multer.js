import multer from "multer";
import path from "path";
// let dirname = path.resolve(path.dirname(""));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split(".")[1];
    cb(null, Date.now() + "." + ext);
  },
});

const uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/svg' || file.mimetype == 'image/png' || file.mimetype == 'image/webp') {
      cb(null, true)
    }
    else {
      cb(null, false);
      return cb(new Error('only jpg , jpeg and png allowed'))
    }
  }
});

export default uploadImage