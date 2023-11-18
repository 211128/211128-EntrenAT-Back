import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../application/deleteUserById";

export class DeleteUserController {
    constructor(readonly deleteUserUseCase: DeleteUserUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).send({
                    status: "error",
                    message: "Se requiere un UUID válido en la solicitud.",
                });
            }

            const userDeleted = await this.deleteUserUseCase.run(id);

            if (userDeleted) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        eliminated: userDeleted + "el usuario con la id:" + id + "se le dió cuello",
                    },
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Error al eliminar el usuario",
                });
            }
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            return res.status(500).send({
                status: "error",
                message: "Se produjo un error en el servidor al eliminar el usuario.",
            });
        }
    }
}
