var viscousPos = 0
var canplay = true
// set scroll viscosity, 0-infinity, higher=>more viscous
const scrollViscosity = 10
// set fps
const fps = 60
const video = document.getElementById("scrollvid")

const body = document.body,
    html = document.documentElement

var height = (html.scrollHeight || body.scrollHeight) - window.innerHeight

scrollToVideo = () => {
    if (canplay) {
        let scrollPos = html.scrollTop || body.scrollTop
        // Apply viscosity to create a slowed-down smoother scroll
        viscousPos = (scrollPos + viscousPos * scrollViscosity) / (scrollViscosity + 1)
        // Apply scroll to video
        video.currentTime = viscousPos * video.duration / height
        console.log(height)
        console.log(scrollPos)
    }
}

startScroll = () => {
    setInterval(scrollToVideo, 1000 / fps)
}

window.onload = () => {
    setTimeout(startScroll, 1000)
}

window.onresize = () => {
    height = (html.scrollHeight || body.scrollHeight) - window.innerHeight
}