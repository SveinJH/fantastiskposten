const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "An article must have a name"],
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: [true, "An article must have a description"]
        },
        image: {
            type: String,
            required: [true, "An article must have a cover image"]
        },
        category: {
            type: String,
            required: [true, "An article must have a category"]
        },
        importance: {
            type: Number,
            required: [true, "An article must have an importance set"],
            min: 1,
            max: 2
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        comments: [
            {
                author: {
                    type: String,
                    trim: true
                },
                content: {
                    type: String,
                    trim: true,
                    minlength: 4,
                    maxlength: 100
                }
            }
        ],
        rating: {
            totalRating: {
                type: Number,
                min: 0,
                default: 0
            },
            ratersCount: {
                type: Number,
                default: 0
            }
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;

//module.exports = Article;
