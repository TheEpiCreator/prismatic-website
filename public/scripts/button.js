// get download button element
const button = document.getElementById("download")
// get sound element
const sound1 = document.getElementById("button-down")
const sound2 = document.getElementById("button-up")
// Get file loader element
const fileLoader = document.getElementById("file-loader")

// check if button loaded correctly
if (button) {
    // button pressed                         play press sound
    button.addEventListener("mousedown", e => sound1?.play())
    // Button released                                       play release sound (delayed)
    button.addEventListener("mouseup", e => {
        setTimeout(() => sound2?.play(), 180)
        setTimeout(() => {
            // Initiate download using file loading iframe
            fileLoader ? fileLoader.src = "/download/get" : fileLoader = null
        }, 230)
    })
    // Accessible version
    button.addEventListener("keydown", e => {
        if (e.key === "Enter") sound1?.play()
    })

    button.addEventListener("keyup", e => {
        if (e.key === "Enter") {
            sound2?.play()
            // Initiate download using file loading iframe
            fileLoader ? fileLoader.src = "/download/get" : fileLoader = null
        }
    })

}