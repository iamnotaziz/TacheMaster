import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import isCommercial from "../middlewares/isCommercial.js"
import isClient from "../middlewares/isClient.js"
import feedbackController from "../controllers/feedbackController.js"

const fbRouter = express.Router()

fbRouter.get("/:id", verifyToken, feedbackController.getFeedbackById)
fbRouter.get("/task/:id", verifyToken, feedbackController.getFeedbackByTaskId)

//Only Client Access
fbRouter.post("/", verifyToken, isClient, feedbackController.createFeedback)
fbRouter.delete("/:id", verifyToken, isClient, feedbackController.deleteFeedbackById)
fbRouter.put("/:id", verifyToken, isClient, feedbackController.updateFeedbackById)

//Only Commercial Access
fbRouter.get("client/:id", verifyToken, isCommercial, feedbackController.getFeedbacksByClientId)

export default fbRouter