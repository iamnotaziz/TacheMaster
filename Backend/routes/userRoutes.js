import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import isCommercial from "../middlewares/isCommercial.js";
import userController from "../controllers/userController.js";

const userRouter= express.Router();

//public routes
userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.loginController);

//private routes
userRouter.get('/:id', verifyToken, userController.getUserById);

//only Commercial Access
userRouter.get('/',verifyToken, isCommercial, userController.getAllUsers);
userRouter.delete('/:id',verifyToken, isCommercial, userController.deleteUserById);
userRouter.put('/:id',verifyToken, isCommercial, userController.updateUserById); 


export default userRouter;