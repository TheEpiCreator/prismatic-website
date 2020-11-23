var viscousPos = 0
var canplay = true
// set scroll viscosity, 0-infinity, higher=>more viscous
const scrollViscosity = 10
// set fps
const fps = 60
const video = document.getElementById("scrollvid")

const body = document.body,
    html = document.documentElement

const height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight)

scrollToVideo = () => {
    if (canplay) {
        let scrollPos = document.documentElement.scrollTop || document.body.scrollTop
        // Apply viscosity to create a slowed-down smoother scroll
        viscousPos = (scrollPos + viscousPos * scrollViscosity) / (scrollViscosity + 1)
        // Apply scroll to video
        video.currentTime = viscousPos * video.duration / height
    }
}

startScroll = () => {
    setInterval(scrollToVideo, 1000 / fps)
}

window.onload = () => {
    setTimeout(startScroll, 1000)
}