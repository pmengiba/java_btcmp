console.log("---Ex03---");


function positiveAndNegative(number) {
    if(number > 0)
    {
        console.log("El numero ", number, " es positivo");
    }
    else if (number < 0)
    {
        console.log("El numero ", number, " es negativo");
    } 
    else
    {
        console.log("El numero ", number, " es cero");
    }
}

positiveAndNegative(0);
positiveAndNegative(-42);
positiveAndNegative(50);