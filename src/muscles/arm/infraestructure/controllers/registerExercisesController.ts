import { Request, Response } from "express";
import { RegisterExercisesUC } from "../../application/registerExercisesUC";

export class RegisterController {
  constructor(readonly registerUseCase: RegisterExercisesUC) {}

  async run(req: Request, res: Response) {
    try {
      const {
        userid,
        exercisesid,
        weight
        
      } = req.body;

      const registerExercises = await this.registerUseCase.run(
        userid,
        exercisesid,
        weight
        
      );

      if (registerExercises) {
        return res.status(201).json({
          status: "success",
          data: {
            userid: registerExercises.userid,
            exercisesid: registerExercises.exercisesid,
            weight: registerExercises.weight,
          },
        });
      } else {
        // Puedes añadir un mensaje específico para indicar que el ejercicio ya existe
        return res.status(400).json({
          status: "error",
          message: "El registro de ejercicio no fue exitoso. Ya existe un ejercicio para este usuario, grupo muscular y fecha.",
        });
      }
    } catch (err) {
      console.error("Error al registrar ejercicio:", err);
      return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
      });
    }
  }
}
