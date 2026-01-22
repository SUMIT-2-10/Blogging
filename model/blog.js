const {Schema,model} = require('mongoose');

const blogSchema = new Schema({
    title: {
        type: String,
        required: true ,
    },
    content: {
        type: String,
        required: true ,
    },
    coverImageURL: {
        type: String,
        required: false ,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',   
        required: true ,
    }
}, { timestamps: true }
);

const Blog = model('Blog', blogSchema);

module.exports = Blog;
