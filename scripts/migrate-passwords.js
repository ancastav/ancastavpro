const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno desde .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function migrate() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL no encontrada en .env.local');
    return;
  }

  const sql = neon(url);
  console.log('--- Iniciando migración de contraseñas ---');

  try {
    const users = await sql`SELECT id, email, password FROM admin_users`;
    
    for (const user of users) {
      // Verificar si ya está hasheada (bcrypt empieza con $2a$ o $2b$)
      if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
        console.log(`[-] Usuario ${user.email} ya tiene contraseña hasheada. Saltando.`);
        continue;
      }

      console.log(`[+] Hasheando contraseña para: ${user.email}`);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      await sql`
        UPDATE admin_users 
        SET password = ${hash} 
        WHERE id = ${user.id}
      `;
      console.log(`[OK] Usuario ${user.email} actualizado.`);
    }

    console.log('--- Migración completada con éxito ---');
  } catch (error) {
    console.error('Error durante la migración:', error);
  }
}

migrate();
