const test = require("node:test");
const assert = require("node:assert");
const V = require("../validaciones.js");

test("código de estudiante/curso: 2 a 12 letras, números o guiones", () => {
    assert.ok(V.codigoValido("EST001"));
    assert.ok(V.codigoValido("SIS-101"));
    assert.ok(!V.codigoValido("A"));
    assert.ok(!V.codigoValido("CODIGO_MUY_LARGO_123"));
    assert.ok(!V.codigoValido("<script>"));
});

test("nombres: solo letras y espacios, mínimo 2", () => {
    assert.ok(V.nombreValido("María José"));
    assert.ok(!V.nombreValido("J0se"));
    assert.ok(!V.nombreValido(" "));
});

test("campos obligatorios", () => {
    assert.ok(V.obligatorio("x"));
    assert.ok(!V.obligatorio("   "));
    assert.ok(!V.obligatorio(undefined));
});

test("DNI: exactamente 8 dígitos", () => {
    assert.ok(V.dniValido("12345678"));
    assert.ok(!V.dniValido("1234567"));
    assert.ok(!V.dniValido("1234567a"));
});

test("enteros en rango (edad y créditos)", () => {
    assert.ok(V.enteroEnRango("18", 1, 120));
    assert.ok(!V.enteroEnRango("0", 1, 120));
    assert.ok(!V.enteroEnRango("2.5", 1, 20));
    assert.ok(!V.enteroEnRango("", 1, 20));
});

test("correo válido", () => {
    assert.ok(V.correoValido("a@b.com"));
    assert.ok(!V.correoValido("a@b"));
});
