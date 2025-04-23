document.addEventListener("DOMContentLoaded", () => {
    const inputA = document.getElementById("a");
    const inputB = document.getElementById("b");
    const result = document.getElementById("result");

    document.getElementById("sum").addEventListener("click", () => {
        const a = parseFloat(inputA.value);
        const b = parseFloat(inputB.value);
        result.textContent = `Resultado: ${a + b}`;
    });

    document.getElementById("min").addEventListener("click", () => {
        const a = parseFloat(inputA.value);
        const b = parseFloat(inputB.value);
        result.textContent = `Resultado: ${a - b}`;
    });

    document.getElementById("mul").addEventListener("click", () => {
        const a = parseFloat(inputA.value);
        const b = parseFloat(inputB.value);
        result.textContent = `Resultado: ${a * b}`;
    });

    document.getElementById("div").addEventListener("click", () => {
        const a = parseFloat(inputA.value);
        const b = parseFloat(inputB.value);
        result.textContent = b !== 0 ? `Resultado: ${a / b}` : "Error";
    });
});