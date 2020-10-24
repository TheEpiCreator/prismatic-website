// Import all
const http = require('http')
const https = require('https')
const express = require('express')
const fs = require('fs')
const path = require('path')

// Init express
const app = express()

// Track servers
var servers = []

// Configure file directories
const dir = __dirname
const views = path.join(dir, 'views')
const public = path.join(dir, 'public')
const private = path.join(dir, 'private')

// Load startup files (settings)
const settings = JSON.parse(fs.readFileSync(path.join(private, 'settings.json')))
// ^  set var   |parse json|read file      |create filepath    |read from ^

// Configure basic middleman
app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

// Serve static for items in public
app.use(express.static(public))

// Main website (first and only page, aside from 404)
app.get('/', (req, res) => {
    res.sendFile(path.join(views, 'index.html'))
})

// 404 page
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(views, '404.html'))
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