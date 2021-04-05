import { CanvasRenderingContext2D } from "canvas"

/**
 * @description creates a canvas and attaches it to the body
 * @param {string} id - the ID of the canvas 
 * @param {number} width - the width of the canvas
 * @param {number} height - the height of the canvas
 */
export function createCanvas(id, width, height){
    var canvasElement = document.createElement("canvas")
    canvasElement.id = id
    canvasElement.width = width
    canvasElement.height = height 
    document.body.appendChild(canvasElement)
}

/**
 * @description Takes an ID and searches for a Canvas with the ID.
 *  Returns the Context of the Canvas.
 * @param {string} id - The ID of the canvas to search for.
 * @returns {CanvasRenderingContext2D} The drawing context of the canvas.
 */
export function getCanvasContext(id){
    var canvasElement = document.getElementById(id)
    var canvasContext = canvasElement.getContext("2d")
    return canvasContext
}

/**
 * @description Tell the canvas what colour to draw in. 
 * @param {CanvasRenderingContext2D} canvasContext - the drawing
 *  context of the canvas.
 * @param {string} hexCode - the colour we want to draw with.
 */
export function setDrawingColor(canvasContext, hexCode){
    canvasContext.fillStyle = hexCode
}