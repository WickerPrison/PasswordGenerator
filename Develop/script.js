// Assignment Code
var generateBtn = document.querySelector("#generate");
var xBtn = document.querySelectorAll(".x-button");
var background = document.getElementById("grey-out");

var passwordLength = document.getElementById("password-length");
var lengthBtn = document.getElementById("lengthButton");
var lengthInput = document.getElementById("lengthInput");

var popups = [passwordLength];

var charNum = 8;

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword(){
  background.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  passwordLength.style.display = "inline";
  passwordLength.style.pointerEvents = "auto";
}

function setLength(){
  charNum = lengthInput.value;
  console.log(charNum);
}

function exitPopups(){
  background.style.backgroundColor = "rgba(0, 0, 0, 0)";
  for(var i = 0; i < popups.length; i++){
    popups[i].style.display = "none";
    popups[i].style.pointerEvents = "none";
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
xBtn.forEach(element => {
  element.addEventListener("click", exitPopups)
});

lengthBtn.addEventListener("click", setLength)