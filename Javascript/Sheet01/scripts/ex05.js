console.log("---Ex05---");

function saludo(name) {
    console.log("Hola, ", name);
}

saludo("Pablo");

function max(a, b){
    (a > b) ? console.log(a, "es mayor que ", b) : console.log(b, "es mayor que ", a);  
}

max(12, 15);
max(3, 16);
max(22, 2);
max(-1, -23);
max(-12, 12);