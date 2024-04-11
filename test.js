function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

function adrenaline(main, extra, item) {

  let toappend = []
  let append_index = 0
  let appendlist = []

  let extraperm = permutator(extra)
  // console.log("-----------------------------")
  // console.log(extraperm)
  for (let i = 0; i < main.length; i++) {
    let extraperm2 = JSON.parse(JSON.stringify(extraperm));
    for (let e = 0; e < extraperm2.length; e++) {
      let tmp = [...main[i]]
      for (let j = 0; j < tmp.length; j++) {

        // console.log("extra e:", extraperm2[e])
        if (tmp[j] == item) {
          if (extraperm2[e].length == 0) {
            tmp.splice(j, 1);
            continue
          }
          tmp[j] = extraperm2[e][0]
          extraperm2[e].shift()


        }

      }
      appendlist.push(tmp)
    }
  }

  // console.log(appendlist)

  // for (let i = 0; i < toappend.length; i++) {
  //   main.push(toappend[i])
  // }
  // console.log(main)
  // let count = 0
  // toremove = [...new Set(toremove)]
  // console.log(toremove)

  // while (toremove.length > 0) {
  //   main.splice(toremove[0] - count, 1);
  //   count++
  //   toremove.shift()
  // }

  return Array.from(new Set(appendlist.map(JSON.stringify))).map(JSON.parse);

}


let test = ["1", "3", "3", "3"]
let extra = ["4", "5"]
// let extra = ["4", "5", "1", "7", "2"]
let out = permutator(test)

let uniqueArr = Array.from(new Set(out.map(JSON.stringify))).map(JSON.parse);

// console.log(uniqueArr)

let substitute = adrenaline(uniqueArr, extra, "3")

console.log(substitute)

