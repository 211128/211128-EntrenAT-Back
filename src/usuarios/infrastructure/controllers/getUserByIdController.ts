import { Request, Response } from "express";
import { GetUserByIdUseCase } from "../../application/getUserByIdUseCase";

export class GetUserByIdController {
    constructor(readonly getUserByIdUseCase: GetUserByIdUseCase) {}

    async run(req: Request, res: Response) {
        try {
            // Obtener el ID del usuario desde los parámetros de la ruta (por ejemplo, /users/:uuid)
            const { id } = req.params;

            // Ejecutar el caso de uso para obtener el usuario por su UUID
            const getUserById = await this.getUserByIdUseCase.run(id);

            if (getUserById) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        user: getUserById + " id: " + id,
                    },
                });
            } else {
                // Enviar una respuesta de error si el usuario no se encontró
                return res.status(404).send({
                    status: "error",
                    message: "El usuario no se encontró",
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
