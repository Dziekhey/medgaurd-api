import { ReviewModel } from "../models/review.js";

// This function adds review to database
export const addReview = async (req, res, next) => {
    try {
    const {rating, department, comment} = req.body;

    if(!rating) {
        return res.status(400).json({errorMsg: "Rating is required"})
    }

    if(!department) {
        return res.status(400).json({errorMsg: "Choose a department"})
    }
    if(!comment) {
        return res.status(400).json({errorMsg: "Comment is required"})
    }
      const result = await ReviewModel.create(req.body);
      res.status(201).json(result);
    } catch (error) {
     next()
    }
 }
 
 
 // This function gets all reviews
 export const getAllReviews = async (req, res, next) => {
     try {
         const results = await ReviewModel.find({});
         res.status(202).json(results)
     } catch (error) {
         
     }
 }