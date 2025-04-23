let randomValue = Math.floor(Math.random() * 100) + 1; 
console.log("Número aleatorio generado:", randomValue);

function checkerNum() {
    const input = parseInt(document.getElementById("e").value); 
    let rResult = document.getElementById("quizREsult");

    if (input === randomValue) {
        console.log("¡Acertaste!");
    } else if (input > randomValue) {
        console.log("Tu número es más grande");
        quizResult.textValue
    } else if (input < randomValue) {
        console.log("Tu número es más chico");
    } else {
        console.log("No es un numero")
    }
}