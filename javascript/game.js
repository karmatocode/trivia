exports = typeof window !== "undefined" && window !== null ? window : global;
exports.Game = function() {
  var players          = [];
  var places           = [];
  var purses           = [];
  var inPenaltyBox     = [];

  var popQuestions     = [];
  var scienceQuestions = [];
  var sportsQuestions  = [];
  var rockQuestions    = [];

  var currentPlayer    = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function(){
    return !(purses[currentPlayer] == 6)
  };

  var currentCategory = function(){
    switch(places[currentPlayer]){
      case 0:
      case 4:
      case 8:
          return 'Pop';
      break;

      case 1:
      case 5:
      case 9:
          return 'Science';
      break;

      case 2:
      case 6:
      case 10:
          return 'Sports';
      break;

      default:
        return 'Rock';
      break;
    }
    
  };

  for(var i = 0; i < 50; i++){
    popQuestions.push("Pop Question "+i);
    scienceQuestions.push("Science Question "+i);
    sportsQuestions.push("Sports Question "+i);
    rockQuestions.push("Rock Question "+i);
  };

  this.isPlayable = function(howManyPlayers){
    return howManyPlayers >= 2;
  };

  this.add = function(playerName){
    players.push(playerName);
    var len = players.length;
    places[len - 1] = 0;
    purses[len - 1] = 0;
    inPenaltyBox[len - 1] = false;
    console.log(playerName + " was added");
    console.log("They are player number " + len);
    return true;
  };

  var askQuestion = function(){
    if(currentCategory() == 'Pop')
      console.log(popQuestions.shift());
      
    if(currentCategory() == 'Science')
      console.log(scienceQuestions.shift());

    if(currentCategory() == 'Sports')
      console.log(sportsQuestions.shift());
      
    if(currentCategory() == 'Rock')
      console.log(rockQuestions.shift());
  };

  this.roll = function(roll){
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if(inPenaltyBox[currentPlayer]){
      if(roll % 2 != 0){
        isGettingOutOfPenaltyBox = true;

        console.log(players[currentPlayer] + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if(places[currentPlayer] > 11){
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        console.log("The category is " + currentCategory());
        askQuestion();
      }else{
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    }else{

      places[currentPlayer] = places[currentPlayer] + roll;
      if(places[currentPlayer] > 11){
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function(){
    var winner;
    if(inPenaltyBox[currentPlayer]){
      if(isGettingOutOfPenaltyBox){
        console.log('Answer was correct!');
        purses[currentPlayer]++;
        console.log(players[currentPlayer] + " now has " +
                    purses[currentPlayer]  + " Gold Coins.");

        winner = didPlayerWin();
        currentPlayer++;
        if(currentPlayer == players.length)
          currentPlayer = 0;

        return winner;
      }else{
        currentPlayer++;
        if(currentPlayer == players.length)
          currentPlayer = 0;
        return true;
      }



    }else{

      console.log("Answer was correct!");

      purses[currentPlayer]++;
      console.log(players[currentPlayer] + " now has " +
                  purses[currentPlayer]  + " Gold Coins.");

      winner = didPlayerWin();

      currentPlayer++;
      if(currentPlayer == players.length)
        currentPlayer = 0;

      return winner;
    }
  };

  this.wrongAnswer = function(){
		console.log('Question was incorrectly answered');
		console.log(players[currentPlayer] + " was sent to the penalty box");
		inPenaltyBox[currentPlayer] = true;

    currentPlayer++;
    if(currentPlayer == players.length)
      currentPlayer = 0;
		return true;
  };
};

var notAWinner = false;
var game = new Game();
game.add('Chet');
game.add('Pat');
game.add('Sue');

do{
  game.roll(Math.floor(Math.random()*6) + 1);
  if(Math.floor(Math.random()*10) == 7){
    notAWinner = game.wrongAnswer();
  }else{
    notAWinner = game.wasCorrectlyAnswered();
  }

}while(notAWinner);