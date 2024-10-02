const express = require('express');
const router = express.Router();

const {
    getAllFeedbacks,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback
} = require('../controllers/FeedbackController');

router.route('/').get(getAllFeedbacks).post(createFeedback);
router.route('/:id').get(getFeedbackById).put(updateFeedback).delete(deleteFeedback);

module.exports = router;
