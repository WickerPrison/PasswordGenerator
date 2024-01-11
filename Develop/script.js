// Assignment Code
const generateBtn = document.querySelector("#generate");
const xBtn = document.querySelectorAll(".x-button");
const background = document.getElementById("grey-out");

const passwordLength = document.getElementById("password-length");
const lengthBtn = document.getElementById("lengthButton");
const lengthInput = document.getElementById("lengthInput");
const lengthError = document.getElementById("length-error");

const characterTypes = document.getElementById("character-types");
const characterBtn = document.getElementById("characterButton");
const typeError = document.getElementById("character-type-error");

const popups = [passwordLength, characterTypes];

var charNum = 8;
var lowerCase = true;
var upperCase = true;
var numeric = true;
var specialCharacters = true;

var lowerCaseString = "abcdefghijklmnopqrstuvwxyz";
var capitalString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numsString = "0123456789"; 
var specialCharactersString = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

var pulse;
var isGrowing = true;
var minSize = getComputedStyle(document.documentElement).getPropertyValue('--min-size');
minSize = minSize.substring(0, minSize.length - 2);
var maxSize = getComputedStyle(document.documentElement).getPropertyValue('--max-size');
maxSize = maxSize.substring(0, maxSize.length - 2);
var messageSize = 18;
var message;

// Write password to the #password input
function writePassword() {
  var finalPassword = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = finalPassword;

}

function generatePassword(){
  var totalString = "";
  if(lowerCase) totalString += lowerCaseString;
  if(upperCase) totalString += capitalString;
  if(numeric) totalString += numsString;
  if(specialCharacters) totalString += specialCharactersString;
  
  var possibleArray = totalString.split("");
  var outputString = "";
  for(var i = 0; i < charNum; i++){
    outputString += getRandomCharacter(possibleArray);
  }

  outputString = ensureOneOfEach(outputString);

  return outputString;
}

function getRandomCharacter(possibleArray){
    var integer = Math.floor(Math.random() * possibleArray.length);
    return possibleArray[integer];
}

function ensureOneOfEach(password){
  var usedIndicies = [];
  if(lowerCase){
    password = replaceCharacter(password, findInteger(usedIndicies), getRandomCharacter(lowerCaseString.split("")));
  }

  if(upperCase){
    password = replaceCharacter(password,findInteger(usedIndicies), getRandomCharacter(capitalString.split("")));
  }

  if(numeric){
    password = replaceCharacter(password,findInteger(usedIndicies), getRandomCharacter(numsString.split("")));
  }

  if(specialCharacters){
    password = replaceCharacter(password, findInteger(usedIndicies), getRandomCharacter(specialCharactersString.split("")));
  }

  return password;
}

function findInteger(usedIndicies){
  var randomInteger = Math.floor(Math.random() * charNum);
  while(usedIndicies.includes(randomInteger)){
    randomInteger = Math.floor(Math.random() * charNum);
  }
  usedIndicies.push(randomInteger);
  return randomInteger;
}

function replaceCharacter(originalString, index, newCharacter){
  return originalString.substring(0, index) + newCharacter + originalString.substring(index + 1);
}

function firstPopup(){
  background.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  passwordLength.style.display = "inline";
  passwordLength.style.pointerEvents = "auto";
}

function setLength(){

  if(lengthInput.value < 8 || lengthInput.value > 128){
    lengthError.classList.add("error-message");
    message = lengthError;
    errorPulse();
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
    message = typeError;
    errorPulse();
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

function errorPulse(){
  clearInterval(pulse);
  isGrowing = true;
  pulse = setInterval(pulseAnimation, 15);
}

function pulseAnimation(){
  if(isGrowing && messageSize < maxSize){
    messageSize+= 0.2;
    if(messageSize >= maxSize) isGrowing = false;
  }
  else if(!isGrowing && messageSize > minSize){
    messageSize-=0.2;
    if(messageSize < minSize){
      isGrowing = true;
      clearInterval(pulse);
    }
  }
  message.style.fontSize = messageSize + "px";
}

// Add event listener to generate button
generateBtn.addEventListener("click", firstPopup);
xBtn.forEach(element => {
  element.addEventListener("click", exitPopups);
});

lengthBtn.addEventListener("click", setLength);
characterBtn.addEventListener("click", setCharacterTypes);