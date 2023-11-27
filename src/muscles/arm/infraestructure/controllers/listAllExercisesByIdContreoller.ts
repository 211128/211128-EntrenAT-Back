import { Request, Response } from "express";
import { ListAllExercisesByIdUC } from "../../application/listAllExercisesByIdUC";

export class ListAllExercisesByIdController {
    constructor(readonly listAllExercisesByIdUC: ListAllExercisesByIdUC) {}

    async run(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                // Si el ID no es un número válido, enviar una respuesta de error
                return res.status(400).send({
                    status: "error",
                    message: "El ID proporcionado no es válido",
                });
            }

            const getUserById = await this.listAllExercisesByIdUC.run(id);

            if (getUserById) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        user: getUserById
                    },
                });
            } else {
                // Enviar una respuesta de error si el usuario no se encontró
                return res.status(404).send({
                    status: "error",
                    message: "El ejercicio no se encontró",
                });
            }
        } catch (error) {
            // Manejar errores y enviar una respuesta de error genérica
            console.error("Error en GetUserByIdController:", error);
            return res.status(500).send({
                status: "error",
                message: "Error interno del servidor",
            });
        }
    }
}
