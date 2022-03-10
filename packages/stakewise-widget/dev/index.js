const fs = require('fs')
const path = require('path')
const express = require('express')


express()
  .use((req, res, next) => {
    if (req.path !== '/') {
      const filePath = path.resolve(__dirname, `./${req.path}`)

      if (fs.existsSync(filePath)) {
        const file = fs.readFileSync(filePath, 'utf8')

        res.send(file)
      }
      else {
        res.sendStatus(404)
      }

      return
    }

    next()
  })
  .use((req, res, next) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>StakeWise Widget Test</title>
        </head>
        <body>
          <script src="./build/client.js"></script>
          <script>
            widget.default.open()
          </script>
        </body>
      </html>
    `)
  })
  .listen(4001)

console.log('Server started at http://localhost:4001/')
