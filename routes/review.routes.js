import { Router } from "express";
import { addReview, getAllReviews } from "../controllers/review.controller.js";


const router = Router();


// Define routes
router.post('/reviews', addReview);

router.get('/reviews', getAllReviews);


export default router;
