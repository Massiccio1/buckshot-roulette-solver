
function removeDuplicatesNestedList(nestedList) {
    const seen = new Set();

    function removeDuplicates(list) {
        return list.filter(item => {
            if (Array.isArray(item)) {
                return !seen.has(JSON.stringify(item)) && seen.add(JSON.stringify(item)) && removeDuplicates(item);
            } else {
                return !seen.has(item) && seen.add(item);
            }
        });
    }

    return removeDuplicates(nestedList);
}

function RemoveAmmoKnown(cheatammo, known) {
    for (let i = 0; i < cheatammo.length; i++) {
        // console.log(cheatammo[i])
        for (let j = 0; j < cheatammo[i].length; j++) {
            if (cheatammo[i][j] != known[j] && known[j] != -1) {
                let tmp = cheatammo.splice(i, 1);
                i--
                // console.log("rimosso:", tmp)
                // console.log(cheatammo[i + 1][j], " : ", known[j])
                break
            }
        }
    }

    return cheatammo
}

function addsssd(perm, cheatammo) {
    let ammo = cheatToAmmo(cheatammo[0])
    for (let i = 0; i < perm.length; i++) {
        let count = 1
        for (let j = 0; j < perm[i].length; j++) {
            if (perrm[i][j] == "handcuffs")
                count++
        }
        for (let j = 0; j < ammo[1].length; j++) {
            perm[i].push("ss")
        }
    }
}

function permammo(ammo) {
    console.log(ammo)
    let v = []
    for (let i = 0; i < ammo[0]; i++) {
        v.push(1)
    }
    for (let i = 0; i < ammo[1]; i++) {
        v.push(0)
    }

    return removeDuplicatesNestedList(permutator(v))
}

function test() {
    return "tst function"
}

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

    for (let i = 0; i < main.length; i++) {
        let extraperm2 = JSON.parse(JSON.stringify(extraperm));

        for (let e = 0; e < extraperm2.length; e++) {
            let tmp = [...main[i]]
            for (let j = 0; j < tmp.length; j++) {
                if (tmp[j] == item) {
                    if (extraperm2[e].length == 0) {
                        tmp.splice(j, 1);

                        continue
                    }
                    //tmp[j] = extraperm2[e][0]
                    tmp.splice(j + 1, 0, extraperm2[e][0]);
                    extraperm2[e].shift()


                }

            }
            appendlist.push(tmp)
        }
    }

    return Array.from(new Set(appendlist.map(JSON.stringify))).map(JSON.parse);

}

function get_all_actions(player_items, dealer_items, swap_item = "adrenaline") {
    if (dealer_items.length == 0) {
        //dealer non ha items
        while (player_items.indexOf(swap_item) !== -1) {
            player_items.splice(player_items.indexOf(swap_item), 1);
        }
    }


    let out = permutator(player_items)
    let uniqueArr = Array.from(new Set(out.map(JSON.stringify))).map(JSON.parse);
    console.log(uniqueArr)
    if (dealer_items.length != 0) {
        //dealer non ha items
        uniqueArr = adrenaline(uniqueArr, dealer_items, swap_item)
    }


    return uniqueArr
}


function odds(ammo, known) {

    //0  blank, 1 live
    let ammo_s = ammo[0] + ammo[1]

    if (ammo_s == 0) {
        return 0
    }

    //next shell known blank or no more live
    if (known[0] == 0 || ammo[0] == 0) {
        return 0
    }
    //next shell known live or no more blanks
    if (known[0] == 1 || ammo[1] == 0) {
        return 1
    }
    let klive = 0
    let kblank = 0

    for (let i = 0; i < known.length; i++) {
        if (known[i] == 0)
            kblank++
        if (known[i] == 1)
            klive++
    }

    let ulive = ammo[0] - klive
    let ublank = ammo[1] - kblank

    if (ulive == 0)
        return 0
    if (ublank == 0)
        return 1
    let p = ulive / (ulive + ublank)
    // console.log("odds: ", p)
    return p

}


function noitem(ammo, known, log) {
    // console.log(log)
    if (ammo[0] + ammo[1] == 0) {
        log.push("end of round")
        return
    }

    let p = odds(ammo, known)   //p live
    log.push(p)
    if (p != 1) { //puç essere blank
        ammo[1]--
        noitem(ammo, known.slice(1, known.lengt), log)
    }
}

function cheatToAmmo(cheatammo) {
    let ammo = [0, 0]
    for (let i = 0; i < cheatammo.length; i++) {
        if (cheatammo[i] == 0)
            ammo[1]++
        if (cheatammo[i] == 1)
            ammo[0]++
    }
    return ammo
}

