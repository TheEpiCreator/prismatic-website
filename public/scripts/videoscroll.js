var viscousPos = 0
// set scroll viscosity, higher values = faster
const scrollViscosity = 0.02
// set fps
const fps = 3
const video = document.getElementById("scrollvid")

const body = document.body,
    html = document.documentElement

const height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight)

scrollToVideo = () => {
    let scrollPos = document.documentElement.scrollTop || document.body.scrollTop
    // Apply viscosity to create a slowed-down smoother scroll
    viscousPos += (window.pageYOffset - viscousPos) * scrollViscosity
    video.currentTime = viscousPos * video.duration / height
}

startScroll = () => {
    //setInterval(scrollToVideo, 1000 / fps)
}