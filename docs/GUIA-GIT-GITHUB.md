# Guía de ejecución Git/GitHub (evidencias por actividad)

Guarda capturas de cada paso: el calificador pide evidencia del proceso real del grupo.

## Actividad 1 — Repositorio

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@correo"
git config --list | grep user          # captura
```

El repositorio debe llamarse `gestion-academica-equipo`. Si el actual (`Gestion-de-registro-academico`) tiene otro nombre: GitHub → Settings → Repository name → renombrar, y luego `git remote set-url origin <nueva-url>`.

## Actividad 2 — Ramas

| Rama | Propósito |
|---|---|
| `main` | Versión estable, solo recibe merges desde `develop` |
| `develop` | Integración de funcionalidades ya revisadas |
| `feature/registro-estudiantes` | Desarrollador 1: registro y listado de estudiantes |
| `feature/gestion-cursos` | Desarrollador 2: registro y listado de cursos |

Flujo elegido: *Git Flow simplificado*. Cada feature sale de `develop`, se publica, se abre PR hacia `develop`, otro integrante revisa y recién entonces se integra.

```bash
git checkout -b develop && git push -u origin develop
git checkout -b feature/registro-estudiantes develop
# ... trabajo y commits descriptivos ...
git push -u origin feature/registro-estudiantes
git checkout develop && git checkout -b feature/gestion-cursos
git push -u origin feature/gestion-cursos
```

Commits: imperativo y específico, p. ej. `Agregar campo código de estudiante`, `Validar créditos entre 1 y 20`.

## Actividad 4 — Pull Requests, Issues y revisión

1. Issues mínimos (ver [ISSUES.md](ISSUES.md)); relaciona con `Closes #n` en el PR.
2. Cada desarrollador: `gh pr create --base develop` (o desde la web). La plantilla de PR se carga sola.
3. Revisor: pestaña *Files changed* → comentario en línea → *Request changes*.
4. Autor corrige y hace push al mismo PR; revisor *Approve*; merge.
5. Activa en Settings → Branches → *Branch protection* para `develop`/`main`: exigir 1 aprobación y el check `verificar`.

## Actividad 5 — Conflicto simulado

Archivo de prueba: [docs/prueba-conflicto.txt](prueba-conflicto.txt). Dos integrantes cambian **la misma línea** en ramas distintas.

```bash
# Integrante A
git checkout -b conflicto/a develop
# editar línea 3 de docs/prueba-conflicto.txt
git commit -am "A: define el titulo del reporte" && git push -u origin conflicto/a

# Integrante B
git checkout -b conflicto/b develop
# editar la MISMA línea 3 con otro texto
git commit -am "B: define el titulo del reporte" && git push -u origin conflicto/b

# Integrador
git checkout conflicto/a && git merge conflicto/b     # CONFLICT -> captura 1
git status                                            # captura
```

El archivo mostrará:

```
<<<<<<< HEAD
Titulo: Reporte de matricula 2026   (versión de A)
=======
Titulo: Informe de matricula 2026   (versión de B)
>>>>>>> conflicto/b
```

Se decide qué conservar, se borran las marcas `<<<<<<<`, `=======`, `>>>>>>>`:

```bash
git add docs/prueba-conflicto.txt
git commit -m "Resolver conflicto del titulo: se conserva la version de B"
git push                                              # captura 2 (archivo final)
```

Explica en el informe por qué se eligió esa versión.

## Actividad 6 — Seguridad, Actions, Projects, SSH

- `.gitignore`: ya excluye `node_modules/`, `.env`, llaves y temporales. Prueba: `echo "X=1" > .env && git status` → no debe aparecer. `npm run check:secretos` valida el repo.
- Si un secreto ya se subió: rotarlo, no basta con borrarlo (`git filter-repo`/BFG para limpiar historial).
- Actions: [.github/workflows/ci.yml](../.github/workflows/ci.yml) corre en cada PR. Evidencia: pestaña *Actions* con ejecución en verde (y una en rojo corregida, opcional).
- Projects: GitHub → Projects → *New project* (Board) → columnas **Pendiente, En proceso, En revisión, Terminado**. Agrega los Issues como tarjetas y muévelos durante el trabajo.
- SSH:

```bash
ssh-keygen -t ed25519 -C "tu@correo"        # ruta por defecto, pon passphrase
cat ~/.ssh/id_ed25519.pub                    # SOLO esta se copia a GitHub > Settings > SSH keys
ssh -T git@github.com                        # "Hi usuario! You've successfully authenticated"
git remote set-url origin git@github.com:<org>/gestion-academica-equipo.git
```

Nunca copies `id_ed25519` (sin `.pub`) a ningún lado.

## Actividad 7 — Entregables

- Informe en PDF: parte de [INFORME.md](INFORME.md) (completar con capturas).
- Presentación breve: portada, equipo/roles, arquitectura, ramas, PR/review, conflicto (antes/después), seguridad, Actions + Projects, demo, dificultades.
- Cada integrante prepara: qué commits hizo, qué comandos usó y por qué.
