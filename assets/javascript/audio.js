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

/** EXTERNAL SOURCE: https://www.mezgrman.de/wwm-sounds **/
var GameAudio = {
   "AUDIO_INTRO" : "https://static.mezgrman.de/downloads/wwm/intro.mp3",
   "AUDIO_OUTRO" : "https://static.mezgrman.de/downloads/wwm/outro.mp3",
   "AUDIO_CANDIDATE_SELECTION_START" : "https://static.mezgrman.de/downloads/wwm/auswahlrunde_start.mp3",
   "AUDIO_CANDIDATE_SELECTION_LOOP": "https://static.mezgrman.de/downloads/wwm/auswahlrunde_loop.mp3",
   "AUDIO_CANDIDATE_SELECTION_SOLUTION" : "https://static.mezgrman.de/downloads/wwm/auswahlrunde_loesung.mp3",
   "AUDIO_CANDIDATE_SELECTION_RESULT"   : "https://static.mezgrman.de/downloads/wwm/auswahlrunde_ergebnisse.mp3",
   "AUDIO_CANDIDATE_SELECTION_ONE"    : "https://static.mezgrman.de/downloads/wwm/auswahlrunde_kandidatwahl_1.mp3",
   "AUDIO_CANDIDATE_SELECTION_TWO"    : "https://static.mezgrman.de/downloads/wwm/auswahlrunde_kandidatwahl_2.mp3",
   "AUDIO_CANDIDATE_SELECTION_ANS_A"    : "https://static.mezgrman.de/downloads/wwm/auswahlrunde_antwort_a.mp3",
   "AUDIO_CANDIDATE_SELECTION_ANS_B"    : "https://static.mezgrman.de/downloads/wwm/auswahlrunde_antwort_b.mp3",
   "AUDIO_CANDIDATE_SELECTION_ANS_C"    : "https://static.mezgrman.de/downloads/wwm/auswahlrunde_antwort_c.mp3",
   "AUDIO_CANDIDATE_SELECTION_ANS_D"    : "https://static.mezgrman.de/downloads/wwm/auswahlrunde_antwort_d.mp3",

   "AUDIO_RULES"   :   "https://static.mezgrman.de/downloads/wwm/spielregeln.mp3",
   "AUDIO_LEVEL_1" :   "https://static.mezgrman.de/downloads/wwm/stufe_1.mp3",
   "AUDIO_LEVEL_2" :   "https://static.mezgrman.de/downloads/wwm/stufe_2.mp3",
   "AUDIO_LEVEL_3" :   "https://static.mezgrman.de/downloads/wwm/stufe_3.mp3",

   "AUDIO_CORRECT_ANS_LEVEL1"  : "https://static.mezgrman.de/downloads/wwm/richtig_stufe_1.mp3",
   "AUDIO_CORRECT_ANS_LEVEL2"  : "https://static.mezgrman.de/downloads/wwm/richtig_stufe_2.mp3",
   "AUDIO_CORRECT_ANS_LEVEL3"  : "https://static.mezgrman.de/downloads/wwm/richtig_stufe_3.mp3",

   "AUDIO_WRONG_ANS" : "https://static.mezgrman.de/downloads/wwm/falsch.mp3",
   "AUDIO_WRONG_ANS_NO_MONEY" : "https://static.mezgrman.de/downloads/wwm/falsch_kein_gewinn.mp3",

   "AUDIO_AUDIANCE_LOOP" : "https://static.mezgrman.de/downloads/wwm/publikumsjoker_loop.mp3",
   "AUDIO_TELEPHONE_LOOP" : "https://static.mezgrman.de/downloads/wwm/telefonjoker_anruf.mp3",
   "AUDIO_5050"          : "https://static.mezgrman.de/downloads/wwm/50_50.mp3",


   "AUDIO_CANDIDATE_WIN"   : "https://static.mezgrman.de/downloads/wwm/richtig_millionenfrage.mp3",
   "AUDIO_CANDIDATE_LEAVE" : "https://static.mezgrman.de/downloads/wwm/spielende_kandidat_geht.mp3",
}

//** TODO: MOVE following functions inside GameAudio Object **/

function playAgain() {
  player.currentTime = 0;
  player.play();
}

function playAudio(src, loop) {
  player.setAttribute("src", src);
  player.play();
  if (loop) {
    player.addEventListener('ended',playAgain, false);
  } else {
    player.removeEventListener('ended',playAgain, false);
  }
}

function playOptionAudio(index) {
    var src = "";
    switch (index) {
      case 0:
        src = GameAudio.AUDIO_CANDIDATE_SELECTION_ANS_A;
        break;
      case 1:
        src = GameAudio.AUDIO_CANDIDATE_SELECTION_ANS_B;
        break;
      case 2:
        src = GameAudio.AUDIO_CANDIDATE_SELECTION_ANS_C;
      break;
      case 3:
        src = GameAudio.AUDIO_CANDIDATE_SELECTION_ANS_D;
        break;
      default:
    }
    playAudio(src, false);
}

function playWrongAnswerAudio() {
  var displayNextIn = 6000;
  var src = GameAudio.AUDIO_WRONG_ANS;
  playAudio(src, false);
  return displayNextIn;
}

function playCorrectAnswerAudio(level) {
  var src = "";
  var displayNextQuestionIn = 0;
  var reviewDelay = 3000;
  switch (level) {
    case 0:
      src = GameAudio.AUDIO_CORRECT_ANS_LEVEL1;
      displayNextQuestionIn = 1000;
      break;
    case 1:
      src = GameAudio.AUDIO_CORRECT_ANS_LEVEL2;
      displayNextQuestionIn = 4000;
      break;
    case 2:
      src = GameAudio.AUDIO_CORRECT_ANS_LEVEL3;
      displayNextQuestionIn = 4000;
    break;
    default:
  }
  playAudio(src, false);
  return (displayNextQuestionIn + reviewDelay);
}
