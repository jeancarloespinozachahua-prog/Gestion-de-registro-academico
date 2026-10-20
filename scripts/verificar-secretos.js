// Verificación de seguridad: falla si hay archivos sensibles versionados
// o texto que parezca una llave privada / token.
const { execSync } = require("node:child_process");
const fs = require("node:fs");

const archivos = execSync("git ls-files", { encoding: "utf8" }).split("\n").filter(Boolean);
const prohibidos = [/(^|\/)\.env(\..*)?$/, /\.pem$/, /id_(rsa|ed25519)$/, /\.key$/, /node_modules\//];
const patrones = [
    /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
    /ghp_[A-Za-z0-9]{30,}/,
    /github_pat_[A-Za-z0-9_]{30,}/,
    /AKIA[0-9A-Z]{16}/
];

const problemas = [];
for (const archivo of archivos) {
    if (prohibidos.some(r => r.test(archivo))) problemas.push(`Archivo sensible versionado: ${archivo}`);
    if (!fs.existsSync(archivo) || /\.(png|jpg|jpeg|pdf)$/i.test(archivo)) continue;
    // Este script contiene los patrones; se omite a sí mismo.
    if (archivo === "scripts/verificar-secretos.js") continue;
    const texto = fs.readFileSync(archivo, "utf8");
    if (patrones.some(r => r.test(texto))) problemas.push(`Posible secreto en: ${archivo}`);
}

if (problemas.length) {
    console.error(problemas.join("\n"));
    process.exit(1);
}
console.log(`OK: ${archivos.length} archivos revisados, sin secretos.`);
