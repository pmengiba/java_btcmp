console.log("---Ex08---");

function revstr(str) {
    return str.split("").reverse().join("");    
}

let x = "hola mundo"
x = revstr(x);
console.log(x);

function strcount(str){
    let i = 0;
    let count = 0;
    let s = "aeiouAEIOU";
    while(i < str.length){
        if(s.includes(str[i]))
        {
            count++;
        }
        i++;
    }
    console.log(count);
}

strcount("Hola mundo");