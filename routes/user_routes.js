const router = require("express").Router();
const { User } = require("../models");
const ObjectId = require("mongodb").ObjectId;

// ALL of these ROUTES are PREFIXED with '/api'
// CREATE A NEW USER
router.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    console.log(err);
  }
});

// FIND ALL USERS
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    

    res.json({
      message: "Users found successfully",
      users,
    });
  } catch (err) {
    console.log(err);
  }
});

// // FIND USER BY ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    

    res.json({
      message: "User found successfully",
      user,
    });
  } catch (err) {
    console.log(err);
  }
});

// UPDATE A USER BY ID/ UPDATE WITH JSON
router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    updatedUser.email = req.body.email;
    updatedUser.username = req.body.username;
    updatedUser.password = req.body.password;

    

    res.json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (err) {
    console.log(err);
  }
});

// DELETE A USER BY ID
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: req.params.id });

    if (!deletedUser) return res.json({ message: "No User found." });

    res.json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

// ADD A NEW FRIEND
router.post("/users/:userId/friends/:friendId", async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "Invalid request" });
    }

    const isAlreadyFriend = user.friends.some((friend) =>
      friend.equals(friendId)
    );
    if (isAlreadyFriend) {
      return res.json({ message: "This user is already a friend" });
    }

    user.friends.push(friendId);
    await user.save();

    

    res.json({
      message: "Friend added successfully",
      user: {
        id: user._id,
        username: user.username,
        friends: user.friends,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// DELETE A FRIEND
router.delete("/users/:userId/friends/:friendId", async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Friend deleted successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Failed to delete friend", error: err.message });
  }
});

module.exports = router;