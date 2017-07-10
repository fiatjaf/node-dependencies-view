const express = require('express')

const graph = require('./graph')

const app = express()

app.get('/:user/:repo/**', (r, w) => {
  console.log(r.params)
  graph(r.params.user, r.params.repo, r.params[0])
    .then(svg => w.send(svg))
    .catch(console.log)
})

let port = process.env.PORT || 3000
app.listen(port, () => console.log('listening at :' + port))