const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "InoteBookisa$Book";

//ROUTE 1: Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password length should be at least 5').isLength({ min: 5 }) // Corrected length requirement
], async (req, res) => {
    let success = false;
    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry, a user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Creating new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email, // Corrected email field
            password: secPass, // Storing hashed password
        });

        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken });

        // Catching errors
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});




// ROUTE 2 :Authenticate a User using POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please signup or use a different email address" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Invalid Credentials, Please try again" });
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(payload, JWT_SECRET); // Corrected to use payload
        success = true;
        res.json({success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error"); // Corrected typo
    }
});



// ROUTE 3 : Get loggedin User detail using POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;
