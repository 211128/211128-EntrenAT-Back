import { query } from "../../../database/conecction";
import { Arm } from "../domain/arm";
import { IArmRepository } from "../domain/armRepository";

export class MysqlRepository implements IArmRepository {
  async registerExercises(
    userid: number,
    exercisesid: number,
    weight: number
  ): Promise<Arm | null> {
    try {
      // Obtener la fecha actual en formato YYYY-MM-DD
      const currentDate = new Date().toISOString().split('T')[0];

      // Consulta para verificar si el usuario ya hizo el ejercicio en el mismo día
      const checkDuplicateSql =
        "SELECT * FROM registroejercicio WHERE userid = ? AND exerciseid = ? AND DATE(fecha) = ?";
      const checkDuplicateParams: any[] = [userid, exercisesid, currentDate];
      const [duplicateResult]: any = await query(checkDuplicateSql, checkDuplicateParams);

      // Si ya existe un registro para el mismo usuario, ejercicio y fecha, no insertar un nuevo registro
      if (duplicateResult.length > 0) {
        console.error("El usuario ya ha realizado este ejercicio hoy.");
        return null;
      }

      // Consulta para insertar el nuevo registro de ejercicio
      const insertSql = "INSERT INTO registroejercicio (userid, exerciseid, peso) VALUES (?, ?, ?)";
      const insertParams: any[] = [userid, exercisesid, weight];
      const [result]: any = await query(insertSql, insertParams);

      if (result.insertId) {
        // Crear una instancia de Arm con el ID generado
        const user = new Arm(result.insertId, userid, exercisesid, weight);
        return user;
      } else {
        console.error("No se pudo insertar el registro de ejercicio en la base de datos.");
        return null;
      }
    } catch (error) {
      console.error("Error al registrar el ejercicio:", error);
      return null;
    }
  }


  async listAllExercises(): Promise<Arm[] | null> {
    try {
      const sql = "SELECT LogID AS id, UserID AS userid, ExerciseID AS exercises, Peso AS weight FROM RegistroEjercicio"; 
      const [rows]: any = await query(sql);

      if (!Array.isArray(rows)) {
        throw new Error('Rows is not an array');
      }

      // Mapear los resultados directamente a instancias de User
      const users: Arm[] = rows.map((row: any) => {
        return new Arm(
          row.id,     
          row.userid,   
          row.exercises,
          row.weight
        );
      });

      console.log(users);

      return users;
    } catch (error) {
      console.error("Error al listar usuarios:", error);
      return null; // Opcionalmente, podrías lanzar una excepción en lugar de retornar null
    }
}


  async listAllExercisesById(id: number): Promise<Arm | null> {
    try {
        const sql = "SELECT LogID AS id, UserID AS userid, ExerciseID AS exercises, Peso AS weight FROM RegistroEjercicio WHERE LogID = ? LIMIT 1";
        const [rows]: any = await query(sql, [id]);

        // Verificar si no se encontraron resultados o si la respuesta es vacía
        if (!Array.isArray(rows) || rows.length === 0) {
            return null;
        }

        const row = rows[0];
        const user = new Arm(
            row.id,
            row.userid,
            row.exercises,
            row.weight,
        );

        console.log("Datos obtenidos de la base de datos:", user);

        return user;
    } catch (error) {
        console.error("Error en RegistroEjercicio:", error);
        return null;
    }
}







}
