// Guess the word one letter at a time.
// Each player is only allowed to guess
// wrong three times.

// Prompt Player 1 to enter a word to guess and store
// as a variable.

window.onload = function () {

  var guessedbox = document.getElementById("guessed");
  var badbox = document.getElementById("badguess");

  var wordinput = document.getElementById("secretword");
  var submit = document.getElementById("submit");
  var message = document.getElementById("message");

  var word = "";

  // Create another array to store good guesses
  var secret = [];
  var badguesses = [];
  // Create a variable to store the number of bad guesses
  var strikes = 0;

  submit.onclick = function () 
  {
    
    if (strikes == 5 || (secret.length != 0 && secret.indexOf("_") < 0)) {
      //start over
      wordinput.removeAttribute("disabled");
      wordinput.removeAttribute("maxlength");
      wordinput.value = "";
      submit.innerHTML = "Submit";
      strikes = 0;
      secret = [];
      badguesses = [];
      guessedbox.innerHTML = "";
      badbox.innerHTML = "";
      message.innerHTML = "Enter your secret word";

    }
    else if (secret.length == 0 && badguesses.length == 0) //then it is first time ==> Submitting a word
    {
      word = wordinput.value;
      message.innerHTML = "Player 2, Guess a letter.";
      wordinput.setAttribute("maxlength", "1");
      wordinput.value = "";
      // Fill this array with placeholders for guessing

      for (i = 0; i < word.length; i++) { secret.push("_"); }
      guessedbox.innerHTML = secret.join(" ");
    }

    // Start a loop that continues as long as the person has
    // not guessed wrong three times, or all of the letters have
    // been guessed.

    else {
      if (strikes < 5 && secret.indexOf("_") >= 0) //Submitting a letter
      {

        // Prompt Player 2 to guess a letter and store as
        // a variable.

        var letter = wordinput.value;
        wordinput.value = "";

        // If the letter does not exist in the word,
        // add it to the bad guesses.

        if (word.indexOf(letter) < 0) {
          // add a strike
          strikes++;
          message.innerHTML = "Bad guess!";

          if(!badguesses.includes(letter)) badguesses.push(letter);
          badbox.innerHTML = badguesses.join(" ");

          // If the letter exists in the word, we need to
          // add it to the good guesses array
        } else {
          for (i = 0; i < word.length; i++) {
            // Each time the guess letter is found, we
            // add it as a good guess in the same spot
            if (word[i] === letter) {
              secret[i] = letter;
            }
          }
          guessedbox.innerHTML = secret.join(" ");
        }
      }
      if (!(strikes < 5 && secret.indexOf("_") >= 0)) {
        // Once the player has exited the loop, congratulate
        // them on a win, or tell them they have lost and show
        // the secret word.

        if (strikes === 5) {
          message.innerHTML = "Sorry, please play again!";
        } else {
          message.innerHTML = "Congratulations on your win!";
        }
        message.innerHTML += "\n The secret word was " + word;
        submit.innerHTML = "Start Over";
        wordinput.setAttribute("disabled","true");
      }
    }
  }
}