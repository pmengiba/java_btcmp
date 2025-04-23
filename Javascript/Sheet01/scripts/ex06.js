console.log("---Ex06---");

let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

let i = 0;
while(dias.length > i){
    console.log(dias[i]);
    i++;
}

function sumaArreglos(numbers) {
    let i = 0;
    let res = 0;
    while (numbers.length > i) {
        res += numbers[i];
        i++;
    }
    console.log("El resultado es: ", res)
}

let numeros = [1, 3, 4, 5, 23, 34];

sumaArreglos(numeros);
