/**
Copyright (c) 2011-2017 GitHub Inc.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


This application bundles the following third-party packages in accordance
with the following licenses:


Package: *
License: BSD
License Source: LICENSE
Source Text:

Copyright (c) Rajat Luthra (rajatluthra@gmail.com)
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

-->
<!--
  Author: Rajat Luthra
  Date:   May 28th, 2017.

  Purpose: Trivia Game.
-->
**/
function initProgressBar() {
  $("#question").html("<h4>Loading Game...</h4>");
  $("#question").append(createProgressBar("initGame", 0, 1, 30));
  var x = 1;
  var intervalHandler = setInterval(function () {
     if (++x === 31) {
         window.clearInterval(intervalHandler);
     } else {
       updateProgressBar("initGame", 0, x, 30);
     }
  }, 1000);
}

 var allowedTimeoutHandler = 0;
 function displayNextQuestion(gameLevel, questionCounter) {
   var level = gameQuestions.levels[gameLevel];
   allowedTimeoutHandler = setTimeout(playTimeout, level.timeout);
   //console.log(allowedTimeoutHandler + " new;");
   var selectedQuestion = level.questions[levelQuestionIndex];
   createQuestionDisplaySprite(selectedQuestion);
   playAudio(GameAudio.AUDIO_CANDIDATE_SELECTION_LOOP,true);
   startAllowedTimer(level.timeout);
   currentQuestion++;
 }

 function startAllowedTimer(levelTimeout) {
   stopwatch.init((levelTimeout / 1000));
   stopwatch.start();
 }

 function checkResults(userChoice) {
   if (userChoice == correctAnswer) {
     $("#id-"+userChoice+"-option").addClass("btn-success");
     var delay = playCorrectAnswerAudio(gameLevel);
       if (levelQuestionIndex < (gameQuestions.levels[gameLevel].questions.length-1)) {
         levelQuestionIndex++;
       } else {
         gameLevel++;
         levelQuestionIndex=0;
       }
      if (gameLevel<gameQuestions.levels.length) {
         setTimeout(displayNextQuestion.bind(null, gameLevel, questionCounter), delay);
       } else {
         setTimeout(handleGameEnd.bind(null, true), delay);
       }
   } else {
     var delay = playWrongAnswerAudio();
     if (userChoice<0) {
       $("#id-"+correctAnswer+"-option").addClass("btn-warning");
     } else {
       $("#id-"+userChoice+"-option").addClass("btn-danger");
       $("#id-"+correctAnswer+"-option").addClass("btn-success");
     }
     setTimeout(handleGameEnd.bind(null, false), delay);
   }
   stopwatch.stop();
 }

 function handleGameEnd(userWon) {
    switch (userWon) {
      case true:
          gameStatus("You Won!!! - 6/6.");
          playAudio(GameAudio.AUDIO_CANDIDATE_WIN,false);
          break;
        case false:
            gameStatus("You Lost!!! " + (currentQuestion-2)+"/6.");
            playAudio(GameAudio.AUDIO_CANDIDATE_LEAVE,false);
            break;
      default:
    }
 }

 function gameStatus(displayString) {
   $("#question").html("<h1>"+displayString+"</h1>");
   $("#option0").empty();
   $("#option1").empty();
   $("#option2").empty();
   $("#option3").empty();
 }

function playTimeout(levelTimeout) {
  playOptionAudio(GameAudio.AUDIO_WRONG_ANS);
  setTimeout(checkResults.bind(null, -1), 1000);
}

function clearGame() {
}

function createQuestionDisplaySprite(selectedQuestion) {
    correctAnswer = selectedQuestion.answer;
    $("#question").html(createSpritText("h1", currentQuestion, "Q"+currentQuestion + "). " + selectedQuestion.question.displayText));
    $("#option0").html(createOptionButton("option", 0,selectedQuestion.options[0].displayText));
    $("#option1").html(createOptionButton("option", 1,selectedQuestion.options[1].displayText));
    $("#option2").html(createOptionButton("option", 2,selectedQuestion.options[2].displayText));
    $("#option3").html(createOptionButton("option", 3,selectedQuestion.options[3].displayText));
}

function createSpritText(key, index, displayString) {
  var questionSprit = $("<h4>");
  questionSprit.attr("id","id-"+index+"-"+key);
  questionSprit.data("index", index);
  questionSprit.html(displayString);
  return questionSprit;
}

function createOptionButton(key, index, displayString) {
  var optionButton = $("<button>");
  optionButton.attr("type","button");
  optionButton.attr("id","id-"+index+"-"+key);
  optionButton.addClass("btn btn-primary");
  optionButton.addClass(key);
  optionButton.data("index", index);
  optionButton.data("toggle","button");
  optionButton.attr("aria-pressed","false");
  optionButton.attr("autocomplete","off");
  optionButton.html(displayString);
  return optionButton;
}

function createProgressBar(key, index, displayString, powerMAX) {
  var currValue =  (displayString / powerMAX)*100;
  var progress = $("<div>");
  progress.addClass("progress");
  var progressBar = $("<div>");
  progressBar.attr("id","id-"+index+"-"+key);
  progressBar.addClass("progress-bar");
  progressBar.attr("role","progressbar");
  progressBar.attr("style","width: "+currValue+"%;");
  progressBar.attr("aria-valuenow",displayString);
  progressBar.attr("aria-valuemin",0);
  progressBar.attr("aria-valuemax",30);
  progressBar.text(displayString);
  progress.append(progressBar);
  return progress;
}

function updateProgressBar(key, index, displayString, powerMAX) {
    var currValue =  (displayString / powerMAX)*100;
    var progressBar = $("#id-"+index+"-"+key);
    progressBar.attr("style","width: "+currValue+"%;");
    progressBar.attr("aria-valuenow",displayString);
    progressBar.text(Math.floor(currValue)+"%");
}
