import multer from "multer"

const storage = multer.memoryStorage();
export const singleUploaded = multer({storage}).single("file")