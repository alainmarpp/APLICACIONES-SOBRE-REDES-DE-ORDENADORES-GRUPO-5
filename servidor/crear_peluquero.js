// Crea la cuenta del peluquero (o convierte en peluquero a un usuario que ya existe).
// Uso (desde la carpeta servidor):   node crear_peluquero.js <nombre> <telefono> <contraseña>
// Ejemplo:                           node crear_peluquero.js peluquero1 600000000 "Clave#2026"
// Los clientes que se registran desde la app SIEMPRE son "cliente"; el rol de peluquero solo se da con este script.

require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const sequelize = require('./config/database');
const Usuario = require('./src/models/user.model');

async function main() {
    const [nombre, tlf, contrasenia] = process.argv.slice(2);

    if (!nombre || !tlf || !contrasenia) {
        console.log('Uso: node crear_peluquero.js <nombre> <telefono> <contraseña>');
        process.exit(1);
    }
    if (nombre.length < 6 || nombre.length > 20) {
        console.log('El nombre debe tener entre 6 y 20 caracteres.');
        process.exit(1);
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,}$/.test(contrasenia)) {
        console.log('La contraseña debe tener 7 caracteres o más, con mayúscula, minúscula y un símbolo.');
        process.exit(1);
    }

    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // por si todavía no existe la columna "rol"

    const existente = await Usuario.findByPk(nombre);
    if (existente) {
        existente.rol = 'peluquero';
        await existente.save();
        console.log(`✅ El usuario "${nombre}" ya existía: ahora es peluquero (su contraseña no se ha cambiado).`);
    } else {
        await Usuario.create({ nombre, tlf, contrasenia, rol: 'peluquero' });
        console.log(`✅ Peluquero "${nombre}" creado.`);
    }

    await sequelize.close();
}

main().catch((error) => {
    console.error('❌ No se pudo crear el peluquero:', error.message);
    process.exit(1);
});
