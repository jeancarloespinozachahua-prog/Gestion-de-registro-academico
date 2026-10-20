// Funciones puras de validación. Se usan en el navegador (window.Validaciones)
// y en las pruebas automáticas de Node (module.exports).
(function (raiz) {
    const soloLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;

    const Validaciones = {
        obligatorio: valor => String(valor ?? "").trim().length > 0,
        nombreValido: valor => soloLetras.test(String(valor).trim()) && String(valor).trim().length >= 2,
        codigoValido: valor => /^[A-Za-z0-9-]{2,12}$/.test(String(valor).trim()),
        dniValido: valor => /^\d{8}$/.test(String(valor).trim()),
        correoValido: valor => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(valor).trim()),
        enteroEnRango: (valor, min, max) => {
            const n = Number(valor);
            return String(valor).trim() !== "" && Number.isInteger(n) && n >= min && n <= max;
        }
    };

    if (typeof module !== "undefined" && module.exports) module.exports = Validaciones;
    else raiz.Validaciones = Validaciones;
})(typeof window !== "undefined" ? window : globalThis);
