const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Group = require('../models/Group');
const router = express.Router();

// Register a new user and create a new group
router.post('/register', async (req, res) => {
  try {
    const { email, password, groupName } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new group
    const newGroup = new Group({ name: groupName });
    await newGroup.save();

    // Create a new user and assign them as the group admin
    const newUser = new User({
      email,
      password: hashedPassword,
      groupId: newGroup._id,
    });
    newGroup.admin = newUser._id;
    newGroup.members.push(newUser._id);
    await newUser.save();
    await newGroup.save();

    res.status(201).json({ message: 'User and group created', groupId: newGroup._id });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password, groupId } = req.body;
    const user = await User.findOne({ email, groupId });

    if (!user) {
      return res.status(400).json({ error: 'User not found in the specified group' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Logged in successfully', userId: user._id, groupId });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
