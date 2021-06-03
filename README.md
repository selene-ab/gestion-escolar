# Gestión-escolar

Single Page Applicacion creada usando Angular 11.

También se ha usado Tailwind y Angular Material para construir el diseño de las páginas. Para la autenticación se ha utilizado un token jwt.

## Funcionalidades

SPA creada con el objetivo de hacer más sencilla la gestión escolar de alumnos y profesores.
Para ello se ha hecho uso de diferentes servicios, así como de la API de localStorage y redux para el manejo de los datos de los usuarios.

Consta de dos áreas diferenciadas que necesitan de autenticación para poder acceder a ellas.

Dentro del área personal los alumnos estos podrán modificar sus datos personales, consultar las notas de sus exámenes y tareas, y entregar estas últimas.

Dentro del área de profesores estos podrán acceder a los listados de los alumnos, consultar sus datos, exámenes, tareas y añadirles calificaciones nuevas.
Además podran ver los listados de asignaturas y clases creadas, crear nuevas, añadir tareas a sus alumnos e introducir un nuevo alumno dentro de la aplicación.

## Demo

Accede a una demo online con datos ficticios a través de Heroku: https://gestion-escolar.herokuapp.com/

Para poder acceder a las diferentes áreas se debe introducir:

**Área personal**:

- _Usuario_: alumno@gmail.com
- _Contraseña_: test

**Área de profesores**:

- _Usuario_: profesor@gmail.com
- _Contraseña_: test

## Ejecutar localmente

```
git clone https://github.com/selene-ab/gestion-escolar.git
cd gestion-escolar
npm install
npm start
```

## Uso

Para acceder a alguna de las áreas es necesario autenticarse con el usuario y contraseña.

Se debe tener en cuenta que un usuario con el rol de profesor no podrá acceder a la área de los alumnos ni viceversa, gracias al uso de los guards de angular.

![Iniciar sesión.](https://imgur.com/hWRMSAY.png "Iniciar sesión")

Al iniciar sesión serás redirigido al área correspondiente y aparecerá el icono de cerrar sesión.

![Cerrar sesión.](https://imgur.com/ICyYVNU.png "Cerrar sesión")

### Área de profesores:

- **Página de inicio**:

En ella encontrarás los datos básicos del profesor.

![Página de inicio.](https://imgur.com/MaE59HU.png "Página de inicio profesores")

- **Listado de estudiantes**:

Puedes buscar a los alumnos dentro de las tablas por orden.

![Listado de alumnos.](https://imgur.com/AT7nGdS.png "Listado de alumnos")

O también puedes hacer una búsqueda por clases.

![Listado por clases.](https://imgur.com/LydAnkI.png "Listado por clases")

Una vez dentro de un alumno podrás consultar su ficha personal, sus calificaciones, sus tareas y evaluarle.

Información:

![Información de alumno.](https://imgur.com/4cRONmc.png "Información de alumno")

Exámenes:

![Exámenes de alumno.](https://imgur.com/ubb7OPE.png "Exámenes de alumno")

Tareas:

![Tareas de alumno.](https://imgur.com/aa6BlHs.png "Tareas de alumno")

Evaluar tarea de alumno:

![Evaluar tarea.](https://imgur.com/WY7Tkwy.png "Evaluar tarea")

- **Listado de clases y asignaturas**:

Clases:

![Listado de clases.](https://imgur.com/9fYk3Hq.png "Listado de clases")

Asignaturas:

![Listado de asignaturas.](https://imgur.com/npiNget.png "Listado de asignaturas")

- **Añadir calificaciones**:

Puedes añadir las notas de los exámenes a cada uno de los alumnos rellenando el formulario, o también puedes hacerlo desde el perfil del alumno del apartado anterior.

![Añadir calificación.](https://imgur.com/mgbNpNu.png "Añadir calificación")

Para añadir la nota de un examen debes poner el día y la hora de realización.

![Fecha examen.](https://imgur.com/OlbsYed.png "Fecha examen")

- **Crear tareas**:

Selecciona el alumno que desees y la asignatura, añade el período de entrega y una descripción detallada de la tarea.

![Nueva tarea.](https://imgur.com/J1TArZh.png "Nueva tarea")

- **Añadir un nuevo alumno**:

Puedes añadir un nuevo alumno, para ello introduce sus datos personales y a través de su email y la contraseña se le dará acceso a su área personal.

![Nuevo alumno.](https://imgur.com/3imZycX.png "Nuevo alumno")

- **Crear nueva clase y nueva asignatura**:

También puedes añadir una nueva clase o asignatura rellenando estos formularios simples.

Formulario clases:

![Nueva clase.](https://imgur.com/h41OtGm.png "Nueva clase")

Formulario asignaturas:

![Nueva asignatura.](https://imgur.com/Ql06jlv.png "Nueva asignatura")

### Area personal de alumnos:

![Area de alumnos.](https://imgur.com/YmiBbh2.png "Area de alumnos")

Una vez autenticado, el alumno entrará en su área personal donde encontrará los siguientes apartados.

- **Perfil**:

Aquí se encontrará la información personal del estudiante y podrá editar sus datos.

![Editar perfil.](https://imgur.com/4ESbcr5.png "Editar perfil")

- **Exámenes**:

Este apartado consta de un listado con todos los exámenes realizados y sus calificaciones, también obtendrá información de su nota media y de sus exámenes aptos y no aptos.

![Examenes.](https://imgur.com/WzV2p8j.png "Examenes")

- **Tareas**:

Un listado con todas las tareas entregadas y pendientes de entregar.

![Listado de tareas.](https://imgur.com/AkwkUHZ.png "Listado de tareas")

Puede pinchar en las tareas no entregadas y realizarlas:

![Entregar tarea.](https://imgur.com/3YzeXmq.png "Entregar tarea")
