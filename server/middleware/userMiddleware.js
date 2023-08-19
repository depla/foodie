const prisma = require('../index');
const { userSchema } = require('../joiSchemas/userSchema');


module.exports.usernameExistsCheck = async (req, res, next) => {
    const { username } = req.body;
    const result = await prisma.foodie_user.findMany(
        {
            where: {
                username: {
                    equals: username,
                    mode: 'insensitive'
                }
            }
        }
    )
    if (result?.length !== 0) return res.status(400).send("Username exists already");
    next();
};

module.exports.emailExistsCheck = async (req, res, next) => {
    const { email } = req.body;
    const result = await prisma.foodie_user.findMany(
        {
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive'
                }
            }
        }
    )
    if (result?.length !== 0) return res.status(400).send("Email exists already");
    next();
};

module.exports.validateUserSignUp = (req, res, next) => {
    const { error } = userSchema.validate(req.body);

    if (error) return res.status(400).send(error.message);
    next();

}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        return res.status(401).send('You must be logged in for that');
    }
    next();
};