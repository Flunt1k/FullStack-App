const app = require('./app')
const port = process.env.PORT || 5000


const server = app.listen(port, () => console.log(`Server has been started on ${port}`))

process.on('SIGTERM', function(){
    server.close(() => {
        process.exit(0)
    })
})

process.on('uncaughtException', function(){
    server.close(() => {
        process.exit(0)
    })
})