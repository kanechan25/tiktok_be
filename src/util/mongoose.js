module.exports = {
    mulipleMongooseObject: function (mongooses) {
        return mongooses.map(mongose => mongose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
}