import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const UserData = new User(req.body);
    const { email } = UserData;

    const userExit = await User.findOne({ email });
    if (userExit) {
      return res.status(400).json({ message: "User already exists." });
    }

    const savedUser = await UserData.save();
    res.status(200).json(savedUser);
  } catch (e) {
    res.status(500).json({ e: "Internal server error" });
  }
};

export const fetch = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ e: "Internal server error" });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const UserExit = await User.findOne({ _id: id });
    if (!UserExit) {
      return res.status(400).json({ message: "User not found" });
    }
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
  } catch (e) {
    res.status(500).json({ e: "Internal server error" });
  }
};

export const deleteuser = async (req, res) => {
  try {
    const id = req.params.id;
    const UserExit = await User.findOne({ _id: id });
    if (!UserExit) {
      return res.status(400).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({message:"User deleted successfully."})
  } catch (e) {
    res.status(500).json({ error: "Internal Server error." });
  }
};
