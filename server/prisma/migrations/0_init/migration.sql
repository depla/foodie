-- CreateTable
CREATE TABLE "food" (
    "id" SERIAL NOT NULL,
    "food_name" VARCHAR(100) NOT NULL,
    "image_urls" VARCHAR(2048)[],
    "description" VARCHAR(65535),
    "location" VARCHAR(2048) NOT NULL,
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "date_added" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "food_pkey" PRIMARY KEY ("id")
);

