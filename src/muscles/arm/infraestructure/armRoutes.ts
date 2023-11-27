import express from "express";
import { listAllExercisesByIdController, listAllExercisesController, registerController} from "./controllers/dependencies";



export const armRouter = express.Router();

// Ruta para registrar un usuario
armRouter.post("/add", registerController.run.bind(registerController));

armRouter.get("/list", listAllExercisesController.run.bind(listAllExercisesController));

armRouter.get("/:id", listAllExercisesByIdController.run.bind(listAllExercisesByIdController));


// Ruta para obtener un usuario por su ID

