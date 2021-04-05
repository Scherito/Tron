/**
 * @description start listening to the game input.
 */
export function addKeydownListener() {
    document.addEventListener("keydown", function (event) {
        if (event.isComposing || event.keyCode === 229) {
            return
        }
        if (event.keyCode === 67) {
            console.log("zurückhalten")
        } else if (event.keyCode === 32) {
            console.log("runterlassen")
        } else if (event.keyCode === 40) {
            console.log("nach unten bewegen")
        } else if (event.keyCode === 37) {
            console.log("nach links bewegen")
        } else if (event.keyCode === 39) {
            console.log("nach rechts bewegen")
        } else if (event.keyCode === 38) {
            console.log("blöcke drehen")
        }
    })
}