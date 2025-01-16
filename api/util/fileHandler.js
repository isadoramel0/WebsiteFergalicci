import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/produtos/");
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, "prdt-" + uniqueSuffix + "." + extension)
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
