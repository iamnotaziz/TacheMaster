import express from "express"
import taskController from "../controllers/taskController.js"
import verifyToken from "../middlewares/verifyToken"
import isCommercial from "../middlewares/isCommercial"

const taskRouter = express.Router()

taskRouter.post("/", verifyToken, taskController.createTask)
taskRouter.get("/", verifyToken, taskController.getAllTasks)
taskRouter.get("/:id", verifyToken, taskController.getTaskById)

//Only Commercial Access
taskRouter.delete("/:id", verifyToken, isCommercial, taskController.deleteTaskById)
taskRouter.put("/:id", verifyToken, isCommercial, taskController.updateTaskById) 
taskRouter.get("/commercial/:id", verifyToken, isCommercial, taskController.getTasksByCommercialId)
taskRouter.get("/client/:id", verifyToken, isCommercial, taskController.getTasksByClientId)

export default taskRouter