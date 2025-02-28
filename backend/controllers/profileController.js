// controllers/profileController.js
const {
  getAsync,
  setAsync,
  delAsync,
  redisClient,
} = require("../config/redis");
const { validateEditProfileData } = require("../utils/validation");
const { upload_on_cloudinary } = require("../utils/cloudinary");
const { errorMonitor } = require("winston-daily-rotate-file");
const user = require("../models/user");
const UserPublicData = require("../models/userPublicId");
const getPublicProfileUrl = require("../utils/getPublicProfileUrl");
const {
  getUniqueIdForPrifileShare,
} = require("../utils/getUniqueIdForProfileShare");

const CACHE_DURATION = 3600;

// View Profile (GET /profile/view)
const viewProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Check Redis cache
    const cachedData = await redisClient.get(`user:${userId}`);
    if (cachedData) {
      console.log("✅ Serving from cache...");
      return res.json(JSON.parse(cachedData));
    }

    // Fetch data (assuming req.user contains the profile data)
    const user = req.user;

    // Cache the data
    await redisClient.set(`user:${userId}`, JSON.stringify(user), {
      EX: CACHE_DURATION,
    });
    console.log("✅ Cached user data...");

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Edit Profile (PATCH /profile/edit)
const editProfile = async (req, res, next) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    // Update user profile
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    // Invalidate Redis cache
    await delAsync(`user:${loggedInUser.id}`);
    console.log("✅ Cache invalidated for user...");

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    next(err);
  }
};

// Add Avatar (POST /profile/addAvatar)
// const addAvatar = async (req, res) => {
//   try {
//     console.log("addAvatar called");

//     // Step 1: Check file
//     if (!req.file) {
//       console.error("No file uploaded in the request.");
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     console.log("File upload received:", req.file.originalname);

//     // Step 2: Upload file to Cloudinary
//     const localPath = req.file.path;
//     console.log("Uploading file to Cloudinary...");
//     const resp = await uploadOnCloudinary(localPath);

//     if (!resp || !resp.secure_url) {
//       console.error("Cloudinary upload failed:", resp);
//       return res.status(500).json({ message: "Failed to upload avatar to Cloudinary" });
//     }

//     const uploadedPath = resp.secure_url;
//     console.log("Avatar successfully uploaded to Cloudinary:", uploadedPath);

//     // Step 3: Update user's photo URL in the database
//     const user = req.user; // Populated by userAuth middleware
//     if (!user) {
//       console.error("User not found in request.");
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }

//     console.log("Updating user document with new avatar URL...");
//     user.photoUrl = uploadedPath;

//     await user.save();
//     console.log("User document successfully updated.");

//     // Step 4: Respond with success
//     console.log("Avatar update process completed successfully.");
//     res.status(200).json({
//       message: "Avatar updated successfully!",
//       photoUrl: user.photoUrl,
//     });
//   } catch (err) {
//     console.error("Error during avatar update process:", err);
//     res.status(500).json({
//       message: "Failed to update avatar",
//       error: err.message,
//     });
//   }
// };

const addAvatar = async (req, res, next) => {
  try {
    console.log("editProfile called");

    const user = req.user; // Populated by userAuth middleware
    if (!user) {
      console.error("User not found in request.");
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const filebuffer = req.file ? req.file.buffer : null; // Assuming file is available in req.file.buffer
    // console.log(filebuffer)
    if (filebuffer) {
      //  If an image is provided, upload it to Cloudinary
      console.log("entered into fie buffer if");
      const uploadedurl = await upload_on_cloudinary(filebuffer);
      user.photoUrl = uploadedurl;
    }

    //   Save the updated user information
    await user.save();

    console.log(
      `Profile updated successfully for user ${user.firstName} ${user.lastName}.`
    );
    res.json({ message: "Profile updated successfully.", user });
  } catch (error) {
    next(error);
  }
};

const generatePublicId = async (req, res) => {
  let isIDGenerated = await UserPublicData.findOne({
    privateUserId: req.user._id,
  });
  if (isIDGenerated) {
    let url = getPublicProfileUrl(isIDGenerated.publicUserId);
    return res.send({ status: 1, data: { url } });
  }
  const uniqueId = getUniqueIdForPrifileShare();
  isIDGenerated = await UserPublicData.create({
    privateUserId: req.user._id,
    publicUserId: uniqueId,
  });
  let url = getPublicProfileUrl(isIDGenerated.publicUserId);

  res.send({ status: 1, data: { url } });
};

const getPublicProfile = async (req, res) => {
  const { publicId } = req.params;
  if (!publicId) {
    return res.send({ status: 0, message: "Invalid Id" });
  }
  const isIdPresent = await UserPublicData.findOne({
    publicUserId: publicId,
  });
  if (!isIdPresent) {
    return res.send({ status: 0, message: "Invalid Id" });
  }
  const userData = await user.findOne(
    { _id: isIdPresent.privateUserId },
    {
      firstName: 1,
      lastName: 1,
      age: 1,
      gender: 1,
      photoUrl: 1,
      about: 1,
      skills: 1,
    }
  );
  if (!userData) {
    return res.send({ status: 0, message: "Invalid user" });
  }
  return res.send({ status: 1, data: userData });
};

module.exports = {
  viewProfile,
  editProfile,
  addAvatar,
  generatePublicId,
  getPublicProfile,
};
