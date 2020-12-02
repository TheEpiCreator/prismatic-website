const toggleTheme = () => {
    // Change themes if present

    switch(Cookies.get("theme")){
        case "dark":
            document.body.classList.add("light")
            document.body.classList.remove("dark")
            Cookies.set("theme", "light")
            break
        default:
            document.body.classList.add("dark")
            document.body.classList.remove("light")
            Cookies.set("theme", "dark")
    }
}