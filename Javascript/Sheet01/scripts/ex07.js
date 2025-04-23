console.log("---Ex07---");

const person = {name:"Pablo", age:28, city:"Málaga"};

console.log("El nombre de esta persona es, ", person.name);
console.log("La edad de esta persona es, ", person.age);
console.log("La ciudad de esta eprsona es, ", person.city);

console.log(person);

function describirPersona(obj) {
    console.log("Nombre: ", person.name, " Edad: ", person.age, " Ciudad: ", person.city);
}

describirPersona(person);