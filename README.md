# Aplicaciones sobre Redes de Ordenadores - Grupo 5

## Índice

- [Integrantes](#integrantes)
- [Descripción](#descripción)
- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Cliente (aplicación móvil)](#cliente-aplicación-móvil)
- [Servidor](#servidor)
- [Base de datos](#base-de-datos)
- [API](#api)
- [Descarga e Instalación de la Aplicación (Android)](#descarga-e-instalación-de-la-aplicación-android)
- [Descarga e Instalación de la Aplicación (iOS)](#descarga-e-instalación-de-la-aplicación-ios)

## Integrantes

- Naroa Azparren Villanueva
- Alain Martínez Arpón 
- Ángela Ochoa Martínez
- Amaia Duo Resano Eguizabal 

Aplicación para la gestión y reserva de servicios de peluquería y cuidado de mascotas
  
## Descripción

Los usuarios pueden registrarse, iniciar sesión, crear el perfil de sus mascotas, elegir servicios, consultar la disponibilidad y reservar. También pueden consultar el historial de mascotas y reservas, dejar reseñas y ver la localización de la peluquería.

## Funcionalidades

- Registro e inicio de sesión con tokens.
- Gestión de mascotas e historial.
- Selección de servicios y cálculo de la duración total.
- Consulta de disponibilidad y reservas.
- Reseñas.
- Localización: mapa con la peluquería y la posición del usuario, distancia y tiempo aproximado a pie.

Servicios disponibles:

| ID | Servicio                      |
| -: | ----------------------------- |
|  1 | Baño + secado                 |
|  2 | Corte de uñas                 |
|  3 | Completo                      |
|  4 | Lavado de dientes             |
|  5 | Tratamiento pulgas y garrapatas |
|  6 | Corte de pelo                 |

## Tecnologías

- Cliente: React Native, Expo
- Servidor: Node.js, Express, Sequelize, MySQL2
- Base de datos: MySQL (Aiven)
- Seguridad: autenticación con tokens y conexión SSL/TLS con `ca.pem`

## Cliente (aplicación móvil)

Desde la carpeta `cliente`:

```bash
npm install
npx expo start
```

En Windows, si PowerShell bloquea los comandos, usar `npm.cmd install` y `npx.cmd expo start`.

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
- Tras instalar dependencias nuevas, reiniciar con la caché limpia:

```bash
npx expo start -c
```

Si se ejecuta en Expo Go, escanear el QR desde el móvil. Para Android, pulsar `a` en la terminal. No pulsar `w` para probar la localización.

## Servidor

Requiere Node.js. Comprobar con `node --version` y `npm --version`.

Desde la raíz del proyecto:

```bash
cd servidor
npm install
node index.js
```

Si la conexión es correcta aparecerá:

```text
Conexión con MySQL establecida correctamente.
Modelos sincronizados correctamente.
Servidor corriendo en http://localhost:3000
```

Para detenerlo: `Ctrl + C`.

## Base de datos

MySQL alojada en Aiven. El servidor se conecta con Sequelize mediante SSL/TLS, verificando el certificado del servidor con `ca.pem`.

Las credenciales son necesarias para ejecutar el servidor, pero no deben subirse al repositorio.

## API

La aplicación móvil se comunica con el servidor mediante una API REST que gestiona:

- Usuarios y autenticación
- Mascotas
- Servicios
- Reservas
- Reseñas
- Historial

Los endpoints se documentarán a medida que se implementen.

## Descarga e Instalación de la Aplicación (Android)

La aplicación **MiPerruqueria** está lista para instalarse directamente en dispositivos Android sin necesidad de Expo Go.

## Enlace de Descarga
- **[Descargar App](AQUÍ_TU_ENLACE_PERMANENTE)**

###  Pasos para instalar desde un un móvil Android:
1. Descarga el archivo `.apk` directamente desde el móvil usando el enlace de arriba
2. Abre el archivo descargado en tu dispositivo Android
3. Si el sistema lo solicita, activa la opción **"Permitir la instalación de aplicaciones de fuentes desconocidas"**.
4. Pulsa en **Instalar** y ya tienes la aplicación instalada

## Descarga e Instalación de la Aplicación (iOS)

La aplicación **MiPerruqueria** está disponible para dispositivos iPhone mediante una versión web alojada en Netlify

### Enlace de Descarga

- **[Descargar App](https://stellar-alfajores-731d07.netlify.app)**

### Pasos para instalar desde un movil iPhone:

1. Abre Safari en tu iPhone.
2. Accede al enlace de MiPerruqueria publicado en Netlify
3. Pulsa el botón de compartir de Safari
4. Selecciona **«Añadir a pantalla de inicio»**
5. Confirma pulsando **«Añadir»**
