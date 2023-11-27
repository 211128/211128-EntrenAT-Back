import { query } from "../../database/conecction";
import { User, VerifyLogin } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";
import { compare, encrypt } from './helpers/hash';
import { tokenSigIn } from "./helpers/token";




export class UserMysqlRepository implements IUserRepository {
  async registerUser(name: string, email: string, password: string, height: number, weight: number, sex: string): Promise<User | null> {
    try {
      console.log(name + ": " + email + ": " +password + ": " +height + ": " +weight + ": " +sex)
      const hashPassword = await encrypt(password);
      const sql = "INSERT INTO usuario (nombre, correo, contraseña, altura, peso, gender) VALUES (?, ?, ?, ?, ?, ?)";
      const params: any[] = [name, email, hashPassword, height, weight, sex];
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

  async loginUser(email: string, password: string): Promise<VerifyLogin | null> {
    try {
        const userSql = "SELECT UserID AS userid, Nombre AS username, Correo AS email, Contraseña AS password FROM Usuario WHERE Correo = ? LIMIT 1";
        const [userRows]: any = await query(userSql, [email]);

        if (!Array.isArray(userRows) || userRows.length === 0) {
            return null; // El usuario no existe
        }

        const userRow = userRows[0];

        const isPasswordMatch = await compare(password, userRow.password);

        if (!isPasswordMatch) {
            return null; // Contraseña incorrecta
        }

        const user = new VerifyLogin(
            userRow.userid,
            userRow.username,
            userRow.email,
     
          
        );

        console.log("Usuario autenticado:", user);

        return user;
    } catch (error) {
        console.error("Error en loginUser:", error);
        return null;
    }
}




  async listAllUsers(): Promise<User[] | null> {
    try {
      const sql = "SELECT * FROM usuario"; // Cambiado a "Users" con mayúscula según la tabla de la base de datos
      const [rows]: any = await query(sql);

      if (!Array.isArray(rows)) {
        throw new Error('Rows is not an array');
      }

      // Mapear los resultados directamente a instancias de User
      const users: User[] = rows.map((row: any) => {
        return new User(
          row.ID,      // Cambiado a "ID" con mayúscula según la columna de la base de datos
          row.name,    // Cambiado a "Name" con mayúscula según la columna de la base de datos
          row.email,   // Cambiado a "Email" con mayúscula según la columna de la base de datos
          row.password,// Cambiado a "Password" con mayúscula según la columna de la base de datos
          row.height,   // Cambiado a "Active" con mayúscula según la columna de la base de datos
          row.weight,
          row.sex. 
          row.id
        );
      });

      return users;
    } catch (error) {
      console.error("Error al listar usuarios:", error);
      return null; // Opcionalmente, podrías lanzar una excepción en lugar de retornar null
    }
  }

  
  async deleteUserById(id: number): Promise<string | null> {
    try {
        const sql = 'DELETE FROM usuario WHERE UserID = ?';
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

async getUserById(id: number): Promise<User | null> {
  try {
    const sql = "SELECT UserID, Nombre, Correo, Altura, Peso, Gender FROM usuario WHERE UserID = ? LIMIT 1";
    const [rows]: any = await query(sql, [id]);

    // Verificar si no se encontraron resultados o si la respuesta es vacía
    if (!Array.isArray(rows) || rows.length === 0) {
      return null;
    }

    const row = rows[0];
    const userData = new User(
      row.UserID,
      row.Nombre,
      row.Correo,
      row.Contraseña,
      row.Altura,
      row.Peso,
      row.Gender,
    );

    console.log(userData);
    return userData;
  } catch (error) {
    console.error("Error en getUserById:", error);
    return null;
  }
}
async listAllInactiveUser(): Promise<User[] | null> {
  try {
      const sql = "SELECT * FROM usuario WHERE status = false"; // SQL modificado para filtrar por status
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
  const sql = `UPDATE usuario SET ${sqlParts.join(', ')} WHERE UserID = ?`;

  try {
    const values = keys.map(key => updates[key]);
    values.push(id);
    await query(sql, values);
    const [updatedRows]: any = await query('SELECT * FROM usario WHERE UserID = ?', [id]);
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
      const sql = 'UPDATE usuario SET CuentaActiva = true WHERE UserID = ?';
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
