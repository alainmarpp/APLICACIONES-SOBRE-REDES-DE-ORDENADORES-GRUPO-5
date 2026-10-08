# 🐕 Aplicaciones sobre Redes de Ordenadores — Grupo 5

Aplicación para la **gestión y reserva de servicios de cuidado y peluquería para mascotas**.

---

## 📑 Índice

* [📖 Descripción del proyecto](#-descripción-del-proyecto)
* [✨ Funcionalidades](#-funcionalidades)

  * [🔐 Autenticación](#-autenticación)
  * [🐶 Gestión de mascotas](#-gestión-de-mascotas)
  * [✂️ Servicios disponibles](#️-servicios-disponibles)
  * [📅 Reservas](#-reservas)
  * [⭐ Funcionalidades adicionales](#-funcionalidades-adicionales)
* [💻 Tecnologías](#-tecnologías)
* [📱 Aplicación móvil](#-aplicación-móvil)
* [🖥️ Servidor](#️-servidor)

  * [🚀 Cómo iniciar el servidor](#-cómo-iniciar-el-servidor)
  * [🛑 Detener el servidor](#-detener-el-servidor)
* [🗄️ Base de Datos (BBDD)](#️-base-de-datos-bbdd)

  * [☁️ Infraestructura](#️-infraestructura)
  * [🔐 Seguridad](#-seguridad)
  * [🔄 Flujo de conexión](#-flujo-de-conexión)
* [📡 API](#-api)
* [👥 Grupo 5](#-grupo-5)

---

# 📖 Descripción del proyecto

El proyecto consiste en una aplicación destinada a la **gestión de servicios de peluquería y cuidado de mascotas**.

Los usuarios podrán registrarse e iniciar sesión de forma segura y, una vez dentro de la aplicación, crear y gestionar el perfil de sus mascotas.

La aplicación permite seleccionar diferentes servicios, calcular su duración, consultar la disponibilidad horaria y realizar reservas.

Además, se contempla la gestión del historial de las mascotas, las reservas, las reseñas y la localización.

---

# ✨ Funcionalidades

## 🔐 Autenticación

* Registro de usuarios.
* Inicio de sesión.
* Autenticación mediante **tokens**.
* Gestión segura de las sesiones.
* Creación del perfil de la mascota después del registro.

## 🐶 Gestión de mascotas

Los usuarios pueden crear y gestionar el perfil de sus mascotas.

La aplicación contempla también el **historial de cada mascota**.

## ✂️ Servicios disponibles

La aplicación dispone actualmente de los siguientes servicios:

| ID | Servicio                           |
| -: | ---------------------------------- |
|  1 | 🛁 Baño + secado                   |
|  2 | 💅 Corte uñas                      |
|  3 | 🐕 Completo                        |
|  4 | 🦷 Lavado dientes                  |
|  5 | 🪲 Tratamiento pulgas y garrapatas |
|  6 | ✂️ Corte de pelo                   |

Los servicios se pueden seleccionar para posteriormente realizar una reserva.

## 📅 Reservas

El sistema permite seleccionar uno o varios servicios y calcular la duración total de la reserva.

El proceso de reserva sigue el siguiente flujo:

```text
👤 Usuario
   │
   ▼
✂️ Selección de servicios
   │
   ▼
⏱️ Cálculo de duración
   │
   ▼
📅 Consulta de disponibilidad
   │
   ▼
🕐 Horarios disponibles
   │
   ▼
✅ Confirmación de reserva
```

## ⭐ Funcionalidades adicionales

El proyecto contempla diferentes funcionalidades relacionadas con la gestión de las mascotas y las reservas:

* 🐶 Historial de la mascota.
* 📅 Historial de reservas.
* ⭐ Sistema de reseñas.
* 📍 Localización.

---

# 💻 Tecnologías

## 📱 Aplicación móvil

* **React Native**
* **Expo**

## 🖥️ Backend

* **Node.js**
* **Express**
* **Sequelize**
* **MySQL2**

## 🗄️ Base de datos

* **MySQL**
* **Aiven**

## 🔐 Seguridad

* Autenticación mediante tokens.
* Conexión SSL/TLS con la base de datos.
* Certificado `ca.pem`.

---

# 📱 Aplicación móvil

La aplicación móvil está desarrollada utilizando **React Native + Expo**.

## 🚀 Cómo iniciar la aplicación

La primera vez que se ejecuta el proyecto, es necesario instalar las dependencias.

Desde la carpeta de la aplicación móvil:

```bash
npm install
```

Para iniciar Expo:

```bash
npx expo start
```

También se puede utilizar:

```bash
npm.cmd install
npx.cmd expo start
```

Una vez iniciado Expo, se podrá ejecutar la aplicación utilizando las opciones proporcionadas por Expo.
Iniciar Expo desde el cliente

---

# 🖥️ Servidor

El servidor utiliza **Node.js + Express**.

## 🚀 Cómo iniciar el servidor

### 1. Instalar Node.js

Asegúrate de tener **Node.js** instalado.

Puedes comprobarlo con:

```bash
node --version
npm --version
```

### 2. Entrar en la carpeta del servidor

Desde la raíz del proyecto:

```bash
cd servidor
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Iniciar el servidor

```bash
node index.js
```

Si la conexión es correcta, aparecerán mensajes similares a:

```text
✅ Conexión con MySQL establecida correctamente.
✅ Modelos sincronizados correctamente.
🚀 Servidor corriendo en http://localhost:3000
```

### 5. Comprobar que el servidor funciona

Abre en el navegador:

```text
http://localhost:3000
```

También puedes utilizar **Postman**, **Insomnia** u otra herramienta para realizar peticiones a la API.

## 🛑 Detener el servidor

Para detener el servidor:

```text
Ctrl + C
```

### 📋 Resumen de comandos

```bash
cd servidor
npm install
node index.js
```

---

# 🗄️ BASE DE DATOS (BBDD)

La aplicación utiliza una base de datos **MySQL** alojada en la nube mediante **Aiven**, permitiendo que el servidor pueda acceder a la información de forma remota y segura.

## ☁️ Infraestructura

La base de datos se encuentra desplegada en un servidor gestionado por **Aiven**, que proporciona la infraestructura necesaria para ejecutar y administrar el servicio MySQL.

La aplicación se conecta a la BBDD mediante:

* 🐬 **MySQL** como sistema gestor de base de datos.
* ☁️ **Aiven** como proveedor de alojamiento.
* 🔌 **Sequelize** como ORM para gestionar la comunicación entre Node.js y MySQL.
* 🔐 **SSL/TLS** para proteger la conexión entre el servidor y la base de datos.
* 📜 **`ca.pem`** para verificar el certificado del servidor y establecer una conexión segura.

## 🔐 Seguridad

La conexión con la base de datos utiliza un certificado **CA (`ca.pem`) proporcionado por Aiven**, permitiendo verificar la identidad del servidor antes de establecer la conexión.

Las credenciales de acceso a la base de datos son necesarias para ejecutar el servidor, pero **no deben almacenarse ni publicarse en el repositorio de GitHub**.

## 🔄 Flujo de conexión

La arquitectura de la aplicación sigue el siguiente flujo:

```text
👤 Usuario
    │
    ▼
📱 Aplicación móvil
    │
    │ HTTP / REST
    ▼
🖥️ Node.js + Express
    │
    │ Sequelize
    │ SSL/TLS 🔐
    ▼
☁️ Aiven
    │
    ▼
🐬 MySQL
```

De esta forma, el servidor puede acceder a la base de datos alojada en la nube manteniendo una comunicación **segura y cifrada**.

---

# 📡 API

La comunicación entre la aplicación móvil y el servidor se realiza mediante una **API REST**.

El servidor recibe las peticiones de la aplicación móvil, procesa la información y se comunica con la base de datos mediante **Sequelize**.

La API gestiona las diferentes operaciones relacionadas con:

* 👤 Usuarios.
* 🔐 Autenticación.
* 🐶 Mascotas.
* ✂️ Servicios.
* 📅 Reservas.
* ⭐ Reseñas.
* 📋 Historial.

> 🚧 Esta sección se irá ampliando con los diferentes endpoints implementados en la API.

---

# 👥 Grupo 5

**Aplicaciones sobre Redes de Ordenadores**

**Grupo 5**
