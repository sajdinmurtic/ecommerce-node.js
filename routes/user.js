const router = require('express').Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const User = require('../models/User')

router.post('/register', async (req, res)=> {
  try {
    const { username, email, password } = req.body;
      const oldEmail = await User.findOne({ email: email });
    if (oldEmail) {
      return res
        .status(400)
        .json({ msg: "Email already exists" });
    }
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: passwordHash,
      username: username
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
   } catch (error) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password} = req.body
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid credentails" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
   const token = jwt.sign({ id: user._id }, process.env.JWT_SEC);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      
      },
    });
  } catch (error) {
    res.status(500).json(err);
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json(err);
  }
});
  
   

module.exports = router;