// these lines get references to the elements we will need
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

// these set the default values
var charNum = 8;
var lowerCase = true;
var upperCase = true;
var numeric = true;
var specialCharacters = true;

// these are the strings of characters we will create our password from
var lowerCaseString = "abcdefghijklmnopqrstuvwxyz";
var capitalString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numsString = "0123456789"; 
var specialCharactersString = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

// these variables are used for animation
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

// this is the primary function of the script that creates the password
function generatePassword(){
  //totalString is the string that will include all allowed characters
  var totalString = "";
  if(lowerCase) totalString += lowerCaseString;
  if(upperCase) totalString += capitalString;
  if(numeric) totalString += numsString;
  if(specialCharacters) totalString += specialCharactersString;
  
  //this splits totalString into an array that we can pull characters from
  var possibleArray = totalString.split("");
  var outputString = "";
  for(var i = 0; i < charNum; i++){
    outputString += getRandomCharacter(possibleArray);
  }

  outputString = ensureOneOfEach(outputString);

  return outputString;
}

// this function creates a random integer and selects a character at that index
function getRandomCharacter(possibleArray){
    var integer = Math.floor(Math.random() * possibleArray.length);
    return possibleArray[integer];
}

// this function ensures there is at least one of each type of selected character by replacing a character in the password with one character from each type
function ensureOneOfEach(password){
  //usedIndicies keeps track of the indicies used in this function so we can guarantee we won't overwrite the same character twice
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

//this function finds a random integer that we have not already used in the ensureOneOfEach function
function findInteger(usedIndicies){
  var randomInteger = Math.floor(Math.random() * charNum);
  while(usedIndicies.includes(randomInteger)){
    randomInteger = Math.floor(Math.random() * charNum);
  }
  usedIndicies.push(randomInteger);
  return randomInteger;
}

//This function replaces a character with one from the given array
function replaceCharacter(originalString, index, newCharacter){
  return originalString.substring(0, index) + newCharacter + originalString.substring(index + 1);
}

// causes the first popup to appear
function firstPopup(){
  background.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  passwordLength.style.display = "inline";
  passwordLength.style.pointerEvents = "auto";
}

// this function accepts or rejects a password length and calls the next popup if the chosen length is valid
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

// this function accepts or rejects the chosen character types and closes all popups if at least one type is chosen
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

// closes all popups
function exitPopups(){
  background.style.backgroundColor = "rgba(0, 0, 0, 0)";
  for(var i = 0; i < popups.length; i++){
    popups[i].style.display = "none";
    popups[i].style.pointerEvents = "none";
  }
  lengthError.classList.remove("error-message");
  typeError.classList.remove("error-message");
}

// causes the instruction message to turn red and have a pulsing animation
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

// Add event listeners to buttons
generateBtn.addEventListener("click", firstPopup);
xBtn.forEach(element => {
  element.addEventListener("click", exitPopups);
});
lengthBtn.addEventListener("click", setLength);
characterBtn.addEventListener("click", setCharacterTypes);