const express = require("express");
const { uploadUserCode, getUserCodes, editUserCode, deleteUserCode} = require("../controllers/usercode");
const checkUserAuth = require("../middlewares/auth.middleware")
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");

const router = express.Router();

// Multer Storage Configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (file.mimetype.startsWith("video/")) {
            return {
                folder: "user_codes/videos",
                resource_type: "video", // Explicitly set as video for proper Cloudinary handling
            };
        }
        if (file.mimetype.startsWith("image/")) {
            return {
                folder: "user_codes/images",
                resource_type: "image",
            };
        }
        throw new Error("Unsupported file type"); // Reject unsupported file types
    },
});

// Multer Upload Middleware
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "video/mp4", "video/mkv"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported file type"));
        }
    },
});

// Route Definitions
router.post(
    "/upload",
    checkUserAuth,
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "video", maxCount: 1 }
    ]), 
    uploadUserCode
);

router.get("/codes", getUserCodes);

router.post(
    "/edit/:id",
    checkUserAuth,
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "video", maxCount: 1 }
    ]),
    editUserCode
);

router.delete("/delete/:id", checkUserAuth, deleteUserCode);

module.exports = router;
