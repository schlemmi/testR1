//

var rows = 9
var cols = 9
var grid = []
var row = 0  // the current position
var col = 0
var depth = 0
var nPos = 0  // n of positions examined
var nCell = 0 // n of cells compared
var nSol = 0

//---------------------------
exports.fun1 = function fun1(x) {
  //console.log('fun1',x)
  depth = 0; row = 0; col = 0; nPos = 0; nCell = 0; nSol = 0;
  console.log('f', depth, row, col)
  let i = 0
  let j = 0
  for (j = 0; j < rows; j++) {
    grid[j] = []  // make 2d array
  }

  // input: 'sector' style. build a row.col grid
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      let z = Math.floor(i / 3) * 3 + Math.floor(j / 3) // sector number
      let y = (i % 3) * 3 + j % 3 // offset in the sector
      let t = z * 9 + y // the 'sector' type index
      if (x[t]) {
        //console.log('f', i,j,t,x[t])
        grid[i][j] = { t: 'f', v: x[t] }
      } else {
        grid[i][j] = { t: 'u', v: '' }
      }
    }
  }
  //dumpG()
  doNext()
  console.log('end n:', nPos / 1e6, 'nCell', nCell / 1e6, nSol)
  return {nSol: nSol, nPos: nPos}
}
//---------------------------------------------
function dumpG() {
  for (i = 0; i < rows; i++) {
    s = ''
    for (j = 0; j < cols; j++) {
      //console.log('h',i,j,grid[i][j])
      s = s + grid[i][j].v
    }
    console.log('s', s)
  }
}
//------------------------------------------------
// recursive
function doNext() {
  if (nSol > 1) return // unwind. rather than use throw
  var k // must be local
  depth++
  //console.log(`d: ${depth} rc ${row}${col}`)

  if (grid[row][col].t == 'f') {
    if (incrPos())
      doNext() // recurse..
    else
      sol()
  } else {
    // not f
    var mm = makeMap() // must be local
    // try values 1-9
    for (k = 1; k <= 9; k++) {
      if (mm[k]) continue // avoid those in map
      nPos++
      grid[row][col] = { t: 't', v: k }
      //console.log(`: ${depth} rck ${row}${col}${k}`)
      //dumpG()
      if (incrPos()) {
        doNext() // recurse..
        if (nSol > 1) break
      } else
        sol()
    }
  }
  if (grid[row][col].t != 'f')
    grid[row][col] = { t: 'u', v: 0 } // unset as we unwind
  depth--
  decrPos()
  //console.log(`dne: ${depth} rc ${row}${col}`)
}
//--------------------------------------
function sol() {
  console.log('sol n:', nPos / 1e6, 'nCell', nCell / 1e6)
  dumpG()
  //if (++nSol > 1) { throw 'non unique' }
  ++nSol
}
// return 1 if incremented, else 0 (at end)
function incrPos() {
  if (col == cols - 1 && row == rows - 1) return 0
  col = ++col % cols
  if (col == 0)
    if (++row >= rows) {
      //cannot happen
      throw 'over r'
    }
  //console.log(`f: rc ${row}${col}`)
  return 1
}
// return 1 if decremented, else 0 (at start)
function decrPos() {
  if (--col < 0) {
    col = cols - 1
    if (--row < 0) return 0 // this will happen at the end
  }
  //console.log(`decr ${depth} rc ${row}${col}`)
  return 1
}
// scan current col, row & 3x3 sector
// returns array (map) of numbers present
function makeMap() {
  //console.log('mm')
  var m = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  // row scan
  for (c = 0; c < cols; c++) {
    nCell++
    if (grid[row][c].t != 'u') {
      m[grid[row][c].v] = 1
      //console.log('c',grid[row][c].v)
    }
  }
  // col scan
  for (r = 0; r < rows; r++) {
    nCell++
    if (grid[r][col].t != 'u')
      m[grid[r][col].v] = 1
  }
  // sector scan
  var cl = 3 * Math.floor(col / 3)
  var rl = 3 * Math.floor(row / 3)
  for (r = rl; r < rl + 3; r++) {
    if (r == row) continue // our row already done above
    for (c = cl; c < cl + 3; c++) {
      if (c == col) continue // col already
      nCell++
      if (grid[r][c].t != 'u')
        m[grid[r][c].v] = 1
    }
  }
  //console.log('mm', m)
  return m
}
