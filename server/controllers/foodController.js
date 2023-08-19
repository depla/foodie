const prisma = require('../index');
const { cloudinary } = require("../cloudinary");

module.exports.getFoods = async (req, res) => {
    const foods = await prisma.food.findMany({
        include: {
            food_image: true
        }
    });
    res.send(foods);
};

module.exports.getFood = async (req, res) => {
    const { id } = req.params;
    let food = await prisma.food.findUnique(
        {
            where: {
                id: parseInt(id)
            },
            include: {
                food_image: true
            }
        }
    )

    res.send(food);
};

module.exports.createFood = async (req, res) => {
    const { food_name, description, location } = req.body;
    const submitted_by = req.session.user_id;
    const imageData = [];
    req.files.forEach(element => {
        imageData.push({ url: element.path, file_name: element.filename, user_id: submitted_by });
    });
    const food = await prisma.food.create({
        data: {
            food_name,
            description,
            location,
            submitted_by,
            latitude: res.locals.coordinates[1],
            longitude: res.locals.coordinates[0],
            food_image: {
                create: imageData
            }
        },
    })

    res.send(food);
}

module.exports.updateFood = async (req, res) => {
    const { id } = req.params;
    const { food_name, description, location } = req.body;
    const submitted_by = req.session.user_id;
    const imageData = [];
    req.files.forEach(element => {
        imageData.push({ url: element.path, file_name: element.filename, user_id: submitted_by });
    });

    await prisma.food.update({
        where: {
            id: parseInt(id)
        },
        data: {
            food_name,
            description,
            location,
            submitted_by,
            latitude: res.locals.coordinates[1],
            longitude: res.locals.coordinates[0],
            food_image: {
                create: imageData
            }
        },
    })

    if (res.locals.images_delete) {
        const deleteFileNames = res.locals.images_delete.map(element => element.file_name);
        for (let filename of deleteFileNames) {
            await cloudinary.uploader.destroy(filename);
        }
        await prisma.food_image.deleteMany({
            where: {
                file_name: {
                    in: deleteFileNames
                }
            }
        })
    }

    res.send(res.body);
}

module.exports.deleteFood = async (req, res) => {
    const { id } = req.params;
    const images = await prisma.food_image.findMany({
        where: {
            food_id: parseInt(id)
        }
    })
    for (let image of images) {
        await cloudinary.uploader.destroy(image.file_name);
    }

    await prisma.food.delete({
        where: {
            id: parseInt(id)
        }
    })
    res.send(req.body);
}

module.exports.getUserFoodImages = async (req, res) => {
    const { id } = req.params;
    const currentUser = req.session.user_id;

    const images = await prisma.food_image.findMany({
        where: {
            user_id: currentUser,
            food_id: parseInt(id)
        }
    });
    res.send(images);
}

module.exports.updateUserFoodImages = async (req, res) => {
    const { id } = req.params;
    const submitted_by = req.session.user_id;
    const imageData = [];
    req.files.forEach(element => {
        imageData.push({ url: element.path, file_name: element.filename, user_id: submitted_by, food_id: parseInt(id) });
    });

    await prisma.food_image.createMany({
        data: imageData,
    })

    if (res.locals.images_delete) {
        const deleteFileNames = res.locals.images_delete.map(element => element.file_name);
        for (let filename of deleteFileNames) {
            await cloudinary.uploader.destroy(filename);
        }
        await prisma.food_image.deleteMany({
            where: {
                file_name: {
                    in: deleteFileNames
                }
            }
        })
    }

    res.send(res.body);
}