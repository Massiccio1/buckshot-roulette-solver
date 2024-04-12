

class Node {
    constructor() {

    }
}


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
        for (let j = 0; j < cheatammo[i].length; j++) {
            if (cheatammo[i][j] != known[j] && known[j] != -1) {
                let tmp = cheatammo.splice(i, 1);
                i--

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


function makeDecisionTree(item_perm, ammo, known, p2h = 2) {
    let root = new Node()
    root.desc = "root"
    root.permutations = []
    for (let i = 0; i < item_perm.length; i++) {
        let tmp = new Node()
        tmp.itemlist = item_perm[i]
        root.permutations.push(tmp)
        decisionTree(tmp, item_perm[i], ammo, known, p2h)
    }

    if (item_perm.length <= 0) {
        let tmp = new Node()
        tmp.itemlist = []
        root.permutations.push(tmp)
        decisionTree(tmp, [], ammo, known, p2h)
    }

    return root
}

function crawlerMaster(dectree) {
    console.log("crawling....")
    let masterlog = []
    console.log("crawling perms: ", dectree.permutations.length)
    for (let i = 0; i < dectree.permutations.length; i++) {
        let current = dectree.permutations[i];
        let log = []

        masterlog.push(crawlerWorker(current))
    }

    console.log("done crawling....")

    return masterlog
}

function crawlerWorker(current, log) {
    let isleaf = 0
    let info = "no info"
    let damage = 0
    let indexes = []
    let names = []
    let best = -2
    let worst = -2
    let win = false
    let plive = 1
    if ("win" in current) {
        win = current.win
    }
    if ("pval" in current) {
        pval = current.pval
    }
    if ("damage" in current) {
        damage = current.damage
    }
    if ("end" in current) {
        isleaf = true
        end = current.end
    }
    if ("ss" in current) {
        indexes.push(current.ss)
        names.push("ss")
    }
    if ("sd" in current) {
        indexes.push(current.sd)
        names.push("sd")
    }
    if ("item" in current) {
        indexes.push(current.item)
        names.push("item")
    }
    if ("l" in current) {
        indexes.push(current.l)
        names.push("l")
    }
    if ("b" in current) {
        indexes.push(current.b)
        names.push("b")
    }

    // if ("damage" in current)
    //     maxdmg = current.damage
    // if ("info" in current)
    //     info = current.info

    // console.log("inner crawler l:", indexes.length)
    // console.log(indexes)
    let bwv = [-100, 100, -100]
    for (let i = 0; i < indexes.length; i++) {
        let [best, worst, value] = crawlerWorker(indexes[i], log)
        bwv[0] = Math.max(best, bwv[0])
        bwv[1] = Math.min(worst, bwv[1])
        bwv[2] = Math.max(value, bwv[2])
    }
    if (indexes.length == 0)
        isleaf = true
    if (isleaf) {

        let value = 0
        if (win) value = 100
        if (damage <= 0) value -= damage * 2
        value += damage
        console.log("found leaf with value: ", value)
        return [value, value, value]

    }
    console.log(bwv)
    return bwv
}
function decisionTree(log, items, ammo, known, p2h, damage = 0, handcuff = 0, sawmult = 1) {


    console.log("in decision tree")

    let actions = ["ss", "sd", "item"]
    let ammo_s = ammo[0] + ammo[1]
    console.log(p2h)
    if (p2h <= 0) {
        log.win = true
    }

    if (ammo_s <= 0) {
        return log
    }

    let p = odds(ammo, known)
    if (p == 0 || p == 1) {
        known[0] = p
    }

    let l = p != 0 ? 1 : 0
    let b = p != 1 ? 1 : 0

    log.plive = p

    //change to this if you want to allow shooting yourself even if not 100% blank
    // if (p != 1) {
    //ss
    if (p == 0) {
        log.ss = new Node()
        //ssl
        if (p != 0) {



            let items2 = [...items]
            let ammo2 = [...ammo]
            let known2 = [...known]
            ammo2[0]--
            known2.shift()
            let ssl = log.ss.l = new Node()
            ssl.damage = damage - sawmult
            //had 1 shot, now 0
            if (ammo_s == 1) {
                ssl.info = "shotgun emtpy"
                ssl.end = true
            } else if (handcuff) {
                decisionTree(ssl, items2, ammo2, known2, p2h, damage - sawmult)
            } else {
                //no handc no followup shot
                ssl.end = true
            }
        }
        //ssb
        {
            let items2 = [...items]
            let ammo2 = [...ammo]
            let known2 = [...known]
            ammo2[1]--
            known2.shift()
            log.ss.b = new Node()
            if (ammo_s == 1) {
                log.ss.b.info = "shotgun emtpy"
                log.ss.b.damage = damage
                log.ss.b.end = true
            }
            decisionTree(log.ss.b, items2, ammo2, known2, p2h, damage, handcuff)
        }

    }
    //sd
    if (p != 0) {
        log.sd = new Node()
        //sdl
        {
            let items2 = [...items]
            let ammo2 = [...ammo]
            let known2 = [...known]
            ammo2[0]--
            known2.shift()
            let sdl = log.sd.l = new Node()
            sdl.damage = damage + sawmult
            if (p2h - damage - sawmult <= 0) {
                sdl.win = true
            }
            if (ammo_s == 1) {
                sdl.info = "shotgun emtpy"
                sdl.end = true
            } else if (handcuff) {
                decisionTree(sdl, items2, ammo2, known2, p2h - damage - sawmult, damage + sawmult)
            } else {
                //no handc no followup shot
                sdl.end = true
            }
        }
        //sdb
        if (p != 1) {
            let items2 = [...items]
            let ammo2 = [...ammo]
            let known2 = [...known]
            ammo2[1]--
            known2.shift()
            let sdb = log.sd.b = new Node()
            sdb.damage = damage
            if (ammo_s == 1) {
                sdb.info = "shotgun emtpy"
                sdb.end = true
            } else if (handcuff) {
                decisionTree(sdb, items2, ammo2, known2, p2h, damage)
            }
        }


    }


    //use item
    if (items.length > 0) {

        log.item = new Node()

        let sawmult2 = sawmult
        let handcuff2 = handcuff


        if (items[0] == "adrenaline") {
            log.item.desc = items[1]
        }
        else log.item.desc = items[0]


        if (p != 0) {
            //live
            let il = log.item.l = new Node()


            let items2 = [...items]
            let ammo2 = [...ammo]
            let known2 = [...known]

            if (items2[0] == "adrenaline") {
                log.item.note = "adrenaline"
                items2.shift()

            }

            switch (items2[0]) {
                case 'inverter':
                    ammo2[0]--
                    ammo2[1]++
                    if (known2[0] == 1 || known2[0] == 0)
                        known2[0] = 1 - known2[0]
                    break;
                case 'saw':
                    sawmult2 = 2
                    break;
                case 'beer':
                    ammo2[0]--
                    known2.shift()
                    break;
                case 'glass':
                    known2[0] = 1
                    break;
                case 'handcuffs':
                    handcuff2 = 1
                    break;
                default:
                    console.log("unknown item: ", items2[0])
            }

            items2.shift()
            decisionTree(il, items2, ammo2, known2, p2h, damage, handcuff2, sawmult2)

        }
        if (p != 1) {
            //blank
            let ib = log.item.b = new Node()


            let items2 = [...items]
            let ammo2 = [...ammo]
            let known2 = [...known]

            if (items2[0] == "adrenaline") {
                log.item.note = "adrenaline"
                items2.shift()

            }

            switch (items2[0]) {
                case 'inverter':
                    ammo2[0]++
                    ammo2[1]--
                    if (known2[0] == 1 || known2[0] == 0)
                        known2[0] = 1 - known2[0]
                    break;
                case 'saw':
                    sawmult = 2
                    break;
                case 'beer':
                    ammo2[1]--
                    known2.shift()
                    break;
                case 'glass':
                    known2[0] = 0
                    break;
                case 'handcuffs':
                    handcuff2 = 1
                    break;
                default:
                    console.log("unknown item: ", items2[0])
            }

            items2.shift()
            decisionTree(ib, items2, ammo2, known2, p2h, damage, handcuff2, sawmult2)
        }
    }



    console.log("end of decision tree")
    return log
}

function compute(data) {
    let p1h = data.health[0]
    let p2h = data.health[1]
    /** @type {Array} */
    let ammo = data.ammo
    let current = data.current
    /** @type {Array} */
    let known = data.known
    let action = {
        desc: "unknown"
    }

    for (let i = 0; i < current.length; i++) {
        if (current[i] == 0) {
            ammo[1]--
            known.shift()
        }
        if (current[i] == 1) {
            ammo[0]--
            known.shift()
        }
    }


    let ammo_sum = ammo[0] + ammo[1]
    if (p1h == 0 || p2h == 0 || ammo_sum == 0) {
        action.desc = "error in data"
        return action
    }

    let cheatammo = permammo(ammo)
    RemoveAmmoKnown(cheatammo, known)
    // console.log(cheatammo)
    // return cheatammo
    let items = data.items

    console.log("live rounds: ", ammo[0], "/", ammo_sum)
    console.log("known: ", known)
    console.log("current: ", current)
    console.log("items: ", items)

    let perm = get_all_actions(items[0], items[1], "adrenaline")

    console.log("permutations: ", perm)
    // let out = solve(data.health, ammo, known, perm)
    // let rec = rec_shoot(ammo2, known2, new Node(1))
    // let out = solve2(perm, cheatammo, ammo, known)

    let out = makeDecisionTree(perm, ammo, known, p2h)
    console.log("-----------------------------------------------------")
    let crwl = crawlerMaster(out)
    out.crawloutput = crwl
    return out
}


module.exports = {
    test,
    compute
};

