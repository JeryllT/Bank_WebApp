const authUser = require('express').Router();
const jwt = require('jsonwebtoken');

authUser.post('/', async (request, response) => {
    const token = request.token
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken) {
            return response.status(401).json({error: 'token missing or invalid'})
        }
        response.status(200).json({message: 'token valid'})
    } catch {
        return response.status(401).json({error: 'token missing or invalid'})
    }
})

module.exports = authUser;


