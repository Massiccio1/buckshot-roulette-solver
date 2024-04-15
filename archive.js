function extra(masterlog) {

    let rel = []

    for (let i = 0; i < masterlog.length; i++) {
        for (let j = 1; j < masterlog[i].length; j++) {

            let sub = masterlog[i].slice(0, j)
            if (sub[j - 1] == "adrenaline" || sub[j - 1] == "item")
                continue
            let alreadyDone = false

            for (let l = 0; l < rel.length; l++) {
                // console.log("already done: ", rel[l][0][0])
                if (deepcomp2(rel[l][0][0], sub)) {
                    // console.log("checkoed: ", sub, " = ", rel[l][0][0])
                    // console.log("already done: ", rel[l][0][0])

                    alreadyDone = true
                }

            }
            if (alreadyDone) break

            console.log("searching with sub: ", sub)
            let maxdmg = masterlog[i][masterlog[i].length - 1]
            let mindmg = masterlog[i][masterlog[i].length - 1]
            let keep = false
            for (let k = 0; k < masterlog.length - 1; k++) {
                if (i == k) continue
                if (deepcomp(sub, masterlog[k])) {
                    // console.log("found match at: ", sub)
                    let tmp2 = masterlog[k][masterlog[k].length - 1]
                    console.log("tmp dmg: ", tmp2, " and mimax; ", mindmg, maxdmg)
                    if (maxdmg < tmp2) {
                        maxdmg = tmp2
                        keep = true
                        break
                    } else if (mindmg > tmp2 && tmp2 > -1) {
                        console.log("in min dmg, old: ", mindmg, " new: ", tmp2)
                        console.log(masterlog[k])
                        mindmg = tmp2
                        keep = true
                        break
                    }
                    else if (!deepcomp(masterlog[i], masterlog[k])) keep = true

                }

            }
            if (keep) {
                // console.log("sub: ", sub)
                // console.log("current: ", masterlog[i])
                rel.push([[sub], [maxdmg, mindmg]])
                break
            }

        }
        //for testing, doing only one
        // if (i == 2) break
    }
    console.log("------------------------------------------")
    // console.log(rel[0])
    // // console.log(JSON.parse(JSON.stringify(rel)))
    // process.stdout.write(`${JSON.parse(JSON.stringify(rel))},`);
    for (let i = 0; i < rel.length; i++) {
        console.log(rel[i])
    }

}