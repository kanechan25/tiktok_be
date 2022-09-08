const express = require('express');
const router = express.Router();

const userConstroller = require('../app/controllers/userController');

let routes = (app) => {
    router.get('/api', userConstroller.testApi);
    router.get('/api/search', userConstroller.searchController);
    router.get('/api/user', userConstroller.getUserController);
    router.get('/api/user/followed', userConstroller.getFollowedUserController);
    router.get('/api/user/suggested', userConstroller.getSuggestedUserController);
    router.get('/api/user/isvideo', userConstroller.getUserIsVideoController);

    return app.use('/', router);
};

module.exports = routes;
