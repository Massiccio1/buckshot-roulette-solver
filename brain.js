

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

function deepcomp(a, b, depth) {
    let eq = true
    if (depth === undefined) {
        depth = a.length
    }

    let dp = Math.min(depth, a.length)
    dp = Math.min(dp, b.length)

    for (let i = 0; i < dp; i++) {
        if (a[i] != b[i]) {
            // console.log("diff in:", a[i], " e ", b[i])
            return false
        }
    }
    return eq
}

function deepcomp2(a, b, depth) {
    let eq = true
    if (depth === undefined) {
        depth = a.length
    }
    if (a.length != b.length)
        return false
    if (a.length == 0 || b.length == 0)
        return false


    for (let i = 0; i < depth; i++) {
        if (a[i] != b[i]) {
            // console.log("diff in:", a[i], " e ", b[i])
            return false
        }
    }
    return eq
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
    // console.log(uniqueArr)
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

function makeDecisionTree(item_perm, ammo, p2h, known) {
    let root = new Node()
    root.desc = "root"
    root.permutations = []
    for (let i = 0; i < item_perm.length; i++) {
        let tmp = new Node()
        tmp.itemlist = item_perm[i]
        root.permutations.push(tmp)
        decisionTree(tmp, item_perm[i], ammo, p2h, known)
    }

    if (item_perm.length <= 0) {
        let tmp = new Node()
        tmp.itemlist = []
        root.permutations.push(tmp)
        decisionTree(tmp, [], ammo, p2h, known)
    }

    return root
}

function crawlerMaster(dectree) {
    // console.log("crawling....")
    let masterlog = []
    // console.log("crawling perms: ", dectree.permutations.length)
    for (let i = 0; i < dectree.permutations.length; i++) {
        let current = dectree.permutations[i];
        let log = []

        // masterlog.push(crawlerWorker(current))
        crawlerWorker2(current, masterlog, [])
    }

    console.log("done crawling....")

    // console.log(masterlog)

    // console.log(dectree.permutations[0][masterlog[0][0]][masterlog[0][1]])

    return masterlog
}

function evalMaster(dectree) {
    console.log("evaluating branches....")
    let masterlog = []
    console.log("shallow branches: ", dectree.permutations.length)
    for (let i = 0; i < dectree.permutations.length; i++) {
        let current = dectree.permutations[i];
        let log = []

        // masterlog.push(crawlerWorker(current))
        masterlog.push(evalBranch(current))
    }

    console.log("done evaluating....")

    console.log(masterlog)

    // console.log(dectree.permutations[0][masterlog[0][0]][masterlog[0][1]])

    return masterlog
}


function crawlerWorker2(current, masterlog, tmplog) {
    // console.log("in branch: ", tmplog)
    let isleaf = false
    let win = false
    let damage = 0
    let indexes = []
    let names = []
    let end = false
    if ("win" in current) {
        win = current.win
    }
    if ("damage" in current) {
        damage = current.damage
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

    for (let i = 0; i < indexes.length; i++) {
        let tmptmp = [...tmplog] //branch clone
        tmptmp.push(names[i])
        if (names[i] == "item") {
            if ("note" in indexes[i]) {
                tmptmp.push("adrenaline")
            }
            tmptmp.push(indexes[i].desc)
        }

        crawlerWorker2(indexes[i], masterlog, tmptmp)
    }
    if (indexes.length == 0)
        isleaf = true
    if (isleaf) {
        let value = 0
        if (win) value = 10
        if (damage <= 0) value -= damage * 2
        if (end) value++
        value += damage * 2
        // console.log("found leaf with value: ", value)
        tmplog.push(value)
        // console.log("found leaf")
        // console.log(tmplog)
        masterlog.push(tmplog)
    }

    return masterlog
}



function evalBranch(current, item = false) {
    let isleaf = false
    let win = false
    let damage = 0
    let indexes = []
    let names = []
    let end = false
    let pval = 0.5
    let choice = false
    let forced = false
    let values = []
    let useditem = false;

    /*
    choice if:
    ss
    sd
    item

    forced if:
    l
    b

    mutually exclusive
    */

    if ("win" in current) {
        win = current.win
    }
    if ("damage" in current) {
        damage = current.damage
    }
    if ("pval" in current) {
        pval = current.pval
    }
    // if ("end" in current) {
    //     isleaf = true
    //     end = current.end
    // }
    if ("info" in current) {
        if (current.info == "shotgun emtpy") {
            end = current.end
            // console.log("found shotgun empty")
        }

    }
    if ("ss" in current) {
        indexes.push(current.ss)
        names.push("ss")
        choice = true
    }
    if ("sd" in current) {
        indexes.push(current.sd)
        names.push("sd")
        choice = true
    }
    if ("item" in current) {
        indexes.push(current.item)
        names.push("item")
        choice = true
        useditem = true
    }
    if ("l" in current) {
        indexes.push(current.l)
        names.push("l")
        forced = true
    }
    if ("b" in current) {
        indexes.push(current.b)
        names.push("b")
        forced = true
    }
    if ("ff" in current) {
        indexes.push(current.ff)
        names.push("ff")
        forced = false
    }
    // console.log("indexes:", indexes)

    if (indexes.length > 0) {


        for (let i = 0; i < indexes.length; i++) {
            // console.log(indexes[i])
            if (names[i] == "item") {
                var ret = evalBranch(indexes[i], true)
            } else {
                var ret = evalBranch(indexes[i])

            }
            values.push(ret)
        }

        let value = values[0]
        let valuename = names[0]


        // if (choice == false && forced == false)
        //     console.log("stall situation")

        // console.log("names:", names)

        // console.log(values)
        // console.log("forced:", forced)
        // console.log("choice: ", choice)

        if (choice) {
            //prendo la scelta con value più alta
            // console.log("choice on ", names)
            for (let i = 0; i < values.length; i++) {

                if (values[i] > value) {
                    value = values[i]
                    valuename = names[i]
                }
            }
            current.action = valuename
        }
        if (forced) {
            //prendo la scelta più bassa perché incerta
            // console.log("forced on ", names)

            for (let i = 0; i < values.length; i++) {
                if (values[i] < value) {
                    value = values[i]
                    valuename = names[i]
                }
            }
        }
        // let ret = []
        // for (let i = 0; i < indexes.length; i++) {
        //     let ret = evalBranch(indexes[i])
        //     values.push(ret)
        // }

        // return [value, valuename, values]
        if (item) {
            value -= 0.1
        }
        current.value = value
        return value

    } else {
        let value = 0
        if (win) value = 10
        if (damage <= 0) value += damage
        if (end) value++
        value += damage * 2
        // return [value, "eob"]
        current.value = value
        return value
    }
}



function decisionTree(log, items, ammo, hp, known, useditems = [], damage = 0, handcuff = 0, sawmult = 1, nextammo = -1, inverted = false) {


    // console.log("in decision tree")
    // console.log(handcuff)

    let actions = ["ss", "sd", "item"]
    if (typeof damage != typeof (0))
        console.log("damaeg error in ", log)
    let ammo_s = ammo[0] + ammo[1]
    log.useditems = useditems
    // console.log(p2h)
    if (hp <= 0) {
        log.win = true
        return log
    }

    if (ammo_s <= 0) {
        return log
    }

    let p = odds(ammo, known)
    if (inverted) {
        p = known[0]
    }
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
        if (p != 0 && nextammo != 0) {



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
                decisionTree(ssl, items2, ammo2, hp, known2, useditems, damage - sawmult,)
            } else {
                //no handc no followup shot
                ssl.end = true
            }
        }
        //ssb
        if (nextammo != 1) {
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
            decisionTree(log.ss.b, items2, ammo2, hp, known2, useditems, damage, handcuff)
        }

    }
    //sd
    if (p != 0) {
        log.sd = new Node()
        //sdl
        if (nextammo != 0) {
            let items2 = [...items]
            let ammo2 = [...ammo]
            let known2 = [...known]
            ammo2[0]--
            known2.shift()
            let sdl = log.sd.l = new Node()
            sdl.damage = damage + sawmult
            // if (p2h - damage - sawmult <= 0) {
            //     sdl.win = true
            // }
            if (ammo_s == 1) {
                sdl.info = "shotgun emtpy"
                sdl.end = true
                if (hp - sawmult <= 0) {
                    sdl.win = true
                }
            } else if (handcuff) {
                decisionTree(sdl, items2, ammo2, hp - sawmult, known2, useditems, damage + sawmult)
            } else {
                //no handc no followup shot
                sdl.end = true
            }
        }
        //sdb
        if (p != 1 && nextammo != 1) {
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
                decisionTree(sdb, items2, ammo2, hp, known2, useditems, damage)
            }
        }


    }


    //use item
    if (items.length > 0) {

        log.item = new Node()

        let sawmult2 = sawmult
        let handcuff2 = handcuff
        let inverted2 = inverted


        if (items[0] == "adrenaline") {
            log.item.desc = items[1]
        }
        else log.item.desc = items[0]

        let ff = [
            "adrenaline",
            "saw",
            "handcuffs",
        ]

        if (ff.includes(items[0])) {
            let skip = log.item.ff = new Node()


            let items2 = [...items]
            let ammo2 = [...ammo]
            let known2 = [...known]
            let nextammo2 = -1
            let useditems2 = []
            if (useditems.length > 0)
                useditems2 = [...useditems]
            if (items2[0] == "adrenaline") {
                log.item.note = "adrenaline"
                items2.shift()

            }

            switch (items2[0]) {
                case 'saw':
                    sawmult2 = 2
                    nextammo2 = 1
                    break;
                case 'handcuffs':
                    // console.log("kn in handcuff: ", known2)
                    handcuff2 = 1
                    break;
                default:
                    console.log("unknown item: ", items2[0])

            }

            useditems2.push(items2[0])

            items2.shift()
            let ammo_s = ammo2[0] + ammo2[1]
            if (ammo_s == 1) {
                skip.info = "shotgun emtpy"
                skip.end = true
            }
            decisionTree(skip, items2, ammo2, hp, known2, useditems2, damage, handcuff2, sawmult2, nextammo2, inverted2)
            return log

        }


        if (p != 0 && nextammo != 0) {
            //live
            let il = log.item.l = new Node()


            let items2 = [...items]
            let ammo2 = [...ammo]
            let known2 = [...known]
            let nextammo2 = -1

            let useditems2 = []
            if (useditems.length > 0)
                useditems2 = [...useditems]
            if (items2[0] == "adrenaline") {
                log.item.note = "adrenaline"
                items2.shift()

            }

            switch (items2[0]) {
                case 'inverter':
                    ammo2[0]--
                    ammo2[1]++
                    inverted2 = true
                    nextammo2 = 0
                    if (known2[0] == 1 || known2[0] == 0)
                        known2[0] = 1 - known2[0]
                    break;
                case 'saw':
                    sawmult2 = 2
                    nextammo2 = 1
                    break;
                case 'beer':
                    ammo2[0]--
                    known2.shift()
                    break;
                case 'glass':
                    known2[0] = 1
                    break;
                case 'handcuffs':
                    // console.log("kn in handcuff: ", known2)
                    handcuff2 = 1
                    // nextammo2 = 1
                    break;
                default:
                    console.log("unknown item: ", items2[0])

            }

            useditems2.push(items2[0])

            items2.shift()
            let ammo_s = ammo2[0] + ammo2[1]
            if (ammo_s == 1) {
                il.info = "shotgun emtpy"
                il.end = true
            }
            decisionTree(il, items2, ammo2, hp, known2, useditems2, damage, handcuff2, sawmult2, nextammo2, inverted2)

        }
        if (p != 1 && nextammo != 1) {
            //blank
            let ib = log.item.b = new Node()


            let items2 = [...items]
            let ammo2 = [...ammo]
            let known2 = [...known]
            let nextammo2 = -1
            let inverted2 = inverted
            let useditems2 = []
            if (useditems.length > 0)
                useditems2 = [...useditems]

            if (items2[0] == "adrenaline") {
                log.item.note = "adrenaline"
                items2.shift()

            }

            switch (items2[0]) {
                case 'inverter':
                    ammo2[0]++
                    ammo2[1]--
                    inverted2 = true
                    nextammo2 = 1
                    if (known2[0] == 1 || known2[0] == 0)
                        known2[0] = 1 - known2[0]
                    break;
                case 'saw':
                    sawmult = 2
                    nextammo2 = 0
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
                    // nextammo2 = 0
                    break;
                default:
                    console.log("unknown item: ", items2[0])
            }
            useditems2.push(items2[0])
            items2.shift()
            let ammo_s = ammo2[0] + ammo2[1]
            if (ammo_s == 1) {
                ib.info = "shotgun emtpy"
                ib.end = true
            }
            decisionTree(ib, items2, ammo2, hp, known2, useditems2, damage, handcuff2, sawmult2, nextammo2, inverted2)
        }
    }



    // console.log("end of decision tree")
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

    let out = makeDecisionTree(perm, ammo, p2h, known)
    console.log("-----------------------------------------------------")

    let crwl = crawlerMaster(out)
    out.crawloutput = crwl
    // return crwl

    let ricBranch = evalMaster(out)
    out.values = ricBranch



    return out
}


module.exports = {
    test,
    compute
};

