const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const UserSchema = new Schema(
    {
        _id: { type: Number },
        id: { type: Number },
        first_name: { type: String, default: '' },
        last_name: { type: String, default: '' },
        full_name: { type: String, default: '' },
        nick_name: { type: String, default: '' },
        tick: { type: Boolean, default: false },
        is_video: { type: Boolean, default: false },
        followed: { type: Boolean, default: false },
        followings: { type: Number },
        followers: { type: Number },
        likes: { type: Number },
        avatar: { type: String, default: '' },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// custom query helpers
UserSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

// Add plugin
mongoose.plugin(slug);
UserSchema.plugin(AutoIncrement);
UserSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('User', UserSchema);
