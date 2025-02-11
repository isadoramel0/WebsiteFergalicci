import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Web/public/storage/");
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const path = uniqueSuffix + "." + extension
    cb(null, path)
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
