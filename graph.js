const Viz = require('viz.js')
const download = require('co-download')
const decompress = require('decompress')
const mkdirp = require('mkdirp')
const rmr = require('rmr')

const dep = require('./dependency-tree')

var cache = {}
var base

module.exports = function (user, repo) {
  let tmpfolder = '/tmp/' + user + '/' + repo
  base = tmpfolder + '/' + repo + '-master'
  mkdirp.sync(tmpfolder)

  return download('https://github.com/' + user + '/' + repo + '/archive/master.zip', '/tmp/master.zip')
  .then(filepath => decompress(filepath, tmpfolder))
  .then(() => {
    let rels = dep(base)

    var dot = 'digraph main {\n'
    dot += '  size="400,800"\n'
    dot += '  ratio="compress"\n'
    for (let i = 0; i < rels.length; i++) {
      let [from, kind, to] = rels[i]
      dot += `  "${from}"->"${to}"` + '\n'

      if (kind === 'external' && !(to in cache)) {
        dot += `  "${to}" [shape="box"]` + '\n'
      }
    }
    dot += '}'
    console.log(dot)

    rmr.sync(tmpfolder)

    return Viz(dot)
  })
  .catch(console.log)
}
