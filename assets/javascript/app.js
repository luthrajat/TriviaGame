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
var gameLevel = 0;
var levelQuestionIndex = 0;
var questionCounter = 0;
var timerHandler = 0;
var correctAnswer = 0;

function DisplayObject(index, displayText, image, video){
    this.index = index;
    this.displayText = displayText;
    this.image = image;
    this.video = video;
}

var gameQuestions = {
   "levels": [
    {
        "timeout" : 30000,
        "win"   : new DisplayObject(0, "1000","",""),
        "lose"   : new DisplayObject(0, "0","",""),
        "questions" : [
                {
                    "question" : new DisplayObject(0, "Inside which HTML element do we put the JavaScript?","",""),
                    "options" : [new DisplayObject(0, "&lt;script&gt;","",""),
                                  new DisplayObject(1, " &lt;js&gt;","",""),
                                  new DisplayObject(2, "&lt;javascript&gt;","",""),
                                  new DisplayObject(3, "&lt;scripting&gt;","","")],
                    "answer"  : 0
                },
                {
                  "question" : new DisplayObject(0, "What is the correct JavaScript syntax to change the content of the HTML element below?<br/>&lt;p id='demo'&gt;This is a demonstration.&lt;/p&gt;","",""),
                  "options" : [new DisplayObject(0, "$(\"p\").html(\"Hello World!\");","",""),
                                new DisplayObject(1, "$(\"#demo\").html(\"Hello World!\");","",""),
                                new DisplayObject(2, "#demo.html(\"Hello World!\");","",""),
                                new DisplayObject(3, "$(\".p\").html(\"Hello World!\");","","")],
                  "answer"  : 1
                }
        ]
    },
    {
        "timeout" : 20000,
        "win"   : new DisplayObject(0, "5000","",""),
        "lose"   : new DisplayObject(0, "2000","",""),
        "questions" : [
                {
                  "question" : new DisplayObject(0, "Where is the correct place to insert a JavaScript?","",""),
                  "options" : [new DisplayObject(0, "The &lt;head&gt; section","",""),
                                new DisplayObject(1, "The &lt;body&gt; section","",""),
                                new DisplayObject(2, "Both the &lt;head&gt; and the &lt;body&gt;","",""),
                                new DisplayObject(3, "The &lt;title&gt; section","","")],
                    "answer"  : 2
                },
                {
                  "question" : new DisplayObject(0, "What is the correct syntax for referring to an external script called \"xxx.js\"?","",""),
                  "options" : [new DisplayObject(0, "&lt;script link=\"xxx.js\"&gt;","",""),
                                new DisplayObject(1, "&lt;script name=\"xxx.js\"&gt;","",""),
                                new DisplayObject(2, "&lt;script href=\"xxx.js\"&gt;","",""),
                                new DisplayObject(3, "&lt;script src=\"xxx.js\"&gt;","","")],
                  "answer"  : 3
                }
        ]
    },
    {
        "timeout" : 10000,
        "win"   : new DisplayObject(0, "10000","",""),
        "lose"   : new DisplayObject(0, "5000","",""),
        "questions" : [
                {
                  "question" : new DisplayObject(0, "The external JavaScript file must contain the &lt;script&gt; tag.","",""),
                  "options" : [new DisplayObject(0, "False","",""),
                                new DisplayObject(1, "Maybe","",""),
                                new DisplayObject(2, "True","",""),
                                new DisplayObject(3, "Optional","","")],
                    "answer"  : 0
                },
                {
                  "question" : new DisplayObject(0, "How do you write \"Hello World\" in an alert box?","",""),
                  "options" : [new DisplayObject(0, "msgBox(\"Hello World\");","",""),
                                new DisplayObject(1, "alertBox(\"Hello World\");","",""),
                                new DisplayObject(2, "alert(\"Hello World\");","",""),
                                new DisplayObject(3, "msg(\"Hello World\");","","")],
                  "answer"  : 2
                }
        ]
    }]
};
