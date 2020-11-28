// TODO: Replace mobile detection with NetworkInformation once browser support increases

const content = document.getElementById("content")

const vidFPS = 30
const otherFPS = 60
const otherFPSSlow = 15


// Mobile device detection
window.isMobile = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

// Apply video depending on whether mobile device check fails
if (!window.isMobile()) {

    // create video tag
    let videoContainer = new HTMLTag("video", { muted: "", preload: "", id: "scrollvid" }, content, [
        new HTMLTag("source", { src: "/videos/t2.mp4", type: "video/mp4" }).tag,
        new HTMLTag("source", { src: "/videos/t2.mov", type: "video/mov" }).tag,
    ]) // move to desired location
        .toPosition(1)
    var viscousPos = 0
    var canPlay = false
    // set scroll viscosity, 0-infinity, higher=>more viscous
    const scrollViscosity = 150
    const video = document.getElementById("scrollvid")

    const body = document.body,
        html = document.documentElement

    var height = (html.scrollHeight || body.scrollHeight) - window.innerHeight

    let scrollPos, newVideoPos
    const adjustedViscosity = scrollViscosity / vidFPS

    scrollToVideo = () => {
        if (canPlay) {
            scrollPos = html.scrollTop || body.scrollTop
            // Apply viscosity to create a slowed-down smoother scroll
            viscousPos = (scrollPos + viscousPos * adjustedViscosity) / (adjustedViscosity + 1)
            // Apply scroll to video
            newVideoPos = viscousPos * video.duration / height
            if (Math.abs(video.currentTime - newVideoPos) > 1 / vidFPS) video.currentTime = newVideoPos
            // TODO: play video if scrolling forward to improve fps

        }
    }

    // Description fade effects
    const descCards = document.getElementsByClassName("desc")

    window.setInterval(() => {
        // Loop all description cards
        for (let item of descCards) {
            // Determine scroll offset
            let bounding = item.getBoundingClientRect()
            bounding.mid = (bounding.top + bounding.bottom) / 2
            // Calculate opacity
            let newOpacity = (-Math.abs(Math.max(bounding.mid, 0) / (window.innerHeight || document.documentElement.clientHeight) - 0.5) + 0.5) * 2
            // Apply opacity
            if (newOpacity > 0) item.setAttribute("style", `opacity: ${newOpacity}`)
        }

    }, 1000 / otherFPS)

    // get elements
    const logoContainer = document.getElementById("main-image-container")
    const logoBG = document.getElementById("main-image-bg")
    const logo = document.getElementById("main-image")
    const borderWidth = 1;

    window.setInterval(() => {
        // Get scroll pos and derive desired transparency
        let scrollPos = html.scrollTop || body.scrollTop
        let amnt = Math.min(scrollPos / logoContainer.scrollHeight * -100 + 100, 100)
        let amntAdjust = [
            amnt * 1.2 + borderWidth,
            amnt * 1.8 + borderWidth,
            amnt * 1.2,
            amnt * 1.8,
            (-amnt + 100) * 10,
        ]
        // Add clip path w/ border offset
        logoContainer.setAttribute("style", `clip-path: polygon(0 0, 100% 0, 100% ${amntAdjust[0]}%, 0 ${amntAdjust[0]}%);`)
        // Add clip path
        logoBG.setAttribute("style", `clip-path: polygon(0 0, 100% 0, 100% ${amntAdjust[2]}%, 0 ${amntAdjust[2]}%); background-position-y: ${amntAdjust[4]}%`)
        logo.setAttribute("style", `clip-path: polygon(0 0, 100% 0, 100% ${amntAdjust[2]}%, 0 ${amntAdjust[2]}%);`)
        // Allow scrolling once user has scrolled
        if(amntAdjust[2] < 50) canPlay = true
        else canPlay = false
    }, 1000 / otherFPSSlow)

    startScroll = () => {
        setInterval(scrollToVideo, 1000 / vidFPS)
    }

    window.onload = () => {
        // start videoscroll script
        setTimeout(startScroll, 500)
        // set all card opacities to 0
        for (let item of descCards) item.setAttribute("style", `opacity: 0`)
    }

    window.onresize = () => {
        height = (html.scrollHeight || body.scrollHeight) - window.innerHeight
    }

    window.onscroll = () => {
        height = (html.scrollHeight || body.scrollHeight) - window.innerHeight
    }
} else {
    // Add background image if on mobile
    content.setAttribute("class", "background-demo-img")
}