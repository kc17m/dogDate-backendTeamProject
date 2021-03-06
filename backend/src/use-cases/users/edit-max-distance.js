const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");

async function editMaxDistance( userId, maxDistance ) {
    console.log("UserId, maxDistance from usecase", userId, maxDistance)

    const foundUser = await UserDAO.findById(userId)
    if (!foundUser) {
        throw ({message: "user with id "+  userId + " not found" })
    }
    const user = makeUser(foundUser)
    console.log("use case, user:", user.dogName)
   
    const insertResult = await UserDAO.updateMaxDistance({userId, maxDistance}); //##
     console.log("insertResult aus usecase", insertResult);
    const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount === 1
    if(!wasSuccessful) {
        throw new Error("Updating maxDistance failed, please try again.")
    }
   
   
    return user
}


module.exports = {
    editMaxDistance
}