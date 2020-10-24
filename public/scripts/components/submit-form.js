function submit(form) {
    let packet = {
        name: form.name.value,
        url: form.url.value,
    }

    fetch('/r', {
        method: "POST",
        body: JSON.stringify(packet)
    })
        .then(alert("Added url"))
}