const formularioCurso = document.getElementById("formularioCurso");
const listaCursos = document.getElementById("listaCursos");
const totalCursos = document.getElementById("totalCursos");
const mensajeCurso = document.getElementById("mensajeCurso");

let cursos = JSON.parse(localStorage.getItem("cursos") || "[]");

function guardarCursos() {
    localStorage.setItem("cursos", JSON.stringify(cursos));
}

function mostrarCursos() {
    listaCursos.replaceChildren();

    cursos.forEach((curso, indice) => {
        const fila = document.createElement("tr");

        [curso.codigo, curso.nombre, curso.creditos, curso.docente]
            .forEach(dato => {
                const celda = document.createElement("td");
                celda.textContent = dato;
                fila.appendChild(celda);
            });

        const celdaAccion = document.createElement("td");
        const boton = document.createElement("button");

        boton.textContent = "Eliminar";
        boton.className = "eliminar";
        boton.type = "button";
        boton.addEventListener("click", () => {
            cursos.splice(indice, 1);
            guardarCursos();
            mostrarCursos();
            mensajeCurso.textContent = "Curso eliminado.";
        });

        celdaAccion.appendChild(boton);
        fila.appendChild(celdaAccion);
        listaCursos.appendChild(fila);
    });

    totalCursos.textContent = cursos.length;
}

formularioCurso.addEventListener("submit", evento => {
    evento.preventDefault();

    const curso = {
        codigo: document.getElementById("codigoCurso").value.trim().toUpperCase(),
        nombre: document.getElementById("nombreCurso").value.trim(),
        creditos: Number(document.getElementById("creditosCurso").value),
        docente: document.getElementById("docenteCurso").value.trim()
    };

    if (cursos.some(registrado => registrado.codigo === curso.codigo)) {
        mensajeCurso.textContent = "Este código de curso ya está registrado.";
        return;
    }

    cursos.push(curso);
    guardarCursos();
    mostrarCursos();
    formularioCurso.reset();
    mensajeCurso.textContent = "Curso registrado correctamente.";
});

mostrarCursos();
