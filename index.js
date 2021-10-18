const express = require('express')
const app = express()
const port = process.env.PORT || 3000

if (!process.env.NODE_ENV) {
	console.error('environment not set, exiting')
	process.exit(1)	
}


app.listen(port, () =>{
  console.log(`express listening on port ${port}`)
})