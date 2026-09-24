# APLICACIONES-SOBRE-REDES-DE-ORDENADORES-GRUPO-5
login/registro---> tiene que ser SEGURO Y TOKEN de inicio de sesion.
      Si registro-> Crear perfil mascota
opciones servicios elegir---->Baño+secado, corte uñas, completo, lavado dientes, tratamiento pulgas y garrapatas,corte de pelo.
        Boton continuar----> sumar horas y sale horario libre y para reservar
ADICIONAL:
historial perro
reseñas
historial reservas
localizacion


//EN VISUAL<br>
**Primera vez abres app:<br> npm.cmd install<br>
**Arrancar Expo<br>
Después: npx.cmd expo start


## 🖥️ SERVIDOR

El servidor utiliza **Node.js + Express**.

### 🚀 Cómo iniciar el servidor

Sigue estos pasos para ejecutar el servidor localmente.

#### 1. Instalar Node.js

Asegúrate de tener **Node.js** instalado.

Puedes comprobarlo con:

```bash
node --version
npm --version
```

#### 2. Entrar en la carpeta del servidor

Desde la raíz del proyecto:

```bash
cd servidor
```

#### 3. Instalar las dependencias

Ejecuta:

```bash
npm install
```

#### 4. Iniciar el servidor

Desde la carpeta `servidor`, ejecuta:

```bash
node index.js
```

Si la conexión es correcta, aparecerán mensajes similares a:

```text
✅ Conexión con MySQL establecida correctamente.
✅ Modelos sincronizados correctamente.
🚀 Servidor corriendo en http://localhost:3000
```

#### 5. Comprobar que el servidor funciona

Abre en el navegador:

```text
http://localhost:3000
```

También puedes utilizar **Postman**, **Insomnia** u otra herramienta para realizar peticiones a la API.

### 🛑 Detener el servidor

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
