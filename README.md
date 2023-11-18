# Repositorio c1-211099-hexagonal

Bienvenido al repositorio `211128-EntrenAT-Back`. Este proyecto utiliza una arquitectura hexagonal y se conecta a una base de datos MySQL.

## Instrucciones de Instalación

Sigue estos pasos para configurar y ejecutar el proyecto:

### **Paso 1:** Clonar el Repositorio

Primero, clona el repositorio en tu máquina local.

```bash
git clone https://github.com/211128/211128-EntrenAT-Back.git
cd 211128-EntrenAT-Back
``````

### **Paso 2:** Configurar Variables de Entorno

Crea un archivo .env en la raíz del proyecto. Usa las siguientes variables de entorno:

```env
PORT=3006
DB_HOST=localhost
DB_USER=<TuUsuarioDB>
DB_DATABASE=<NombreDeLaBaseDeDatos>
DB_PASSWORD=<TuContraseñaDB>

```
Nota: Asegúrate de reemplazar <TuUsuarioDB>, <NombreDeLaBaseDeDatos> y <TuContraseñaDB> con tus datos correspondientes de la base de datos MySQL.

### **Paso 3:** Instalación de Dependencias y Ejecución

instala las dependencias necesarias:

```bash
npm install


npm run dev
