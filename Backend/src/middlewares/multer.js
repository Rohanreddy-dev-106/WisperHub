import multer from "multer";
import path from "path";

const ALLOWED_TYPES = /jpeg|jpg|png|gif|webp|mp4|mov|webm/;

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/temp/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    if (ALLOWED_TYPES.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file type"), false);
    }
};

const Userfile = multer({
    storage: storageConfig,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB cap
});

export default Userfile;