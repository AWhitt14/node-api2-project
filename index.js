const express = require("express")
const server = express()
const postRouter = require('./posts/post-router.js')

const port = 4000

server.use(express.json())
server.use(postRouter)


server.listen(port, () => {
	console.log(`Your looking at Usain Bolt, cause I'm running! http://localhost:${port}`)
})
