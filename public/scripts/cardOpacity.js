const docCards = document.getElementsByClassName("card")

window.setInterval(() => {
    for (let item of docCards) {
        let bounding = item.getBoundingClientRect()
        if (bounding.bottom < (window.innerHeight || document.documentElement.clientHeight) || bounding.top < 150) {
            item.classList.add("in-frame")
        }
    }
}, 1000 / 15)