import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    rating: {type: String, required: true},
    department: {type: String, required: true},
    comment: {type: String, required: true}
});

export const ReviewModel = model('Review', reviewSchema, 'reviews');