import { Request, Response } from "express";
import { ListAllInactiveUserUseCase } from "../../application/listAllInactiveUserUseCase";

export class ListAllInactiveUserController {
    constructor(readonly listAllInactiveUserUseCase: ListAllInactiveUserUseCase) {}
    
    // Método asincrónico 'run' que maneja la solicitud HTTP
    async run(req: Request, res: Response) {
        try {
            // Llama al método 'run' del caso de uso para obtener la lista de usuarios inactivos
            let listAllUserInactive = await this.listAllInactiveUserUseCase.run();

            // Comprueba si se obtuvo una lista válida de usuarios inactivos
            if (listAllUserInactive) {
                // Si se obtuvo una lista válida, responde con un código de estado 200 y la lista en el cuerpo de la respuesta
                return res.status(200).send({
                    status: "success",
                    data: {
                        listAllUserInactive: "usuarios inactivos obtenidos con exito"
                    }
                });
            } else {
                // Si no se obtuvo una lista válida, responde con un código de estado 404 (Not Found) u otro adecuado
                return res.status(404).send({
                    status: "error",
                    message: "No se encontraron usuarios inactivos."
                });
            }
        } catch (error) {
            // Si se produce un error durante la ejecución, captura el error aquí
            console.error("Error en ListAllUsersInactiveController:", error);

            // Responde con un código de estado 500 (Internal Server Error) y un mensaje de error genérico
            return res.status(500).send({
                status: "error",
                message: "Se produjo un error interno al procesar la solicitud."
            });
        }
    }
}
