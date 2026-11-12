# Aplicaciones sobre Redes de Ordenadores - Grupo 5

Aplicación para la gestión y reserva de servicios de una peluquería canina. Los clientes reservan desde el móvil y el peluquero gestiona su agenda desde la propia app.

## Índice

- [Descripción](#descripción)
- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Cliente (aplicación móvil)](#cliente-aplicación-móvil)
- [Servidor](#servidor)
- [Cuenta del peluquero](#cuenta-del-peluquero)
- [Base de datos](#base-de-datos)
- [Conectividad y funcionamiento sin conexión](#conectividad-y-funcionamiento-sin-conexión)
- [API](#api)
- [Generar la aplicación para instalar](#generar-la-aplicación-para-instalar)

## Descripción

Los clientes pueden registrarse, iniciar sesión, crear el perfil de sus mascotas, elegir servicios, consultar la disponibilidad y reservar. También pueden consultar el historial de mascotas y reservas, dejar reseñas, ver el horario de la tienda y la localización de la peluquería.

El peluquero entra con su propia cuenta y ve un panel distinto: la agenda de todas las citas, la lista de usuarios y el horario de la tienda.

## Funcionalidades

**Cliente**

- Registro e inicio de sesión con tokens.
- Gestión de mascotas e historial.
- Selección de servicios y cálculo de la duración total.
- Consulta de disponibilidad, reserva, modificación y cancelación de citas.
- Reseñas.
- Horario de la tienda en la pantalla de inicio.
- Localización: mapa con la peluquería y la posición del usuario, distancia y tiempo aproximado a pie.
- Si falla la conexión, los cambios (reservas, mascotas, reseñas) se guardan en el móvil y se envían solos al volver la red.

**Peluquero**

- Reservas: agenda por días con las citas de todos los clientes (hora, perro, cliente y teléfono, servicios) y botón para cancelarlas.
- Usuarios: lista con rol, perros y reservas de cada uno. Se puede contratar a un cliente (darle el rol de peluquero), quitárselo o eliminarlo junto con sus datos.
- Modificar horario: cambia el horario fijo de la tienda (tramo de mañana y de tarde). Los clientes lo ven como texto y el calendario solo ofrece horas dentro de él.

Servicios disponibles:

| ID | Servicio                        | Duración |
| -: | ------------------------------- | -------: |
|  1 | Baño + secado                   |   60 min |
|  2 | Corte de uñas                   |   15 min |
|  3 | Completo                        |  120 min |
|  4 | Lavado de dientes               |   15 min |
|  5 | Tratamiento pulgas y garrapatas |   30 min |
|  6 | Corte de pelo                   |   60 min |

La duración de una cita es la suma de los servicios elegidos y no puede cruzar el descanso del mediodía ni chocar con otra cita.

## Tecnologías

- Cliente: React Native, Expo
- Servidor: Node.js, Express, Sequelize, MySQL2
- Base de datos: MySQL (Aiven)
- Seguridad: contraseñas con bcrypt, sesiones con tokens JWT y conexión cifrada (SSL/TLS) con `ca.pem`

## Cliente (aplicación móvil)

Desde la carpeta `cliente`:

```bash
npm install
npx expo start
```

En Windows, si PowerShell bloquea los comandos, usar `npm.cmd install` y `npx.cmd expo start`.

Si Expo da errores raros tras añadir pantallas o dependencias (por ejemplo `Requiring unknown module`), reiniciar con la caché limpia:

```bash
npx expo start -c
```

Si se ejecuta en Expo Go, escanear el QR desde el móvil, que tiene que estar en la misma WiFi que el ordenador. Para Android, pulsar `a` en la terminal. No pulsar `w` para probar la localización.

### Dirección del servidor

La app busca el servidor así:

1. Si existe la variable `EXPO_PUBLIC_API_URL` (en `cliente/.env`), usa esa dirección. Es lo que hay que hacer para que funcione en cualquier dispositivo: tiene que ser la dirección pública del servidor, con `https`.
2. Si no, en desarrollo usa la IP del ordenador que ejecuta Expo. Solo funciona con el móvil en la misma red.
3. Si no hay ninguna de las dos, la app avisa de que no tiene servidor configurado.

Ejemplo de `cliente/.env`:

```text
EXPO_PUBLIC_API_URL=https://mi-servidor.example.com
```

### Pantalla de localización

La pantalla de localización usa estas dependencias, que deben estar instaladas:

```bash
npx expo install expo-location react-native-webview
```

Notas:

- El mapa usa OpenStreetMap dentro de un `WebView`. No necesita clave de Google Maps.
- El móvil necesita conexión a internet para cargar el mapa.
- La aplicación pide permiso de ubicación al entrar en la pantalla. Si se deniega, se puede activar desde los ajustes del móvil.
- En navegador (web) no se muestra el mapa, solo el nombre de la peluquería y el botón para abrir Google Maps.

## Servidor

Requiere Node.js. Comprobar con `node --version` y `npm --version`.

### Configuración

Copiar `servidor/.env.example` como `servidor/.env` y rellenarlo con los datos de la base de datos (Aiven) y una `SECRET_KEY` larga y aleatoria. Hace falta también el certificado `ca.pem` en la carpeta `servidor`. Sin las variables `DB_*` el servidor no arranca.

El archivo `.env` no se sube al repositorio. Los datos se piden a otro integrante del grupo, por un canal privado.

### Arrancar

Desde la raíz del proyecto:

```bash
cd servidor
npm install
node index.js
```

Si la conexión es correcta aparecerá algo parecido a:

```text
Conexión con Aiven establecida correctamente.
Tablas sincronizadas correctamente.
Servidor en http://localhost:3000
```

Para detenerlo: `Ctrl + C`. Para comprobar que responde: `http://localhost:3000/salud` devuelve `{"ok":true}`.

Si sale `ETIMEDOUT`, el servicio de Aiven puede estar apagado (se enciende desde su consola) o la red puede estar bloqueando el puerto.

Para ver qué hay guardado en la base de datos (usuarios, perros y reservas):

```bash
node ver_bbdd.js
```

## Cuenta del peluquero

Los clientes que se registran desde la app siempre son clientes. La primera cuenta de peluquero se crea desde la carpeta `servidor`:

```bash
node crear_peluquero.js <nombre> <telefono> "<contraseña>"
```

Por ejemplo `node crear_peluquero.js peluquero1 600000000 "Clave#2026"`. El nombre tiene de 6 a 20 caracteres y la contraseña, al menos 7 con mayúscula, minúscula y un símbolo. Si el usuario ya existe, solo se le da el rol de peluquero.

Al iniciar sesión con esa cuenta se abre el panel del peluquero. Desde **Usuarios** se puede contratar a más gente sin repetir este paso.

## Base de datos

MySQL alojada en Aiven. El servidor se conecta con Sequelize mediante SSL/TLS usando `ca.pem`.

Las credenciales son necesarias para ejecutar el servidor, pero no deben subirse al repositorio.

Tablas: `usuarios` (con su rol), `animales`, `reservas`, `resenas`, `config_tienda` (horario), `idempotencia` y la lista de tokens invalidados al cerrar sesión. Se crean o actualizan solas al arrancar el servidor.

## Conectividad y funcionamiento sin conexión

- **Reintentos:** ante un fallo de red o un error 5xx se repite la petición hasta tres veces con esperas cada vez mayores (1, 2 y 4 segundos, con algo de aleatoriedad), y cada intento tiene un límite de 15 segundos.
- **Idempotencia:** las operaciones que modifican datos llevan una cabecera `Idempotency-Key` que no cambia entre reintentos. El servidor guarda el resultado y, si la misma clave llega otra vez, lo devuelve sin repetir la operación. Así no se duplican reservas ni mascotas si se pierde la respuesta.
- **Cambios pendientes:** si no hay forma de contactar con el servidor, el cambio se guarda en el móvil hasta que el servidor lo confirme. El login, el registro y el cierre de sesión nunca se guardan.
- **Sincronización:** al abrir la app, al volver la red, al volver de segundo plano y al iniciar sesión se envían los cambios pendientes en orden. Si hay un conflicto (por ejemplo, la hora ya la ha cogido otra persona) se avisa y se descarta ese cambio.

Las acciones del peluquero necesitan conexión y no se guardan para más tarde.

## API

La aplicación móvil se comunica con el servidor mediante una API REST. Las rutas marcadas con "Usuario" necesitan token y las de "Peluquero" necesitan además el rol de peluquero.

| Método | Ruta | Quién | Qué hace |
| --- | --- | --- | --- |
| POST | `/registro` | Todos | Crea un usuario (siempre cliente) |
| POST | `/login` | Todos | Inicia sesión y devuelve el token y el rol |
| GET | `/perfil` | Usuario | Datos del usuario |
| POST | `/logout` | Usuario | Cierra la sesión e invalida el token |
| GET | `/servicios` | Todos | Lista de servicios y duraciones |
| GET | `/salud` | Todos | Comprueba que el servidor está en marcha |
| GET | `/horario` | Todos | Horario de la tienda |
| GET, POST | `/animales`, `/registrarAnimal` | Usuario | Lista y registra mascotas |
| PUT, DELETE | `/animales/:id` | Usuario | Modifica o borra una mascota |
| GET | `/disponibilidad` | Usuario | Horas libres de un día (`fecha` y `servicios`) |
| GET, POST | `/reservas` | Usuario | Lista y crea reservas |
| PUT, DELETE | `/reservas/:id` | Usuario | Modifica o cancela una reserva |
| GET, POST | `/resenas` | Todos / Usuario | Lista y publica reseñas |
| PUT | `/horario` | Peluquero | Cambia el horario de la tienda |
| GET | `/peluquero/agenda` | Peluquero | Citas de todos los clientes de un día (`fecha`) |
| DELETE | `/peluquero/reservas/:id` | Peluquero | Cancela la cita de cualquier cliente |
| GET | `/peluquero/usuarios` | Peluquero | Lista de usuarios |
| PUT | `/peluquero/usuarios/:nombre/rol` | Peluquero | Contrata a un cliente o le quita el rol |
| DELETE | `/peluquero/usuarios/:nombre` | Peluquero | Elimina un cliente y sus datos |

Códigos de error habituales: 400 datos incorrectos, 401 sin sesión o caducada, 403 sin permiso (rol), 404 no existe, 409 conflicto (hora ocupada, usuario repetido), 422 clave de idempotencia reutilizada con otro contenido.

## Generar la aplicación para instalar

Para instalar la app sin Expo Go hay que generar un APK con EAS Build. Antes, el servidor tiene que estar desplegado en una dirección pública con `https`, porque el APK no puede usar la IP del ordenador. Esa dirección se pasa en `EXPO_PUBLIC_API_URL` al compilar.

Desde la carpeta `cliente`:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

Al terminar, Expo da un enlace y un QR para descargar el APK. En el perfil `preview` de `eas.json` hay que indicar `"android": { "buildType": "apk" }` y la variable `EXPO_PUBLIC_API_URL`.

## Grupo 5

Amaia Resano, Ángela Ochoa, Naroa Azparren y Alain Martínez.

Aplicaciones sobre Redes de Ordenadores
