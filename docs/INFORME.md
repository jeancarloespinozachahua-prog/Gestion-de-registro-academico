# Informe técnico — Gestión Académica (gestion-academica-equipo)

## 1. Arquitectura

Aplicación de una sola página estática (HTML + CSS + JavaScript sin dependencias). La persistencia es `localStorage` del navegador, con claves `estudiantes` y `cursos`. No hay backend.

```
index.html ──► validaciones.js (reglas puras, testeables en Node)
           ├─► validar formulario.js (enlaza reglas con los inputs)
           ├─► script.js   (estudiantes: registrar, listar, eliminar)
           └─► cursos.js   (cursos: registrar, listar, eliminar)
```

## 2. Estructura de carpetas

Ver el árbol en el [README](../README.md#estructura).

## 3. Decisiones técnicas

- **JS vanilla**: prototipo pequeño; sin build ni instalación, abre con doble clic.
- **Validación en dos capas**: atributos HTML5 (`required`, `pattern`, `min/max`) + `validaciones.js`.
- **Seguridad**: render con `textContent` (no `innerHTML`); datos leídos de `localStorage` se filtran por tipo y formato (`vulnerable.html` demuestra el caso de datos corruptos).
- **Pruebas**: `node --test` integrado (cero dependencias) sobre `validaciones.js`.
- **Flujo**: `main` / `develop` / `feature/*` con PR obligatorio y check de Actions.

## 4. Comandos usados

Completar con los realmente ejecutados (ver [GUIA-GIT-GITHUB.md](GUIA-GIT-GITHUB.md)): `git init/clone`, `config`, `checkout -b`, `add`, `commit`, `push -u`, `pull`, `merge`, `status`, `log --oneline --graph --all`, `gh pr create`, `ssh-keygen`.

## 5. Evidencias (insertar capturas)

| Evidencia | Captura |
|---|---|
| Repositorio y README | |
| Ramas (`git branch -a`) | |
| Historial de commits por integrante (`git shortlog -sn`) | |
| PR + comentario de revisión + aprobación | |
| Issues y tablero Projects | |
| Conflicto antes / después | |
| `.gitignore` + `git status` sin `.env` | |
| Workflow ejecutado en verde | |

## 6. Dificultades y soluciones

| Dificultad | Solución |
|---|---|
| Conflictos al unir cambios de estilos y validaciones (commit `0ef0925`) | Revisar marcas `<<<<<<<`, conservar ambas funcionalidades, probar en el navegador, commit de merge |
| Datos corruptos en `localStorage` rompían la lista | Filtrado por tipo/formato al cargar (`cargarEstudiantes`/`cargarCursos`) |
| Riesgo de subir credenciales | `.gitignore` + `check:secretos` en CI |
| *(agrega las reales del equipo)* | |

## 7. Conclusiones

*(2-3 líneas del equipo)*
