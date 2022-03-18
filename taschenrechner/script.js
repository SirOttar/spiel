var aktuelleZahl = "";
var opera = "";
var zahl1 = "";

function drueckeZahl(zahl) {
  var stringZahl = zahl.toString();
  aktuelleZahl += stringZahl;
  var ergebnisFeld = document.getElementById("ergebnis");
  ergebnisFeld.innerHTML = aktuelleZahl;
}

function addition(number1, number2) {
  return number1 + number2;
}

function subtraktion(number1, number2) {
  return number1 - number2;
}

function multiplikation(number1, number2) {
  return number1 * number2;
}

function division(number1, number2) {
  return number1 / number2;
}

function setOperation(operation) {
  opera = operation;
  zahl1 = parseInt(aktuelleZahl);
  aktuelleZahl = "";
}

function gleichheitszeichen() {
  var ergebnis = 0;
  var zahl2 = parseInt(aktuelleZahl);
  switch (opera) {
    case "+":
      ergebnis = addition(zahl1, zahl2);
      break;
    case "-":
      ergebnis = subtraktion(zahl1, zahl2);
      break;
    case "*":
      ergebnis = multiplikation(zahl1, zahl2);
      break;
    case "/":
      ergebnis = division(zahl1, zahl2);
      break;
    default:
      return;
  }
  aktuelleZahl = ergebnis;
  var ergebnisFeld = document.getElementById("ergebnis");
  ergebnisFeld.innerHTML = aktuelleZahl;
  opera = "";
}

function del() {
  var ergebnisFeld = document.getElementById("ergebnis");
  ergebnisFeld.innerHTML = "";
  opera = "";
  aktuelleZahl = "";
  zahl1 = "";
}
