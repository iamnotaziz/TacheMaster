import express from "express"
import taskController from "../controllers/taskController.js"
import verifyToken from "../middlewares/verifyToken.js"
import isCommercial from "../middlewares/isCommercial.js"

const taskRouter = express.Router()

taskRouter.post("/", verifyToken, taskController.createTask)
taskRouter.get("/", verifyToken, taskController.getAllTasks)
taskRouter.get("/:id", verifyToken, taskController.getTaskById)

//Only Commercial Access
taskRouter.delete("/:id", verifyToken, isCommercial, taskController.deleteTaskById)
taskRouter.put("/:id", verifyToken, isCommercial, taskController.updateTaskById) 
taskRouter.get("/commercial/:commercialId", verifyToken, isCommercial, taskController.getTasksByCommercialId)
taskRouter.get("/client/:clientId", verifyToken, taskController.getTasksByClientId)

export default taskRouter