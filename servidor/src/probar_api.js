// Prueba automática de la API. Uso (con el servidor ya arrancado en otra terminal):
//   node probar_api.js                     -> prueba http://localhost:3000
//   node probar_api.js http://192.168.1.50:3000
//
// Crea un usuario "test_xxxx" con un perro y una reserva, y borra el perro y la reserva al terminar.
// El usuario de prueba se queda en la BBDD (no hay ruta para borrar usuarios): se puede borrar a mano.

const BASE = process.argv[2] || 'http://localhost:3000';
const usuario = 'test_' + Math.random().toString(36).slice(2, 8);
const clave = 'clave_de_prueba_123';

let fallos = 0;
let token = null;

async function llamar(metodo, ruta, cuerpo, conToken = true) {
    const cabeceras = { 'Content-Type': 'application/json' };
    if (conToken && token) cabeceras.Authorization = `Bearer ${token}`;
    const respuesta = await fetch(BASE + ruta, {
        method: metodo,
        headers: cabeceras,
        body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    });
    let datos = null;
    try { datos = await respuesta.json(); } catch (e) { /* sin JSON */ }
    return { estado: respuesta.status, datos };
}

function comprobar(descripcion, condicion, detalle = '') {
    if (condicion) {
        console.log(`  ✅ ${descripcion}`);
    } else {
        fallos++;
        console.log(`  ❌ ${descripcion} ${detalle ? '-> ' + detalle : ''}`);
    }
}

function fechaDentroDe(dias) {
    const d = new Date();
    d.setDate(d.getDate() + dias);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function main() {
    console.log(`\nProbando la API en ${BASE}\n`);

    console.log('1) Servidor');
    let r = await llamar('GET', '/', null, false);
    comprobar('El servidor responde', r.estado === 200, `estado ${r.estado}`);

    console.log('2) Registro y login');
    r = await llamar('POST', '/registro', { nombre: usuario, tlf: '600000000', contrasenia: clave }, false);
    comprobar('Registro correcto (201) y devuelve token', r.estado === 201 && !!r.datos?.token, JSON.stringify(r.datos));

    r = await llamar('POST', '/login', { nombre: usuario, contrasenia: clave }, false);
    comprobar('Login con la contraseña correcta', r.estado === 200 && !!r.datos?.token, JSON.stringify(r.datos));
    token = r.datos?.token;

    r = await llamar('POST', '/login', { nombre: usuario, contrasenia: 'incorrecta' }, false);
    comprobar('Login con contraseña incorrecta se rechaza (401)', r.estado === 401, `estado ${r.estado}`);

    r = await llamar('POST', '/registro', { nombre: usuario, tlf: '1', contrasenia: clave }, false);
    comprobar('No deja registrar dos veces el mismo usuario (409)', r.estado === 409, `estado ${r.estado}`);

    console.log('3) Token');
    r = await llamar('GET', '/perfil');
    comprobar('/perfil con token devuelve el usuario', r.estado === 200 && r.datos?.nombre === usuario, JSON.stringify(r.datos));

    r = await llamar('GET', '/perfil', null, false);
    comprobar('/perfil sin token se rechaza (401)', r.estado === 401, `estado ${r.estado}`);

    console.log('4) Servicios');
    r = await llamar('GET', '/servicios', null, false);
    comprobar('Devuelve la lista de servicios', r.estado === 200 && Array.isArray(r.datos) && r.datos.length > 0, JSON.stringify(r.datos));

    console.log('5) Perros');
    r = await llamar('POST', '/animales', { nombreAnimal: 'Toby', edad: 3, peso: 12.5, raza: 'Beagle' });
    comprobar('Registrar un perro (201)', r.estado === 201 && !!r.datos?.id, JSON.stringify(r.datos));
    const idAnimal = r.datos?.id;

    r = await llamar('POST', '/animales', { nombreAnimal: 'Toby', edad: 3, peso: 12.5, raza: 'Beagle' });
    comprobar('No deja repetir nombre + raza (409)', r.estado === 409, `estado ${r.estado}`);

    r = await llamar('GET', '/animales');
    comprobar('Lista mis perros', r.estado === 200 && r.datos?.some((a) => a.id === idAnimal), JSON.stringify(r.datos));

    console.log('6) Reservas');
    const fecha = fechaDentroDe(7);
    r = await llamar('GET', `/disponibilidad?fecha=${fecha}&servicios=1`);
    comprobar('Consulta de horas libres', r.estado === 200 && Array.isArray(r.datos?.horas), JSON.stringify(r.datos));
    const horaLibre = r.datos?.horas?.find((h) => h.libre)?.hora;
    comprobar('Hay alguna hora libre', !!horaLibre);

    r = await llamar('POST', '/reservas', { idAnimal, fecha, horainicio: horaLibre, servicios: ['1'] });
    comprobar(`Reservar a las ${horaLibre} (201)`, r.estado === 201 && !!r.datos?.id, JSON.stringify(r.datos));
    const idReserva = r.datos?.id;

    r = await llamar('GET', `/disponibilidad?fecha=${fecha}&servicios=1`);
    const ocupada = r.datos?.horas?.find((h) => h.hora === horaLibre);
    comprobar('Esa hora ahora aparece ocupada', ocupada && ocupada.libre === false, JSON.stringify(ocupada));

    r = await llamar('POST', '/reservas', { idAnimal, fecha, horainicio: horaLibre, servicios: ['1'] });
    comprobar('No deja reservar la misma hora otra vez (409)', r.estado === 409, `estado ${r.estado}`);

    r = await llamar('GET', '/reservas');
    comprobar('Aparece en mis reservas', r.estado === 200 && r.datos?.some((x) => x.id === idReserva), JSON.stringify(r.datos));

    console.log('7) Limpieza');
    r = await llamar('DELETE', `/reservas/${idReserva}`);
    comprobar('Cancelar la reserva', r.estado === 200, `estado ${r.estado}`);
    r = await llamar('DELETE', `/animales/${idAnimal}`);
    comprobar('Borrar el perro de prueba', r.estado === 200, `estado ${r.estado}`);

    console.log(fallos === 0
        ? '\n🎉 Todo correcto: la API funciona.\n'
        : `\n⚠️  ${fallos} comprobación(es) han fallado. Revisa las líneas con ❌.\n`);
    process.exit(fallos === 0 ? 0 : 1);
}

main().catch((error) => {
    console.log('\n❌ No se pudo conectar con el servidor. ¿Está arrancado (node index.js)?');
    console.log('   ' + error.message + '\n');
    process.exit(1);
});
