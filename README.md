# Respirar - Módulo mapas - Frontend web

**Proyecto Final**.

Trabajo práctico

Alumnos: Mateo Amarillo - Patricio Córdoba

Profesores: Jorge Velurtas - Martín Sarquis Rivas

****

## Este proyecto utiliza: ##

- **NodeJs** - https://nodejs.org/
- **react** - https://react.dev/
- **react-bootstrap** - https://react-bootstrap.github.io/
- **leaflet** - https://leafletjs.com/
- **axios** - https://axios-http.com/
- **json2csv** - https://www.npmjs.com/package/@json2csv/plainjs
- **dotenv** - https://github.com/motdotla/dotenv
- **jsonwebtoken** - https://github.com/auth0/node-jsonwebtoken
- **js-cookie** - https://www.npmjs.com/package/js-cookie

****

## Setup Local
**Requisitos**
- Node 16

#### 1- Instalar dependencias ####
```bash
$ npm install
```
#### 2- Completar archivo .env.local (si no existe, crear uno en la raíz del proyecto)
```env
REACT_APP_STATIONS_SERVICE_BASE_URL = {orion_url}
```
#### 3- Correr el proyecto en modo dev (actualiza automáticamente ante cambios en el código) ####
```bash
$ npm run
```
Se abrirá automáticamente un browser en [http://localhost:3000](http://localhost:3000) mostrando el sitio

****

#### 4- Correr el Docker Compose con los módulos de Fiware necesarios ####

****

## Setup Dockerizado
**Requisitos**
- Docker

#### 1- Completar archivo .env.production (si no existe, crear uno en la raíz del proyecto)
```env
REACT_APP_STATIONS_SERVICE_BASE_URL = {orion_url}
```

#### 2- Crear imagen ####
Estando en la raíz del proyecto, correr:
```bash
$ docker build . -t respirar-web
```

#### 3- Correr imagen ####
```bash
$ docker run -p 3000:3000 -d respirar-web
```
