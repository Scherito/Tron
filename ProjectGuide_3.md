



# Tetris Project Guide

## Table of Content




1. Intro
2. Game Screen
2.1. The Canvas
2.1.1 Description
2.1.2 Task
2.2. Receiving Input
2.2.1 Description
2.2.2 Task
2.3 Rendering Tetris Blocks
2.4 Making a Tetris Block move
2.5 Game Loop
2.6 Keeping Score
2.7 The Orchestrator
3. Home Screen
3.1 Play Button
3.2 Settings
4. Useful JS information
4.1 What is a class
4.2 Importing/Exporting objects between files
4.3 Testing functions
4.4 Creating HTML-Elements in Java

## 1. Intro

Goal of the project is to create a simple Browser-based Tetris game using pure (Framework-free) Javascript and taking advantage of the HTML-Canvas. The following document provides some guidance on how to progress through the project. It will also provide some ideas and inspirations on how to tackle some of the things that will be needed in order to set this project up.

The game in its first iteration will be consisting of two pages/steps: A 'Home Screen' and a 'Game Screen'. Both pages will be discussed in separate chapters in this document. 

NOTE: We will address providing a clean structure for the code in later parts of the project. At the start it is best to not worry too much about writing code as clean as possible. Instead, it is better to get a first working state (in Software Development this is generally referred to as a 'Proof Of Concept' or POC) that can be built upon and improved step by step.

## 2. Game Screen
The Game Screen (will in the following be referred to as GS) in its first version contains only the Canvas on which the gameplay takes place. Later versions will implement elements that allow interactions with a settings menu.

 ### 2.1 The Canvas
 The gameplay will be taking place on an [HTMLCanvasElement](https://www.w3schools.com/html/html5_canvas.asp). 

#### 2.1.1 Description
 To interact with/ draw on the canvas we need to retrieve the context object of the canvas:
 ```  
var myCanvas = document.getElementById('myCanvasID') // provide the correct ID here
var canvasContext = myCanvas.getContext("2d")

// NOTE: we use the argument '2d'. This is because
// a Canvas can also be used to render 3d graphics,
// so we have to specify that we want to draw in 2d.
```

After retrieving the context of the Canvas and specifying that we want to draw in '2d mode', we can use the context to draw through various provided functions, the most simple being: 
```
canvasContext.fillStyle = "#000000" // We have to specify a color to draw in
canvasContext.fillRect(x,y,width,height) 
// starts at the provided (x,y) coordinates. 
// Fills a box of size (width, height) with the color that you chose
```

NOTE: We had to set a color to draw in. The color is provided through a Hex-code, #000000 stands for the color Black. [Different Hex-codes can be explored on this page](https://htmlcolorcodes.com/).

It is advised to do some exploring of using different colors and calling the fill functions with different numbers to see the effects. It is also advisable to try around with other drawing functions that can be found on the tutorial page for the Canvas given above.

#### 2.1.2 Task

We want to keep all our interactions with the Canvas in one place. For that, add a new file `canvasUtil.js` to the project structure. Our new project Structure can be seen below:

```
project
│   README.md
│   package.json
|	.gitignore
│
└───dist
│   │   index.html
│   
└───src
    └───js
│       │   canvasUtil.js						++++
```

1. Create a function that creates a Canvas Element (Info on creating HTML elements in Javascript can be found in section 4.4)
1.a The function should give the Canvas an ID by which it can be uniquely identified
1.b The function should give the Canvas a height and a width
2. Create a function that gets the canvas Element by the ID we gave it in 1. The function should get the 2d drawing context of the canvas and return it.
3. Create a function that takes a Canvas Context and a Hex-code as input. The function should set the drawing color of the Canvas to the Hex-code that was provided.

### Receiving Input
To make a game playable it is of course important to be able to take input from the player. We will be exploring how to listen to the player clicking keys and react to it.

#### Description 
As previously explored, every interaction that happens with a website is treated as an Event. Clicking keys is no different. This means we can add a listener onto our page that waits for the player to click a key and act upon it. We can achieve that as follows: 
```
document.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  // Here we can check which key was clicked by using the keyCode and
  // act accordingly
})
```
NOTE: We have to differentiate which key was clicked through the keyCode. Which keyCode belongs to which key can be explored on [this page](https://keycode.info/).

It is advisable to add a keyListener on to the page and try around for a bit using the console.

#### Task

We want to keep the functions for interacting with the player in a separate file called `playerInteraction.js`. The new file structure can be seen below:

```
project
│   README.md
│   package.json
|	.gitignore
│
└───dist
│   │   index.html
│   
└───src
    └───js
│       │   canvasUtil.js						
|		|	playerInteraction.js				++++
```

1. create a function that adds a listener, which listens to `keydown` events to the document. The listener should
1.a Check if an arrow key was clicked
1.b depending on which key was clicked, add a log to the console (e.g. "The left arrow key was clicked")

### Rendering Tetris Blocks
Before we can have the player interact with the flow of the game we need to provide some basic functionalities to it. The most fundamental being: How do we go about rendering the different Tetris-block shapes on our Canvas?

#### Description

