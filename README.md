# Sistema de Gestión Académica — gestion-academica-equipo

Prototipo web para registrar estudiantes, organizar cursos y consultar información. Los datos se guardan en el navegador (`localStorage`); no hay servidor ni base de datos.

## Funcionalidades

- Registrar estudiantes (código, nombres, apellidos, DNI, edad, carrera) y listarlos.
- Registrar cursos (código, nombre, créditos, docente) y listarlos.
- Validación de campos obligatorios y formatos (HTML5 + [validaciones.js](validaciones.js)).
- Códigos duplicados rechazados; datos escapados con `textContent` (sin XSS).
- Menú lateral de navegación: Estudiantes, Cursos, Consultas (resumen).

## Integrantes

| Integrante | Rol | Rama / evidencia |
|---|---|---|
| Crisber J. A. R. | Líder técnico | repositorio, estructura, README |
| Jean Carlo Espinoza | Desarrollador 1 | `feature/registro-estudiantes` |
| Yhonatan Q. U. | Desarrollador 2 | `feature/gestion-cursos` |
| Yuliana Esther | Integrador/revisor | Pull Requests, revisión, conflicto |
| Kevin Minaya | Calidad y seguridad | `.gitignore`, Actions, tablero, pruebas |

> Ajusta nombres y roles a la asignación real del equipo.

## Requisitos

- Navegador moderno (Chrome, Edge, Firefox).
- Para pruebas: [Node.js](https://nodejs.org) 18 o superior (no hay dependencias que instalar).
- Git 2.x y cuenta de GitHub.

## Ejecución

```bash
git clone https://github.com/<organizacion>/gestion-academica-equipo.git
cd gestion-academica-equipo
```

Abrir `index.html` en el navegador (doble clic), o con XAMPP copiar la carpeta a `htdocs` y visitar `http://localhost/<carpeta>/`.

## Pruebas y verificaciones

```bash
npm test                  # pruebas de validaciones (node --test)
npm run check:secretos    # falla si hay .env, llaves o tokens versionados
```

Ambas corren automáticamente en cada Pull Request ([.github/workflows/ci.yml](.github/workflows/ci.yml)).

## Estructura

```
index.html            interfaz y navegación
stilos.css            estilos
validaciones.js       funciones puras de validación (navegador + Node)
validar formulario.js validación de formularios en el DOM
script.js             estudiantes (registro/listado)
cursos.js             cursos (registro/listado)
vulnerable.html       demo aislada: datos corruptos en localStorage
tests/                pruebas automáticas
scripts/              verificar-secretos.js
.github/              workflow de Actions y plantilla de PR
docs/                 informe, guía de flujo Git, conflicto, issues
```

## Flujo de ramas

`main` (estable) ← `develop` (integración) ← `feature/*`. Ver [docs/GUIA-GIT-GITHUB.md](docs/GUIA-GIT-GITHUB.md).

## Seguridad

Nunca se versionan `.env`, llaves ni tokens (ver [.gitignore](.gitignore)). Para SSH, solo se publica la llave **pública** en GitHub.
