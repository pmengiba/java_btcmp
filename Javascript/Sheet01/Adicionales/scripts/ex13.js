
function randomNum() {
    const x = parseFloat(document.getElementById("c").value);
    const y = parseFloat(document.getElementById("d").value);

    const randomValue = Math.random() * (y - x) + x;

    let rResult = document.getElementById("randomResult");
    rResult = rResult.textContent = randomValue.toFixed(0);
}
