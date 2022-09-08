const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const VideoSchema = new Schema(
    {
        _id: { type: Number },
        id: { type: Number },
        like: { type: Number },
        cmt: { type: Number },
        share: { type: Number },
        desc: { type: String, default: '' },
        hashtag: { type: String, default: '' },
        music: { type: String, default: '' },
        following: { type: Boolean, default: false },
        url: { type: String, default: '' },
    },
    {
        _id: false,
        timestamps: true,
    },
);

//custom query helpers
VideoSchema.query.sortable = function (req) {
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
VideoSchema.plugin(AutoIncrement);
VideoSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Video', VideoSchema);
