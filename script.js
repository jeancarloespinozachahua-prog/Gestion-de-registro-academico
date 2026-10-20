
const formulario = document.getElementById("formularioEstudiante");
const lista = document.getElementById("listaEstudiantes");
const total = document.getElementById("total");
const mensaje = document.getElementById("mensaje");
const resumenEstudiantes = document.getElementById("resumenEstudiantes");

function cargarEstudiantes() {
    try {
        const guardados = JSON.parse(localStorage.getItem("estudiantes") || "[]");
        if (!Array.isArray(guardados)) return [];

        return guardados.filter(estudiante =>
            estudiante && typeof estudiante === "object" &&
            typeof estudiante.nombres === "string" &&
            typeof estudiante.apellidos === "string" &&
            typeof estudiante.dni === "string" && /^\d{8}$/.test(estudiante.dni) &&
            Number.isInteger(estudiante.edad) &&
            typeof estudiante.carrera === "string"
        );
    } catch {
        return [];
    }
}

let estudiantes = cargarEstudiantes();

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
    if (resumenEstudiantes) resumenEstudiantes.textContent = estudiantes.length;
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const estudiante = {
        nombres: document.getElementById("nombres").value.trim(),
        apellidos: document.getElementById("apellidos").value.trim(),
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

const enlacesMenu = document.querySelectorAll(".enlace-menu");
const vistas = document.querySelectorAll(".vista");
const nombreVista = document.getElementById("nombreVista");
const barraLateral = document.getElementById("barraLateral");
const botonMenu = document.getElementById("botonMenu");

enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        const destino = enlace.dataset.vista;

        enlacesMenu.forEach(item => {
            item.classList.toggle("activo", item === enlace);
            if (item === enlace) {
                item.setAttribute("aria-current", "page");
            } else {
                item.removeAttribute("aria-current");
            }
        });

        vistas.forEach(vista => {
            vista.classList.toggle("activa", vista.id === `vista-${destino}`);
        });

        nombreVista.textContent = enlace.textContent.trim();
        barraLateral.classList.remove("abierta");
        botonMenu.setAttribute("aria-expanded", "false");
    });
});

botonMenu.addEventListener("click", () => {
    const abierta = barraLateral.classList.toggle("abierta");
    botonMenu.setAttribute("aria-expanded", String(abierta));
});
