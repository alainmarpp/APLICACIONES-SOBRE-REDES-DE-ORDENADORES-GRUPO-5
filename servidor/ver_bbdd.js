// Muestra lo que hay guardado en la base de datos (usuarios, perros y reservas).
// Uso (desde la carpeta servidor, con el .env ya configurado):   node ver_bbdd.js
// No hace falta tener el servidor encendido.

require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const sequelize = require('./config/database');
const Usuario = require('./src/models/user.model');
const Animal = require('./src/models/animal.model');
const Reserva = require('./src/models/reserva.model');

async function main() {
    await sequelize.authenticate();
    console.log('\n✅ Conectado a la base de datos\n');

    const usuarios = await Usuario.findAll({ raw: true });
    console.log(`👤 USUARIOS (${usuarios.length})`);
    // De la contraseña solo se enseña el principio, para comprobar que está cifrada y no en texto plano
    console.table(
        usuarios.map((u) => ({
            nombre: u.nombre,
            tlf: u.tlf,
            contrasenia: u.contrasenia.slice(0, 10) + '… (' + u.contrasenia.length + ' caracteres)',
        }))
    );

    const animales = await Animal.findAll({ raw: true });
    console.log(`🐶 ANIMALES (${animales.length})`);
    console.table(animales);

    const reservas = await Reserva.findAll({ raw: true, order: [['fecha', 'ASC'], ['horainicio', 'ASC']] });
    console.log(`📅 RESERVAS (${reservas.length})`);
    console.table(reservas);

    await sequelize.close();
}

main().catch((error) => {
    console.error('\n❌ No se pudo leer la base de datos:');
    console.error(error.message + '\n');
    process.exit(1);
});
