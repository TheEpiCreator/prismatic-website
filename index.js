// Import all
const http = require('http')
const https = require('https')
const express = require('express')
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

// Init express
const app = express()

// Init ejs
app.set('view engine', 'ejs')
console.log('Initialized express & EJS')

// Track servers
var servers = []

// Configure file directories
const dir = __dirname
const views = path.join(dir, 'views')
const public = path.join(dir, 'public')
const private = path.join(dir, 'private')
const svg = path.join(private, 'svg')

// Load startup files (settings)
const settings = JSON.parse(fs.readFileSync(path.join(private, 'settings.json')))
// ^  set var   |parse json|read file      |create filepath    |read from ^
console.log('Loaded settings')

// Preload site serving settings
const siteInfo = JSON.parse(fs.readFileSync(path.join(private, 'siteInfo.json')))
console.log('Loaded template data')
const redirects = JSON.parse(fs.readFileSync(path.join(private, 'redirects.json')))
console.log('Loaded redirect index')
var icons = {}

console.group(`Loading SVG data from ${svg}`)
fs.readdirSync(svg).forEach(file => {
    // Load and parse file, add it to object
    icons[file] = fs.readFileSync(path.join(svg, file)).toString()
    console.log(`Loaded ${file}`)
})
console.groupEnd()
console.log('Loaded SVG data')


// Configure basic middleman
app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

// Serve static for items in public
app.use(express.static(public))

app.get('/download/get', function (req, res) {
    const file = `${__dirname}/private/client/test.zip`
    res.download(file) // Set disposition and send it.
})

// All major content
app.get('*', (req, res) => {
    // Test if page ends with /, redirect to ending without /
    let match = req.originalUrl.match(/(.*)\/$/m)
    if (!match || req.originalUrl.match(/^\/$/m)) {
        // Test if page is registered in siteInfo
        if (siteInfo.pages[req.originalUrl]) {
            res.render(path.join(views, 'index.ejs'), {
                siteInfo,
                title: siteInfo.site.title,
                nav: siteInfo.site.navbar,
                page: siteInfo.pages[req.originalUrl],
                def: siteInfo.pages["*"],
                content: siteInfo.pages[req.originalUrl].content || siteInfo.pages["*"].content,
                comp: siteInfo.components,
                icons,
            })
        } else if (redirects[req.originalUrl]) {
            res.redirect(siteInfo.redirect[req.originalUrl])
        } else {
            // Send 404 page
            res.render(path.join(views, 'index.ejs'), {
                siteInfo,
                title: siteInfo.site.title,
                nav: siteInfo.site.navbar,
                page: siteInfo.pages['/404'],
                def: siteInfo.pages["*"],
                content: siteInfo.pages['/404'].content || siteInfo.pages["*"].content,
                comp: siteInfo.components,
                required: siteInfo.pages['/404'].requrire || siteInfo.pages["*"].require,
                icons,
            })
        }
    } else {
        // If page ends with '/'
        res.redirect(match[1])
    }
})

// Init servers
settings.servers.forEach(server => {
    switch (server.type) {
        case 'http':
            servers.push(http.createServer(app)
                .listen(server.port, () => console.log(`${server.type} initiated on port ${server.port}`)))
            break
        case 'https':
            // Check for necessary config & if site is in production
            if (settings.production && server.options && server.options.key_dir && server.options.cert_dir && server.options.ca_dir) {
                // Format object containing https certificate files
                let httpsOptions = {
                    key: fs.readFileSync(server.options.key_dir, 'utf-8'),
                    cert: fs.readFileSync(server.options.cert_dir, 'utf-8'),
                    ca: fs.readFileSync(server.options.ca_dir, 'utf-8'),
                }
                // Create https server
                servers.push(https.createServer(httpsOptions, app)
                    .listen(server.port, () => console.log(`${server.type} initiated on port ${server.port}`)))
            }
    }
})