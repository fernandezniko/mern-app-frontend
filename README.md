# MERN App
Aplicación Web Full-Stack que permite a los usuarios compartir distintos lugares, con imágenes y ubicación, con otros usuarios.

Fue desarrollada utilizando

* React
* React Router
* React Hooks
* Javascript ES6
* CSS


La aplicacion se encuentra en el siguiente link: 
[MERN app](https://mern-app-frontend-eight.vercel.app/)

## SinglePageAplication Pages

| Ruta | Descripción | Acceso |
| --- | --- | --- |
| / | Lista todos los usuarios | Siempre Accesible |
| /:uid/place | Lista todos los lugares para un determinado usuario (uid) | Siempre Accesible |
| /authenticate | Formulario de registro e inicio de sesion | Unicamente No-Autenticado |
| /places/new | Formulario para la creacion de un nuevo lugar | Solo Autenticado |
| /places/:pid | Formulario de actualizar un lugar | Solo Autenticado |
