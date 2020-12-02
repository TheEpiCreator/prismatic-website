// Read from cookie and apply theme

const defaultTheme = "light"

let currentTheme = Cookies.get("theme")

if (currentTheme) document.body.classList.add(Cookies.get("theme"))
else {
    Cookies.set("theme", defaultTheme)
    document.body.classList.add(defaultTheme)
}