import { Arm } from "../domain/arm";
import { IArmRepository } from "../domain/armRepository";

export class ListAllExercisesUC {
  constructor(private readonly armRepository: IArmRepository) {}

  async run(): Promise<Arm[] | null> {
    try {
      const listAllExercisesArm = await this.armRepository.listAllExercises();
      if (listAllExercisesArm) {
        return listAllExercisesArm;
      } else {
        throw new Error("No se encontraron ejercicios realizados.");
      }
    } catch (err: any) {
      // Lanza una excepción con un mensaje de error específico.
      throw new Error("Error al obtener la lista de ejercicios realizados: " + err.message);
    }
  }
}

