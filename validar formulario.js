// Validaciones adicionales para los formularios de estudiantes y cursos.
// Las restricciones requeridas, pattern, min y max del HTML siguen activas.
(() => {
    const soloLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;
    const reglas = {
        nombres: valor => soloLetras.test(valor.trim()) && valor.trim().length >= 2
            ? "" : "Escribe al menos 2 letras; no uses números ni símbolos.",
        apellidos: valor => soloLetras.test(valor.trim()) && valor.trim().length >= 2
            ? "" : "Escribe al menos 2 letras; no uses números ni símbolos.",
        correo: valor => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim())
            ? "" : "Escribe un correo válido, por ejemplo nombre@ejemplo.com.",
        dni: valor => /^\d{8}$/.test(valor.trim())
            ? "" : "El DNI debe contener exactamente 8 números.",
        edad: valor => Number.isInteger(Number(valor)) && Number(valor) >= 1 && Number(valor) <= 120
            ? "" : "La edad debe ser un número entero entre 1 y 120.",
        codigoCurso: valor => /^[A-Za-z0-9-]{2,12}$/.test(valor.trim())
            ? "" : "El código debe tener de 2 a 12 letras, números o guiones.",
        nombreCurso: valor => valor.trim().length >= 2
            ? "" : "Escribe el nombre del curso (mínimo 2 caracteres).",
        creditosCurso: valor => Number.isInteger(Number(valor)) && Number(valor) >= 1 && Number(valor) <= 20
            ? "" : "Los créditos deben ser un número entero entre 1 y 20.",
        docenteCurso: valor => soloLetras.test(valor.trim()) && valor.trim().length >= 2
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
