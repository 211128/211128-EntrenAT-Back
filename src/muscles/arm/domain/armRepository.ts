import { Arm } from "./arm";


export interface IArmRepository {
    registerExercises(
        userid: number,
        exercisesid: number,
        weight: number
    
    ): Promise<Arm | any>

    listAllExercisesById(
        id: number
    ): Promise<Arm | any>

    listAllExercises(
    ): Promise<Arm[] | any>
    
}