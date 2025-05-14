require('dotenv').config();
const express = require('express');
   const mysql = require('mysql2');
   const cors = require('cors');
   
   const app = express();
   app.use(cors()); // Permite las peticiones desde frontend 
   app.use(express.json()); 
   
   //conexión a la base de datos
   const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
   });
   
   db.connect((err) => {
     if (err) {
       console.error('Error al conectar a la base de datos:', err);
       return;
     }
     console.log('Conectado a la base de datos MySQL');
   });
   // *************************
// Lógica de Login
// *************************
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT id, username, rol FROM usuarios WHERE username = ? AND password = ?';
        const [rows] = await db.promise().query(query, [username, password]);
        const user = rows[0];

        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al verificar credenciales:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});
   
  // *************************
// Funciones Base CRUD
// *************************

// Función base para obtener datos
async function getEntities(tableName, res, whereClause = '', whereParams = []) {
    try {
        const query = `SELECT * FROM ${tableName} ${whereClause ? `WHERE ${whereClause}` : ''}`;
        const [rows] = await db.promise().query(query, whereParams);
        res.json(rows);
    } catch (error) {
        console.error(`Error al obtener ${tableName}:`, error);
        res.status(500).json({ error: `Error al obtener ${tableName}` });
    }
}

// Función base para crear datos
async function createEntity(tableName, data, res) {
    try {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(', ');
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        const [result] = await db.promise().query(query, values);
        res.status(201).json({ id: result.insertId, ...data });
    } catch (error) {
        console.error(`Error al crear ${tableName}:`, error);
        res.status(500).json({ error: `Error al crear ${tableName}` });
    }
}

// Función base para actualizar datos
async function updateEntity(tableName, id, data, res, idColumnName = 'id') {
    try {
        const updates = Object.keys(data).map(col => `${col} = ?`).join(', ');
        const values = [...Object.values(data), id];
        const query = `UPDATE ${tableName} SET ${updates} WHERE ${idColumnName} = ?`;
        const [result] = await db.promise().query(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `${tableName} no encontrado` });
        }
        res.json({ id, ...data });
    } catch (error) {
        console.error(`Error al actualizar ${tableName}:`, error);
        res.status(500).json({ error: `Error al actualizar ${tableName}` });
    }
}

// Función base para eliminar datos
async function deleteEntity(tableName, id, res, idColumnName = 'id') {
    try {
        const query = `DELETE FROM ${tableName} WHERE ${idColumnName} = ?`;
        const [result] = await db.promise().query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `${tableName} no encontrado` });
        }
        res.json({ message: `${tableName} eliminado` });
    } catch (error) {
        console.error(`Error al eliminar ${tableName}:`, error);
        console.error(error); // <-- AGREGAR ESTO
        res.status(500).json({ error: `Error al eliminar ${tableName}` });
    }
}

// *************************
// Funciones Específicas y Rutas
// *************************

// Usuarios
app.get('/usuarios', async (req, res) => {
    await getEntities('usuarios', res);
});

app.get('/usuarios/:id', async (req, res) => {
    await getEntities('usuarios', res, 'id = ?', [req.params.id]);
});

app.post('/usuarios', async (req, res) => {
    // Validación específica para usuarios
    if (!req.body.username || !req.body.password || !req.body.rol) {
        return res.status(400).json({ error: 'Faltan datos de usuario' });
    }
    await createEntity('usuarios', req.body, res);
});

app.put('/usuarios/:id', async (req, res) => {
    // Validación específica para usuarios
    const allowedUpdates = ['username','password', 'rol'];
    const updates = {};
    Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
            updates[key] = req.body[key];
        }
    });
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No hay datos válidos para actualizar' });
    }
    await updateEntity('usuarios', req.params.id, updates, res);
});

app.delete('/usuarios/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        // Verificar si hay empleados asociados a este usuario
        const [empleados] = await db.promise().query('SELECT id FROM empleados WHERE id_usuario = ?', [userId]);

        if (empleados.length > 0) {
            return res.status(400).json({ error: 'No se puede eliminar el usuario. Existen empleados asociados.' });
        }

        await deleteEntity('usuarios', userId, res);
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
});

// Empleados
app.get('/empleados', async (req, res) => {
    await getEntities('empleados', res);
});

app.get('/empleados/:id', async (req, res) => {
    await getEntities('empleados', res, 'id = ?', [req.params.id]);
});

app.post('/empleados', async (req, res) => {
    // Validación específica para empleados
    if (!req.body.nombre || !req.body.apellido || !req.body.cedula || !req.body.id_usuario) {
        return res.status(400).json({ error: 'Faltan datos de empleado' });
    }
    await createEntity('empleados', req.body, res);
});

app.put('/empleados/:id', async (req, res) => {
    await updateEntity('empleados', req.params.id, req.body, res, 'id');
});

app.delete('/empleados/:id', async (req, res) => {
    await deleteEntity('empleados', req.params.id, res, 'id');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor de la API escuchando en el puerto ${PORT}`);
});