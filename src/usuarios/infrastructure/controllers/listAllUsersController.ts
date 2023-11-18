import {Response } from "express";
import { ListAllUserUseCase } from "../../application/listAllUserUseCase";

export class ListAllUserController {
    constructor(readonly listAllUserUseCase: ListAllUserUseCase) {}

    async run(res: Response) {
        try {
            const listAllUser = await this.listAllUserUseCase.run();

            if (listAllUser) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        listAllUser: "Usiario obtenidos con éxito",
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
