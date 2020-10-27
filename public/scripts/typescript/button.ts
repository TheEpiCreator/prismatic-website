const button = document.getElementById("download")

const sound1 = document.getElementById("button-down")
const sound2 = document.getElementById("button-up")

if (button) {
    button.addEventListener("mousedown", e => sound1?.play())
    button.addEventListener("mouseup", e => setTimeout(() => sound2?.play(), 180))
    button.addEventListener("mouseup", e => setTimeout(() => {
        // Initiate download
        let fileLoader = document.getElementById("file-loader")
        fileLoader? fileLoader.src = "/download/get": fileLoader = null
    }, 230))
}