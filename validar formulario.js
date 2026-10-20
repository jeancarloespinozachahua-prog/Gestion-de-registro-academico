// Validaciones adicionales para los formularios de estudiantes y cursos.
// Las restricciones requeridas, pattern, min y max del HTML siguen activas.
(() => {
    const V = window.Validaciones;
    const reglas = {
        codigoEstudiante: valor => V.codigoValido(valor)
            ? "" : "El código debe tener de 2 a 12 letras, números o guiones.",
        nombres: valor => V.nombreValido(valor)
            ? "" : "Escribe al menos 2 letras; no uses números ni símbolos.",
        apellidos: valor => V.nombreValido(valor)
            ? "" : "Escribe al menos 2 letras; no uses números ni símbolos.",
        correo: valor => V.correoValido(valor)
            ? "" : "Escribe un correo válido, por ejemplo nombre@ejemplo.com.",
        dni: valor => V.dniValido(valor)
            ? "" : "El DNI debe contener exactamente 8 números.",
        edad: valor => V.enteroEnRango(valor, 1, 120)
            ? "" : "La edad debe ser un número entero entre 1 y 120.",
        codigoCurso: valor => V.codigoValido(valor)
            ? "" : "El código debe tener de 2 a 12 letras, números o guiones.",
        nombreCurso: valor => valor.trim().length >= 2
            ? "" : "Escribe el nombre del curso (mínimo 2 caracteres).",
        creditosCurso: valor => V.enteroEnRango(valor, 1, 20)
            ? "" : "Los créditos deben ser un número entero entre 1 y 20.",
        docenteCurso: valor => V.nombreValido(valor)
            ? "" : "Escribe el nombre del docente usando letras y espacios."
    };

    function validarCampo(campo) {
        const regla = reglas[campo.id];
        const error = regla ? regla(campo.value) : "";
        campo.setCustomValidity(error);
        return error === "";
    }

    Object.keys(reglas).forEach(id => {
        const campo = document.getElementById(id);
        if (!campo) return;

        campo.addEventListener("input", () => validarCampo(campo));
        campo.addEventListener("blur", () => {
            campo.value = campo.value.trim();
            validarCampo(campo);
        });
    });

    ["formularioEstudiante", "formularioCurso"].forEach(id => {
        const formulario = document.getElementById(id);
        if (!formulario) return;

        formulario.addEventListener("submit", evento => {
            const campos = [...formulario.querySelectorAll("input, select")];
            campos.forEach(campo => validarCampo(campo));

            const primerInvalido = campos.find(campo => !campo.checkValidity());
            if (primerInvalido) {
                evento.preventDefault();
                primerInvalido.reportValidity();
            }
        });

        formulario.addEventListener("reset", () => {
            // El evento reset ocurre antes de que el navegador limpie los campos.
            setTimeout(() => {
                formulario.querySelectorAll("input, select").forEach(campo => campo.setCustomValidity(""));
            }, 0);
        });
    });
})();
