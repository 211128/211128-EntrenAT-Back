import { Request, Response } from "express";
import { UpdatePasswordUseCase } from "../../application/updatePasswordUseCase";

export class UpdatePasswordController {
    constructor(readonly updatePasswordUseCase: UpdatePasswordUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let {
                id,
                password,
                cpassword,
            } = req.body;

            // Llama al caso de uso para actualizar la contraseña
            let updatePassword = await this.updatePasswordUseCase.run(id, password, cpassword);

            if (updatePassword) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        update_user: "se ahtuaslizó el usuario con la id: " + id,
                    },
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Usuario no encontrado o no actualizado.",
                });
            }
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error);
            return res.status(500).send({
                status: "error",
                message: "Se produjo un error al actualizar la contraseña.",
            });
        }
    }
}
