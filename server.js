const express = require('express')

const graph = require('./graph')

const app = express()

app.get('/:user/:repo', (r, w) => {
  graph(r.params.user, r.params.repo)
    .then(svg => w.send(svg))
    .catch(console.log)
})

let port = process.env.PORT || 3000
app.listen(port, () => console.log('listening at :' + port))
