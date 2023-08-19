const axios = require('axios');
const prisma = require('../index');
const { foodSchema } = require('../joiSchemas/foodSchema');

const fetchMapData = async (location) => {
    return axios.get(`https://api.geocodify.com/v2/geocode?api_key=${process.env.GEOCODIFY_API_KEY}&q=${location}`);
}

module.exports.validateFoodLocation = async (req, res, next) => {
    const { location } = req.body;
    const mapData = await fetchMapData(location);
    const coordinates = mapData?.data.response.features[0]?.geometry.coordinates;
    if (coordinates) {
        res.locals.coordinates = coordinates;
        next();
    }
    else {
        return res.status(400).send("Unable to find location");
    }
}

module.exports.validateFood = (req, res, next) => {
    const { error } = foodSchema.validate(req.body);

    if (error) return res.status(400).send(error.message);
    next();
}

module.exports.isFoodAuthor = async (req, res, next) => {
    const { id } = req.params;
    const food = await prisma.food.findUnique(
        {
            where: {
                id: parseInt(id)
            }
        }
    )
    if (!(food.submitted_by === req.session.user_id)) {
        return res.status(401).send("You do not own this post");
    }
    next();
};

module.exports.validateUserFoodImageDelete = async (req, res, next) => {
    const currentUser = req.session.user_id;

    if (req.body.images_delete) {
        const images = req.body.images_delete;
        const objs = images.map(element => JSON.parse(element));

        objs.forEach(element => {
            if (element.user_id !== currentUser) {
                return res.status(401).send("You do not own this image");
            }
        });

        res.locals.images_delete = objs;
    }

    next();
}