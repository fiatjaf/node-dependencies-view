const download = require('co-download')
const decompress = require('decompress')
const mkdirp = require('mkdirp')
const rmr = require('rmr')

const dep = require('./dependency-tree')

module.exports = function (user, repo) {
  let tmpfolder = '/tmp/' + user + '/' + repo
  let base = tmpfolder + '/' + repo + '-master'
  mkdirp.sync(tmpfolder)

  return download('https://github.com/' + user + '/' + repo + '/archive/master.zip', '/tmp/master.zip')
  .then(filepath => decompress(filepath, tmpfolder))
  .then(() => {
    let rels = dep(base)

    var dot = 'digraph main {\n'
    for (let i = 0; i < rels.length; i++) {
      let [from, kind, to] = rels[i]
      dot += `  "${from}"->"${to}"` + '\n'

      dot += `  "${from}" [URL="https://github.com/${user}/${repo}/blob/master/${from.slice(2)}"]` + '\n'
      if (kind === 'external') {
        dot += `  "${to}" [shape="box", URL="https://npmjs.com/package/${to}"]` + '\n'
      } else if (kind === 'local') {
        dot += `  "${to}" [URL="https://github.com/${user}/${repo}/blob/master/${to.slice(2)}"]` + '\n'
      }
    }
    dot += '}'
    rmr.sync(tmpfolder)
    return dot
  })
  .catch(console.log)
}
