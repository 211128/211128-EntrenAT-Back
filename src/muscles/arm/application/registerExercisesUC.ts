import { Arm } from "../domain/arm";
import { IArmRepository } from "../domain/armRepository";

export class RegisterExercisesUC {
    constructor(readonly exerciseRepository: IArmRepository){}


    async run (
        
        userid: number,
        exercisesid: number,
        weight: number,
        
    ): Promise <Arm | any>{
        try {
            const createNewExercise = await this.exerciseRepository.registerExercises(
                userid,
                exercisesid,
                weight,
              
            )

            return createNewExercise;
        }catch(error){
            console.log("Error al registrar entrenamiento", error)
            return null
        }
        
    };


}