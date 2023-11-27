import { Response } from "express";
import { ListAllExercisesUC } from "../../application/listAllExercisesUC";

export class ListAllExercisesController {
    constructor(readonly listAllExercisesUC: ListAllExercisesUC) {}

    async run(_req: any, res: Response) {
        try {
            const listAllExercises= await this.listAllExercisesUC.run();

            if (listAllExercises && listAllExercises.length > 0) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        exercises: listAllExercises, 
                    },
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontraron usuarios.",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).send({
                status: "error",
                message: "Se produjo un error en el servidor.",
            });
        }
    }
}
