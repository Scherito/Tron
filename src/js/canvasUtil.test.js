import {createCanvas, getCanvasContext} from "./canvasUtil"

describe("Canvas Utilities", function () {
    it("creates a Canvas", function () {
        expect(document.getElementsByTagName("canvas").length).toBe(0)
        createCanvas("test", 100, 300)
        var canvasElements = document.getElementsByTagName("canvas")
        expect(canvasElements.length).toBe(1)
        expect(canvasElements[0].id).toBe("test")
        expect(canvasElements[0].width).toBe(100)
        expect(canvasElements[0].height).toBe(300)
    }) 

    it("gets the drawing context of the canvas", function () {
        createCanvas("hello", 100, 400)
        var canvasElement = document.getElementById("hello");
        var drawingElement = getCanvasContext("hello")
        expect(drawingElement).toBe(canvasElement.getContext("2d"))
    })
})