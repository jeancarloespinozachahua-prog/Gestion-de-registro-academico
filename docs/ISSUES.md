# Issues sugeridos (crear en GitHub → Issues)

| # | Título | Etiqueta | Asignado | Resuelve |
|---|---|---|---|---|
| 1 | Registrar y listar estudiantes con código, nombres y apellidos | feature | Desarrollador 1 | PR `feature/registro-estudiantes` |
| 2 | Registrar y listar cursos con validación de campos | feature | Desarrollador 2 | PR `feature/gestion-cursos` |
| 3 | Workflow de GitHub Actions para Pull Requests | automation | Calidad y seguridad | PR `feature/ci` |
| 4 | Endurecer `.gitignore` y verificar que no hay secretos | security | Calidad y seguridad | PR `feature/seguridad` |
| 5 | Resolver conflicto en `docs/prueba-conflicto.txt` | process | Integrador | merge `conflicto/a` + `conflicto/b` |

Cuerpo de ejemplo (Issue 1):

```
**Qué**: el usuario puede registrar estudiantes y verlos en una tabla.
**Criterios de aceptación**
- [ ] Campos código, nombres, apellidos obligatorios
- [ ] No se permiten códigos repetidos
- [ ] Listado muestra total
```

En el PR escribe `Closes #1` para que el Issue se cierre solo al integrar.
