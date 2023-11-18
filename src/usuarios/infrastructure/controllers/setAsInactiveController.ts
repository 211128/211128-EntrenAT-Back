import { Request, Response } from "express";
import { SetAsInactiveUseCase } from "../../application/setAsInactiveUseCase";



export class SetAsInactiveController {
    constructor(readonly setAsInactiveUseCase : SetAsInactiveUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let {
                id,
            } = req.body
        
            let InactivatedUser = await this.setAsInactiveUseCase.run(id)

            if(InactivatedUser){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        InactivatedUser: "usuario: " + id + " inactivo",
                    }
                })
            }
            if (!InactivatedUser) {
                return res.status(404).send({
                    status: "error",
                    message: "no hay usuario con esa id."
                });
            }
        } catch (error) {   
            return res.status(500).send({
                status: "error",
                message: "ocurrio un error al intentar inactivar un usuario."
            });
        }
    }
}