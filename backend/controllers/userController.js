const User = require('../models/User');
require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../jwt.config');
const achievementsData = require('../models/achievementsData');
const { extractKeywords } = require('../backendUtils');

// Create token function with expiration
function createToken(user) {
    return jwt.sign({ user }, config.jwtSecret, { expiresIn: config.jwtSession.expiresIn });
}

// Verify a token
function checkToken(req, res, next) {
    let token = req.get('Authorization');
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            req.user = err ? null : decoded.user;
            return next();
        });
    } else {
        req.user = null;
        return next();
    }
}

// Ensure user is logged in
function ensureLoggedIn(req, res, next) {
    if (req.user) return next();
    res.status(401).json({ msg: 'Unauthorized You Shall Not Pass' });
}

// Fetch achievementsData
router.get('/achievementsData', (req, res) => {
    console.log('Fetching achievements data');
    res.json(achievementsData);
});

// SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("Received signup data:", req.body); // Log the received data
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log(`Username ${username} already exists.`);
            return res.status(409).json({ msg: `Username ${username} already exists. Please sign in.` });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            conclusions: new Map(),
            unlockedAchievements: new Map(achievementsData.map(a => [a.name, false])) // Initialize unlockedAchievements to false
        });
        await newUser.save();
        const token = createToken(newUser);
        res.json({ token, user: newUser });
    } catch (error) {
        console.log("Signup Error:", error.message);
        res.status(400).json({ msg: error.message });
    }
});


// SIGNIN
router.post('/signin', async (req, res) => {
    try {
        console.log("Attempting to sign in with:", req.body); 
        const { username, password } = req.body;
        const foundUser = await User.findOne({ username });
        if (!foundUser) throw new Error(`No user found with username ${username}`);
        const validPassword = await bcrypt.compare(password, foundUser.password);
        if (!validPassword) throw new Error(`The password credentials shared did not match the credentials for the user with username ${username}`);
        const token = createToken(foundUser);
        res.json({ token, user: foundUser });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

// GET user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error });
    }
});

// DELETE user by id
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Successfully deleted user" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// UPDATE user by id
router.put('/:id', async (req, res) => {
    let { password, ...updateData } = req.body;
    if (password === '') {
        password = undefined; // ignore password update if field is left empty
    } else {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        updateData.password = password;
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
    ).select('-password -__v');
    const token = createToken(updatedUser);
    res.status(200).json({ token, user: updatedUser });
});

// POST Route for User Conclusions
router.post('/:id/conclusion', checkToken, ensureLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { conclusionId, inputText = "No Question"} = req.body; // Changed question to inputText

    console.log(`Received POST request with conclusionId: ${conclusionId} and question: ${inputText}`);

    try {
        const user = await User.findById(id);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' }); // Send JSON response
        }

        // Increment count for given conclusionId in user.conclusions
        const userLandingCount = user.conclusions.get(conclusionId) || 0;
        console.log(`Current count for ${conclusionId}: ${userLandingCount}`);

        const newCount = userLandingCount + 1;
        user.conclusions.set(conclusionId, newCount);
        console.log(`New count for ${conclusionId}: ${newCount}`);

        // Retrieve required number of landings and required keywords for specified conclusionId
        const achievement = achievementsData.find(a => a.name === conclusionId);
        const requiredLandings = achievement ? achievement.requiredLandings : 3;
        const requiredKeywords = achievement.requiredKeywords || []; // Ensure requiredKeywords is an array

        console.log(`Required landings for ${conclusionId}: ${requiredLandings}`);
        console.log(`Required keywords for ${conclusionId}: ${requiredKeywords}`);

        // Extract user question keywords
        const userKeywords = extractKeywords(inputText);

        // Check if incremented count meets required landings and keywords are present
        const hasRequiredKeywords = requiredKeywords.every(keyword => userKeywords.includes(keyword));

        console.log(`New count: ${newCount}, Required landings: ${requiredLandings}`);
        if (newCount >= requiredLandings || hasRequiredKeywords) {
            console.log('Setting achievement to true for', conclusionId);
            user.unlockedAchievements.set(conclusionId, true);
            console.log(`Achievement for ${conclusionId} unlocked!`);
        }

        // Add entry to user history
        user.history.push({
            question: inputText,
            conclusion: conclusionId
        });

        await user.save();
        res.status(200).json({ message: 'Conclusion count updated and history added' }); // send JSON response
    } catch (error) {
        console.error('Error updating conclusion:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // send JSON response
    }
});


// CREATE Route for User Achievements
router.get("/:id/achievements", function (req, res) {
    User.findById(req.params.id)
        .then((user) => {
            if (user) {
                // ensure achievements is included in response
                // converts the user document to plain JavaScript object w/ user.toObject():
                const userWithAchievements = user.toObject();

                // unlockedAchievements map is included in response by converting it to an object:
                userWithAchievements.unlockedAchievements = Object.fromEntries(user.unlockedAchievements);

                // responds w/ user data including achievements as JSON:
                res.json({ user: userWithAchievements }); // Send user data as JSON
            } else {
                res.status(404).json({ message: "User not found" }); // send 404 if user isn't found
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error", error: err });
        });
});

// Duplicate GET Route for achievementsData
// router.get('/achievementsData', (req, res) => {
//     res.json(achievementsData);
// });

// GET route for user history
router.get('/:id/history', checkToken, ensureLoggedIn, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('history');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Assuming user.history is an array of objects with question and conclusion fields
        res.status(200).json({ history: user.history || [] });
    } catch (error) {
        console.error('Error fetching user history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;