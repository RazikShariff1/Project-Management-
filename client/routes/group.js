const express = require('express');
const Group = require('../models/Group');
const User = require('../models/User');
const router = express.Router();

// Join an existing group
router.post('/join', async (req, res) => {
  try {
    const { email, password, groupId } = req.body;

    // Find the group
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and add them to the group
    const newUser = new User({ email, password: hashedPassword, groupId });
    await newUser.save();

    group.members.push(newUser._id);
    await group.save();

    res.status(201).json({ message: 'User joined the group', groupId: group._id });
  } catch (error) {
    res.status(500).json({ error: 'Error joining group' });
  }
});

module.exports = router;
