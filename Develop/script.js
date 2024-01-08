// Assignment Code
var generateBtn = document.querySelector("#generate");
var xBtn = document.querySelectorAll(".x-button");
var background = document.getElementById("grey-out");

var passwordLength = document.getElementById("password-length");
var lengthBtn = document.getElementById("lengthButton");
var lengthInput = document.getElementById("lengthInput");
var lengthError = document.getElementById("length-error");

var characterTypes = document.getElementById("character-types");
var characterBtn = document.getElementById("characterButton");
var typeError = document.getElementById("character-type-error");

var popups = [passwordLength, characterTypes];

var charNum = 8;
var lowerCase = true;
var upperCase = true;
var numeric = true;
var specialCharacters = true;

var lowerCaseString = "abcdefghijklmnopqrstuvwxyz";
var capitalString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numsString = "0123456789"; 
var specialCharactersString = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword(){
  var totalString = "";
  if(lowerCase) totalString += lowerCaseString;
  if(upperCase) totalString += capitalString;
  if(numeric) totalString += numsString;
  if(specialCharacters) totalString += specialCharactersString;
  
  var possibleArray = totalString.split("");
  var outputString = "";
  var integer;
  for(var i = 0; i < charNum; i++){
    integer = Math.floor(Math.random() * possibleArray.length);
    outputString += possibleArray[integer];
  }

  return outputString;
}

function firstPopup(){
  background.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  passwordLength.style.display = "inline";
  passwordLength.style.pointerEvents = "auto";
}

function setLength(){

  if(lengthInput.value < 8 || lengthInput.value > 128){
    lengthError.classList.add("error-message");
    return;
  }

  charNum = lengthInput.value;

  passwordLength.style.display = "none";
  passwordLength.style.pointerEvents = "none";

  characterTypes.style.display = "inline";
  characterTypes.style.pointerEvents = "auto";
}

function setCharacterTypes(){
  lowerCase = document.getElementById("lowerCase").checked;
  upperCase = document.getElementById("upperCase").checked;
  numeric = document.getElementById("numeric").checked;
  specialCharacters = document.getElementById("specialCharacters").checked;

  if(!lowerCase && !upperCase && !numeric && !specialCharacters){
    typeError.classList.add("error-message");
    return;
  }

  exitPopups();
  writePassword();
}

function exitPopups(){
  background.style.backgroundColor = "rgba(0, 0, 0, 0)";
  for(var i = 0; i < popups.length; i++){
    popups[i].style.display = "none";
    popups[i].style.pointerEvents = "none";
  }
  lengthError.classList.remove("error-message");
  typeError.classList.remove("error-message");
}

// Add event listener to generate button
generateBtn.addEventListener("click", firstPopup);
xBtn.forEach(element => {
  element.addEventListener("click", exitPopups);
});

lengthBtn.addEventListener("click", setLength);
characterBtn.addEventListener("click", setCharacterTypes);