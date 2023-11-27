import { ListAllExercisesByIdUC } from "../../application/listAllExercisesByIdUC";
import { ListAllExercisesUC } from "../../application/listAllExercisesUC";
import { RegisterExercisesUC } from "../../application/registerExercisesUC";
import { MysqlRepository } from "../mySqlRepository";
import { ListAllExercisesByIdController } from "./listAllExercisesByIdContreoller";
import { ListAllExercisesController } from "./listAllExercisesController";
import { RegisterController } from "./registerExercisesController";

export const mySqlRepository =  new MysqlRepository();

export const registerExercisesUC =  new RegisterExercisesUC(mySqlRepository);
export const registerController = new RegisterController(registerExercisesUC);

export const listAllExercisesByIdUC = new ListAllExercisesByIdUC(mySqlRepository);
export const listAllExercisesByIdController = new ListAllExercisesByIdController(listAllExercisesByIdUC);

export const listAllExercisesUC = new ListAllExercisesUC(mySqlRepository);
export const listAllExercisesController = new ListAllExercisesController(listAllExercisesUC);

