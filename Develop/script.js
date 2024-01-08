// Assignment Code
var generateBtn = document.querySelector("#generate");
var xBtn = document.querySelectorAll(".x-button");
var background = document.getElementById("grey-out");

var passwordLength = document.getElementById("password-length");
var lengthBtn = document.getElementById("lengthButton");
var lengthInput = document.getElementById("lengthInput");

var characterTypes = document.getElementById("character-types");
var characterBtn = document.getElementById("characterButton");

var popups = [passwordLength, characterTypes];

var charNum = 8;
var lowerCase = true;
var upperCase = true;
var numeric = true;
var specialCharacters = true;

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword(){
  
}

function firstPopup(){
  background.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  passwordLength.style.display = "inline";
  passwordLength.style.pointerEvents = "auto";
}

function setLength(){
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

  exitPopups();
  writePassword();
}

function exitPopups(){
  background.style.backgroundColor = "rgba(0, 0, 0, 0)";
  for(var i = 0; i < popups.length; i++){
    popups[i].style.display = "none";
    popups[i].style.pointerEvents = "none";
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", firstPopup);
xBtn.forEach(element => {
  element.addEventListener("click", exitPopups);
});

lengthBtn.addEventListener("click", setLength);
characterBtn.addEventListener("click", setCharacterTypes);