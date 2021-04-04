export function createCanvas(id, width, height){
    var canvasElement = document.createElement("canvas")
    canvasElement.id = id
    canvasElement.width = width
    canvasElement.height = height 
    document.body.appendChild(canvasElement)
}

export function getCanvasContext(id){
    var canvasElement = document.getElementById(id)
    var canvasContext = canvasElement.getContext("2d")
    return canvasContext
}