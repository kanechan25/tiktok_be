const { json } = require('express');
const User = require('../models/User');

let testApi = async (req, res) => {
    try {
        return res.send('Welcome to API Connection!! You connect successfully!');
    } catch (error) {
        console.log(error);
    }
};

let getUserController = async (req, res) => {
    try {
        let allUsers = await User.find();
        return res.status(200).json(allUsers);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Server have error...',
        });
    }
};
let getFollowedUserController = async (req, res) => {
    try {
        let followedUsers = await User.find({ followed: true }).limit(15);
        console.log('user database: ', User);
        return res.status(200).json(followedUsers);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Server have error...',
        });
    }
};
let getSuggestedUserController = async (req, res) => {
    try {
        let followedUsers = await User.find({ followed: false })
            .where('followers')
            .gt(1000000)
            .lt(10000000)
            .limit(15);
        return res.status(200).json(followedUsers);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Server have error...',
        });
    }
};
let getUserIsVideoController = async (req, res) => {
    try {
        let n = req.query.n;
        let isVideoUsers = await User.find({ is_video: true }).limit(n);
        //console.log(`Number of video: ${n} contain : ${isVideoUsers}`);
        return res.status(200).json(isVideoUsers);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Server have error...',
        });
    }
};

let searchController = async (req, res) => {
    try {
        let q = req.query.q;
        let n = req.query.n;
        let results = await User.find({
            full_name: { $regex: q, $options: 'i' },
        })
            .limit(n)
            .exec();
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Server have error...',
        });
    }
};

module.exports = {
    testApi,
    getUserController,
    getFollowedUserController,
    getSuggestedUserController,
    getUserIsVideoController,
    searchController,
};
