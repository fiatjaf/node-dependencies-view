const fs = require('fs')
const glob = require('glob')
const path = require('path')
const uniq = require('array-unique')
const precinct = require('precinct')
const resolve = require('resolve-from')

module.exports = function (base) {
  var rels = []
  let files = glob.sync(path.join(base, '**/*.{js,jsx,es,ts}'))
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    if (file.indexOf('/node_modules/') !== -1) continue
    rels = rels.concat(inspect(file, base))
  }
  return rels
}

function inspect (file, base) {
  var requires
  try {
    requires = uniq(precinct(fs.readFileSync(file, 'utf8')))
  } catch (e) {}

  var deps = []
  let filerel = '.' + file.slice(base.length)
  for (let i = 0; i < requires.length; i++) {
    let req = requires[i]
    if (req[0] !== '.') {
      deps.push([filerel, 'external', req])
    } else {
      let rel = '.' + resolve(path.dirname(file), req).slice(base.length)
      deps.push([filerel, 'local', rel])
    }
  }
  return deps
}
