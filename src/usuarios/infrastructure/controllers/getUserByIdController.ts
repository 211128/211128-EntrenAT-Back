import { Request, Response } from "express";
import { GetUserByIdUseCase } from "../../application/getUserByIdUseCase";

export class GetUserByIdController {
    constructor(readonly getUserByIdUseCase: GetUserByIdUseCase) {}

    async run(req: Request, res: Response) {
        try {
            // Obtener el ID del usuario desde los parámetros de la ruta (por ejemplo, /users/:uuid)
            const { id } = req.params;

            // Convertir el ID a número
            const userId = parseInt(id, 10);

            // Verificar si la conversión fue exitosa
            if (isNaN(userId)) {
                return res.status(400).send({
                    status: "error",
                    message: "El ID proporcionado no es un número válido",
                });
            }

            // Ejecutar el caso de uso para obtener el usuario por su ID
            const getUserById = await this.getUserByIdUseCase.run(userId);

            if (getUserById) {
                return res.status(200).send({
                    status: "success",
                    data: getUserById, // Use the actual user data retrieved from the use case
                    
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
                message: "Error interno del servidor pochoclo",
            });
        }
    }
}
