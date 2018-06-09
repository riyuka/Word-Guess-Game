window.onload = function () {
    
    var displayWord = document.getElementById('displayWord');
    var remainingLive = document.getElementById('remaining');
    var guessedLetter = document.getElementById('guessedLetter');
    var displayNewGame = document.getElementById('newGame');
    var displayWins = document.getElementById('wins');  
    var displayLosts = document.getElementById('losts');
    var displayStart = document.getElementById('start');
    var wordData = ['apple', 'pear', 'apricot',  'peach',  'grape',  'banana', 'pineapple', 'plum', 'watermelon', 'orange', 'lemon', 'mango', 'strawberry', 'medlar', 'mulberry', 'nectarine', 'cherry', 'pomegranate', 'fig', 'tangerine', 'persimmon', 'walnut', 'hazelnut', 'peanut', 'chestnut', 'currant', 'coconut', 'bilberry', 'blackberry', 'blueberry', 'avocado', 'blackcurrant', 'bloodorange', 'citron', 'grapefruit', 'damson', 'almond', 'nutmeg', 'papaya', 'guava', 'pistachio', 'raspberry', 'soursop'];
    var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var Wins = 0;
    displayWins.innerHTML = Wins;
    var Losts = 0;
    displayLosts.innerHTML = Losts;
    var sucessSound = document.getElementById('success');
    var failSound = document.getElementById('failed');
   
    function newGame() {
        var remaining = 9;
        remainingLive.innerHTML = remaining;

        var userGuess = "";
        var GuessArr = [];
        guessedLetter.innerHTML = GuessArr;

        var dash = 0;
        var letter = 0;
        var choseWord = wordData[Math.floor(Math.random()*wordData.length)];
        console.log(choseWord);

        var singleLetter = choseWord.split('');
        console.log(singleLetter);
        var blankLetter = singleLetter.map(function(blank) {
                if (blank != " ") {
                    return "_";
                } 
            });

        var dashDisplay = blankLetter.join('');
        displayWord.innerHTML = dashDisplay; 
        
        document.onkeyup = function inputKey() {
            var pressKey = event.key;
            userGuess = pressKey.toLowerCase();
            displayStart.style.visibility = 'hidden';

            if (alphabet.indexOf(userGuess) !== -1 && GuessArr.indexOf(userGuess) === -1) {
                GuessArr.push(userGuess);
                guessedLetter.innerHTML = GuessArr;
                console.log(GuessArr);
              
                for (var i = 0; i < singleLetter.length; i++) {
                    if (userGuess == singleLetter[i].toLowerCase()) {
                        blankLetter[i] = userGuess;
                        displayWord.innerHTML = blankLetter.join('').toUpperCase();
                        letter++;
                        console.log(letter);

                        if (letter + dash === choseWord.length) {
                            Wins++;
                            displayWins.innerHTML = Wins;
                            sucessSound.play();
                            remainingLive.innerHTML = "YOU WON";
                            displayNewGame.innerHTML = 'PRESS "ENTER" TO CONTINUE';
                            displayNewGame.style.visibility = "visible";
                            document.onkeyup = false;
                            document.onkeyup = function() {
                                if (event.key === "Enter") {
                                    newGame();
                                    displayNewGame.style.visibility = "hidden";
                                    displayStart.style.visibility = "visible";
                                }        
                            } 
                        } 
                    } 
                }
            
                if (choseWord.indexOf(userGuess) === -1) {
                    remaining--; 
                    remainingLive.innerHTML = remaining;
                    if (remaining <= 0) {
                        Losts++;
                        displayLosts.innerHTML = Losts;
                        failSound.play();
                        remainingLive.innerHTML = "YOU LOST";
                        displayNewGame.innerHTML = 'PRESS "ENTER" TO CONTINUE';
                        displayNewGame.style.visibility = "visible";
                        document.onkeyup = false;
                        document.onkeyup = function() {
                            if (event.key === "Enter") {
                                newGame();
                                displayNewGame.style.visibility = "hidden";
                                displayStart.style.visibility = "visible";
                            }   
                        }   
                    }    
                }  
            } 
        }   
    } 
    newGame();
}