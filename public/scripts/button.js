// get download button element
const button = document.getElementById("download")
// get sound element
const sound1 = document.getElementById("button-down")
const sound2 = document.getElementById("button-up")

// check if button loaded correctly
if (button) {
    // button pressed                         play press sound
    button.addEventListener("mousedown", e => sound1?.play())
    // Button released                                       play release sound (delayed)
    button.addEventListener("mouseup", e => setTimeout(() => sound2?.play(), 180))
    // Initiate download using file loading iframe
    button.addEventListener("mouseup", e => setTimeout(() => {
        // Initiate download
        let fileLoader = document.getElementById("file-loader")
        fileLoader? fileLoader.src = "/download/get": fileLoader = null
    }, 230))
}