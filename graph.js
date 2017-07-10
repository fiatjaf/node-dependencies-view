const fs = require('fs')
const Viz = require('viz.js')
const download = require('co-download')
const decompress = require('decompress')
const mkdirp = require('mkdirp')
const dep = require('dependency-tree')
const relative = require('relative')

var cache = {}
var inc = 0
var base

module.exports = function (user, repo, file = 'index.js') {
  let folder = '/tmp/' + user + '/' + repo
  base = folder + '/' + repo + '-master'
  mkdirp.sync(folder)

  return download('https://github.com/' + user + '/' + repo + '/archive/master.zip', '/tmp/master.zip')
  .then(filepath => decompress(filepath, folder))
  .then(() => {  
    let res = dep({
      filename: base + '/' + file,
      directory: base
    })
    var dot = {dot: 'digraph main {\n'}
    recurse(dot, res)
    dot.dot += '}'
    return Viz(dot.dot)
  })
  .catch(console.log)
}

function nodecache (dot, path) {
  let p = './' + relative(base, path)
  var id
  if (p in cache) {
    id = cache[p]
  } else {
    id = inc++
    cache[p] = id
    dot.dot += '  f' + id + '[label="' + p + '"]\n'
  }
  return [id, p]
}

function relcache (dot, from, to) {
  let def = 'f' + from + '->f' + to
  if (!(def in cache)) {
    dot.dot += '  ' + def + '\n'
  }
}

function recurse (dot, paths) {
  for (let path in paths) {
    let [id, p] = nodecache(dot, path)
    
    if (typeof paths[path] === 'object') {
      Object.keys(paths[path]).forEach(dep => {
        let [did] = nodecache(dot, dep)
        relcache(dot, id, did)
      })
      recurse(dot, paths[path])
    }
  }
}