import {createCanvas} from "./src/js/canvasUtil"

createCanvas()
console.log("test")
var myCanvas = document.getElementsByTagName("canvas")
console.log(myCanvas[0].getContext("2d"))
var canvasContext = myCanvas[0].getContext("2d")
console.log(canvasContext)
canvasContext.fillStyle = "#3DC3B3"
canvasContext.fillRect(400,175,200,250)