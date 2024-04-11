
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
    console.log(log)
    // let log = []
    // console.log("noitem knwonw: ", known)
    let p = odds(ammo, known)   //p live
    log.push(p)
    if (p != 1) { //puç essere blank
        ammo[1]--
        // console.log("new k:", known.slice(1, known.lengt))
        noitem(ammo, known.slice(1, known.lengt), log)
    }
}

function play(health, ammo, known, perm) {
    let n = whatsnext(ammo, known)
    // console.log("next is", n)

    //-1 balnk, 0 unknown, 1 live
    let inverted = 0
    let handcuff = 0
    let saw = 0
    let skip = 0
    let item_index = 0
    let log = []
    let used = []
    /*
    1.  sparo
    2.  uso oggetto e sparo
    3.  uso 2 oggetti e sparo
    4.  uso 3 oggetti e sparo
    */


    for (let i = 0; i < perm.length; i++) {

        let p = odds(ammo, known)
        if (inverted)
            p = 1 - p
        log.push(`odds with items ${used}: ${p}`)


        console.log("next item: ", perm[i])
        switch (perm[i]) {
            case 'inverter':
                inverted = 1
                break;
            case 'Mangoes':
            case 'Papayas':
                console.log('Mangoes and papayas are $2.79 a pound.');
                // Expected output: "Mangoes and papayas are $2.79 a pound."
                break;
            default:
                console.log(`Sorry, we are out of ${expr}.`);
        }
        item_index++
        used.push(perm[i])
    }
    let p = odds(ammo, known)
    if (inverted)
        p = 1 - p
    log.push(`odds with items ${used}: ${p}`)
    console.log("done with one")
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
        for (let j = 0; j < cheatammo.length; j++) {

        }
    }

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

