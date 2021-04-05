import {createCanvas, setDrawingColor} from "./src/js/canvasUtil"
import {addKeydownListener} from "./src/js/playerInteraction"

createCanvas()
console.log("test")
var myCanvas = document.getElementsByTagName("canvas")
console.log(myCanvas[0].getContext("2d"))
var canvasContext = myCanvas[0].getContext("2d")
console.log(canvasContext)
setDrawingColor(canvasContext, "#3DC3B3")
canvasContext.fillRect(400,175,200,250)
setDrawingColor(canvasContext, "#ffffff")
canvasContext.fillRect(200,15,200,250)
addKeydownListener()