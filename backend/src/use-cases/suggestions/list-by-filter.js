
const { SuggestionDAO, UserDAO } = require("../../db-access")
const { makeUser } = require("../../domain/User")
const AgeCalc = require("../../utils/ageCalc");

const listByFilter = async ({ userId }) => {

    const foundUser = await UserDAO.findById(userId)

    console.log("foundUser: ", foundUser);

    if (!foundUser) {
        throw new Error("User doas not exists")
    }

    const user = makeUser(foundUser)

    const { maxDistance, filterGender, ageRange, filterSize } = user

    const minAgeAsDate = AgeCalc.subtractYears(ageRange[0])
    const maxAgeAsDate = AgeCalc.subtractYears(ageRange[1])

    const users = await SuggestionDAO.findAllByFilter({ maxDistance, filterGender, filterSize, minAgeAsDate, maxAgeAsDate })
    console.log("Users in use-case:", users);

    const listOfUsers = users.map(u => ({
        _id: u._id,
        dogName: u.dogName,
        // bigImage: u.bigImage,
        age: AgeCalc.getAgeByYear(u.dateOfBirth),
        maxDistance: u.maxDistance
    }))

    return listOfUsers
}

module.exports = {
    listByFilter
}