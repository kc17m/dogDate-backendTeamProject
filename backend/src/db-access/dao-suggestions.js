const { ObjectId } = require("mongodb");
const { getDB } = require("./db-connector");


async function findAllExcept(id) {
    const db = await getDB();

    const users = await db.collection("users").find({ _id: { $ne: ObjectId(id) } }).toArray();

    return users
}

async function findAllByFilter({ maxDistance, gender, minAgeAsDate, maxAgeAsDate }) {
    const db = await getDB();

    if (gender === "all") {
        const users = await db.collection("users").find(
            {
                dateOfBirth: { $lt: new Date(minAgeAsDate), $gte: new Date(maxAgeAsDate) },
                maxDistance: { $lte: maxDistance }
            }).toArray();

        return users

    } else {
        const users = await db.collection("users").find(
            {
                dateOfBirth: { $lt: new Date(minAgeAsDate), $gte: new Date(maxAgeAsDate) },
                gender: gender,
                maxDistance: { $lte: maxDistance }
            }).toArray();

        return users
    }






}

module.exports = {
    findAllExcept,
    findAllByFilter
}