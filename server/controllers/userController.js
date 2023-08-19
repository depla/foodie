const prisma = require('../index');
const bcrypt = require('bcryptjs');

const createUser = async (username, email, password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const result = await prisma.foodie_user.create({
        data: {
            username: username,
            email: email,
            password: hash,
        },
    })
    if (result.length === 0) return false;
    return result;
};

const matchPassword = async (password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword);
    return match
};

module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.foodie_user.findUnique({
        where: {
            username: username
        }
    })

    if (user && await matchPassword(password, user.password)) {
        req.session.user_id = user.id;
        req.session.avatar_url = user.avatar_url;
        res.send("login successful");
    }
    else {
        res.status(401).send("login failed");
    }
};

module.exports.checkIfLoggedIn = async (req, res) => {
    if (req.session.user_id) {
        res.send({ isLoggedIn: true, user_id: req.session.user_id });
    }
    else {
        res.send({ isLoggedIn: false });
    }
}

module.exports.signUp = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = await createUser(username, email, password);
    req.session.user_id = newUser.id;
    res.send("Register successful");
};

module.exports.logout = async (req, res) => {
    req.session.user_id = null;
    res.send("Logged out successfully");
}