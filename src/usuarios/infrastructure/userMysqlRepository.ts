import { query } from "../../database/conecction";
import { User } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";
import { compare, encrypt } from './helpers/hash';


export class UserMysqlRepository implements IUserRepository {
  async registerUser(name: string, email: string, password: string, height: number, weight: number, sex: string): Promise<User | null> {
    try {
      const hashPassword = await encrypt(password);
      const sql = "INSERT INTO users (Name, Email, Phone, Password, Active) VALUES (?, ?, ?, ?, ?)";
      const params: any[] = [name, email, hashPassword];
      const [result]: any = await query(sql, params);
      if (result.insertId) {
        // Crear una instancia de User con el ID generado
        const user = new User(result.insertId, name, email, hashPassword, height, weight, sex);
        return user;
      } else {
        console.error("No se pudo insertar el usuario en la base de datos.");
        return null;
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      return null;
    }
  }

  async listAllUsers(): Promise<User[] | null> {
    try {
      const sql = "SELECT * FROM Users"; // Cambiado a "Users" con mayúscula según la tabla de la base de datos
      const [rows]: any = await query(sql);

      if (!Array.isArray(rows)) {
        throw new Error('Rows is not an array');
      }

      // Mapear los resultados directamente a instancias de User
      const users: User[] = rows.map((row: any) => {
        return new User(
          row.ID,      // Cambiado a "ID" con mayúscula según la columna de la base de datos
          row.Name,    // Cambiado a "Name" con mayúscula según la columna de la base de datos
          row.Email,   // Cambiado a "Email" con mayúscula según la columna de la base de datos
          row.Password,// Cambiado a "Password" con mayúscula según la columna de la base de datos
          row.height,   // Cambiado a "Active" con mayúscula según la columna de la base de datos
          row.weight,
          row.sex
        );
      });

      return users;
    } catch (error) {
      console.error("Error al listar usuarios:", error);
      return null; // Opcionalmente, podrías lanzar una excepción en lugar de retornar null
    }
  }
  async deleteUserById(id: string): Promise<string | null> {
    try {
        const sql = 'DELETE FROM users WHERE id = ?';
        const result: any = await query(sql, [id]);

        if (!result || result.affectedRows === 0) {
            return 'No se encontró ningún usuario con el ID proporcionado.';
        }

        return 'Usuario eliminado exitosamente.';
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error; // Puedes manejar el error de la manera que prefieras o simplemente lanzarlo para que se maneje en un nivel superior.
    }
}


async getUserById(id: string): Promise<User | null> {
  try {
      const sql = "SELECT * FROM users WHERE id = ? LIMIT 1";
      const [rows]: any = await query(sql, [id]);

      // Verificar si no se encontraron resultados o si la respuesta es vacía
      if (!Array.isArray(rows) || rows.length === 0) {
          return null;
      }

      const row = rows[0];
      const user = new User(
          row.id,
          row.name,
          row.email,
          row.password,
          row.height,
          row.weight,
          row.sex
      );

      return user;
  } catch (error) {
      console.error("Error en getUserById:", error);
      return null;
  }
}
async listAllInactiveUser(): Promise<User[] | null> {
  try {
      const sql = "SELECT * FROM users WHERE status = false"; // SQL modificado para filtrar por status
      const [rows]: any = await query(sql); // Esto probablemente devuelve un tipo de dato más complejo

      if (!Array.isArray(rows)) {
          throw new Error('Error'); // Puedes manejar este caso según tus necesidades
      }

      const users: User[] = rows.map(row => new User(row.id, row.name, row.phone, row.email, row.password, row.active, row.canlent));
      return users;
  } catch (error) {
      console.error("Error en listAllInactiveUser:", error);
      return null; // Retorna null en caso de error o podrías optar por retornar un array vacío dependiendo de tu lógica de negocio
  }
}

async updateUsers(id: number, weight: number): Promise<User | null> {
  const updates: { [key: string]: any } = {};
  
  const keys = Object.keys(updates);
  if (keys.length === 0) return null; // No hay nada que actualizar.

  const sqlParts = keys.map(key => `${key} = ?`);
  const sql = `UPDATE users SET ${sqlParts.join(', ')} WHERE id = ?`;

  try {
    const values = keys.map(key => updates[key]);
    values.push(id);
    await query(sql, values);
    const [updatedRows]: any = await query('SELECT * FROM users WHERE id = ?', [id]);
    if (!updatedRows || updatedRows.length === 0) {
      throw new Error('No hay usuario con esa ID.');
    }

    const updatedUser = new User(
      updatedRows[0].id,
      updatedRows[0].name,
      updatedRows[0].email,
      updatedRows[0].password,
      updatedRows[0].height,
      updatedRows[0].weight,
      updatedRows[0].sex,
    );

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; // O maneja el error de la manera que prefieras.
  }
}



async updatePassword(id: number, password: string, cpassword: string): Promise<User | null> {
  try {
      // Asumiendo que 'password' ya está cifrado.
      const hashPassword = await encrypt(password);

      // Verificar si las contraseñas coinciden
      if (password !== cpassword) {
          throw new Error('La contraseña y la verificación de contraseña no coinciden.');
      }

      const sql = 'UPDATE users SET password = ? WHERE id = ?';
      const result: any = await query(sql, [hashPassword, id]);

      // Verificar si se actualizó alguna fila
      if (!result || result.affectedRows === 0) return null;

      // Obtener el usuario actualizado
      const [updatedRows]: any = await query('SELECT * FROM users WHERE id = ?', [id]);
      if (updatedRows.length === 0) return null;

      const updatedUser = new User(
        updatedRows[0].id,
        updatedRows[0].name,
        updatedRows[0].email,
        updatedRows[0].password,
        updatedRows[0].height,
        updatedRows[0].weight,
        updatedRows[0].sex,
      );
      
      
      return updatedUser;
  } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      throw error; // O maneja el error de la manera que prefieras.
  }
}

async setAsInactive(id: number | null): Promise<number | null> {
  try {
      const sql = 'UPDATE users SET Active = true WHERE id = ?';
      const [resultSet]: any = await query(sql, [id || null]);

      if (!resultSet || resultSet.affectedRows === 0) {
          return null;
      }
      return id;
  } catch (error) {
      console.error('Error al activar el usuario:', error);
      throw new Error('No se pudo activar el usuario.'); // O maneja el error de la manera que prefieras.
  }
}



}
