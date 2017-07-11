const express = require('express')
const md5 = require('md5')
const Viz = require('viz.js')

const graph = require('./graph')

const app = express()

app.get('/:user/:repo', (r, w) => {
  var format = 'svg'
  var repo = r.params.repo
  let rsplitted = r.params.repo.split('.')
  if (rsplitted.length > 1) {
    let f = rsplitted[rsplitted.length - 1]
    if (f === 'dot' || f === 'svg') {
      format = f
      repo = rsplitted.slice(0, -1).join('.')
    }
  }

  graph(r.params.user, repo)
    .then(dot => {
      if (format === 'svg') {
        let ratio = r.query.ratio || '0.5'
        let lines = dot.split('\n')
        dot = [lines[0], `ratio="${ratio}"`].concat(lines.slice(1)).join('\n')

        w.append('Cache-Control', 'no-cache')
        w.append('ETag', md5(dot))
        w.send(Viz(dot))
      } else if (format === 'dot') {
        w.send(dot)
      } else {
        w.send('this will never happen.')
      }
    })
    .catch(console.log)
})

let port = process.env.PORT || 3000
app.listen(port, () => console.log('listening at :' + port))
