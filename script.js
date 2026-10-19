
const formulario = document.getElementById("formularioEstudiante");
const lista = document.getElementById("listaEstudiantes");
const total = document.getElementById("total");
const mensaje = document.getElementById("mensaje");

let estudiantes = JSON.parse(
    localStorage.getItem("estudiantes") || "[]"
);

function guardar() {
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

function mostrarEstudiantes() {
    lista.replaceChildren();

    estudiantes.forEach((estudiante, indice) => {
        const fila = document.createElement("tr");

        [
            estudiante.nombres,
            estudiante.apellidos,
            estudiante.correo,
            estudiante.dni,
            estudiante.edad,
            estudiante.carrera
        ].forEach(dato => {
            const celda = document.createElement("td");
            celda.textContent = dato ?? "";
            fila.appendChild(celda);
        });

        const celdaAccion = document.createElement("td");
        const boton = document.createElement("button");

        boton.textContent = "Eliminar";
        boton.className = "eliminar";
        boton.type = "button";

        boton.addEventListener("click", () => {
            estudiantes.splice(indice, 1);
            guardar();
            mostrarEstudiantes();
            mensaje.textContent = "Estudiante eliminado.";
        });

        celdaAccion.appendChild(boton);
        fila.appendChild(celdaAccion);
        lista.appendChild(fila);
    });

    total.textContent = estudiantes.length;
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const estudiante = {
        nombres: document.getElementById("nombres").value.trim(),
        apellidos: document.getElementById("apellidos").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        dni: document.getElementById("dni").value.trim(),
        edad: Number(document.getElementById("edad").value),
        carrera: document.getElementById("carrera").value
    };

    if (!/^\d{8}$/.test(estudiante.dni)) {
        mensaje.textContent = "El DNI debe tener 8 números.";
        return;
    }

    if (estudiantes.some(e => e.dni === estudiante.dni)) {
        mensaje.textContent = "Este DNI ya está registrado.";
        return;
    }

    estudiantes.push(estudiante);
    guardar();
    mostrarEstudiantes();
    formulario.reset();

    mensaje.textContent = "Estudiante registrado correctamente.";
});

mostrarEstudiantes();