function extra(masterlog) {
    for (let i = 1; i < masterlog.length; i++) {
        let value = 0
        for (let j = 1; j < masterlog[i].length; j++) {

        }
    }

}

function palyitem(item, cheatammo, known, log) {

    let original_ammo = [...cheatammo]

    let dmg = 0
    let inverted = 0
    let handcuff = 0
    let saw = 0
    let item_index = 0
    let used = []

    // item = item[0]
    // console.log(item)
    for (let i = 0; i < item.length; i++) {

        switch (item[i]) {
            case 'inverter':
                let ammo = cheatToAmmo(cheatammo)
                let p = odds(ammo, known)
                if (p == 0 || p == 1)
                    known[0] = p
                cheatammo[0] = 1 - cheatammo[0]
                if (known[0] != -1)
                    known[0] = 1 - known[0]

                break;
            case 'saw':
                saw = 1
                break;
            case 'beer':
                cheatammo.shift()
                known.shift()
                break;
            case 'glass':
                known[0] = cheatammo[0]
                break;
            case 'handcuffs':
                handcuff = 1
                break;
            default:
                console.log("unknown item: ", item[i])
        }

    }

    let ammo = cheatToAmmo(cheatammo)

    let ex = false
    log.push(`${item}`)
    log.push(original_ammo)
    while (!ex) {
        // console.log("iter")
        if (ammo[0] + ammo[1] <= 0) {
            ex = true
            continue
        }

        let p = odds(ammo, known)
        if (p == 0 || p == 1) {
            known[0] = p
        }
        log.push(p) //% live round
        if (p == 1) {
            ammo[0]--
            known.shift()
            cheatammo.shift()
            dmg++
            if (saw)
                dmg++
        }
        if (p == 0) { //if blank    live, you can shot yourself
            ammo[1]--
            known.shift()
            cheatammo.shift()
        } else
            if (handcuff) {
                handcuff = 0
                if (cheatammo[0] == 1) {
                    dmg++
                    if (saw)
                        dmg++
                }
                known.shift()
                cheatammo.shift()
                ammo = cheatToAmmo(cheatammo)
            } else {
                ex = true
            }
        saw = 0
    }

    ammo = cheatToAmmo(cheatammo)
    log.push(`damage: ${dmg}`)
    if (ammo[1] + ammo[0] <= 1) {
        log.push("end of round")

    }

    return log
}

function solve2(perm, cheatammo, ammo, known) {
    let masterlog = []
    let ammo2 = [...ammo]

    let log = []
    noitem(ammo2, known, log)
    masterlog.push(log)

    //i perm items, j perm bullet

    for (let i = 0; i < perm.length; i++) {
        for (let k = 0; k < perm[i].length; k++) {

            for (let j = 0; j < cheatammo.length; j++) {


                // for (let k = 0; k < perm[i].length; k++) {
                let cheatammo2 = [...cheatammo[j]]
                let perm2 = [...perm[i]]
                perm2 = perm2.slice(0, k + 1)
                let known2 = [...known]
                //ora uso cheatammo2, current state
                log = []
                palyitem(perm2, cheatammo2, known2, log)
                masterlog.push(log)
            }

        }
    }
    console.log("done calculating")

    let ex = extra(masterlog)
    console.log("done calculating")

    return masterlog
}




function compute(data) {
    let p1h = data.health[0]
    let p2h = data.health[1]
    /** @type {Array} */
    let ammo = data.ammo
    /** @type {Array} */
    let known = data.known
    let action = {
        desc: "unknown"
    }

    let ammo_sum = ammo[0] + ammo[1]
    if (p1h == 0 || p2h == 0 || ammo_sum == 0) {
        action.desc = "error in data"
        return action
    }

    let cheatammo = permammo(data.ammo)
    RemoveAmmoKnown(cheatammo, known)
    // console.log(cheatammo)
    // return cheatammo
    let items = data.items

    console.log("live rounds: ", ammo[0], "/", ammo_sum)
    console.log("known: ", known)
    console.log("items: ", items)

    let perm = get_all_actions(items[0], items[1], "adrenaline")

    console.log("permutations: ", perm)
    // let out = solve(data.health, ammo, known, perm)
    // let rec = rec_shoot(ammo2, known2, new Node(1))
    let out = solve2(perm, cheatammo, ammo, known)
    let actions = []
    return out
}


module.exports = {
    test,
    compute
};

