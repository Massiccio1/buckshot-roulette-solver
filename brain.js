class Node {
    constructor(value = 1) {
        this.value = value
        this.shoot = null
        this.self = null
    }
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
                    console.log("before: ", tmp)
                    //tmp[j] = extraperm2[e][0]
                    tmp.splice(j + 1, 0, extraperm2[e][0]);
                    extraperm2[e].shift()
                    console.log("after: ", tmp)


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


function test() {
    console.log("in test function")
}

function play(health, ammo, known, perm) {
    let next = -1
}

function solve(health, ammo, known, perm) {
    let logs = []
    if (perm.length > 0) {
        for (let i = 0; i < perm.length; i++) {
            let ammo2 = [...ammo]
            console.log(ammo2)
        }
    } else { }

}

function rec_shoot(/** @type {Array} */ ammo, /** @type {Array} */ known, /** @type {Node} */ tree) {
    console.log("----------------------------------")
    console.log(tree)
    console.log(ammo)
    console.log(known)

    let ammo_s = ammo[0] + ammo[1]

    if (ammo_s == 0) {
        return tree
    }
    if (tree.value == 0) {
        return tree
    }

    //next shell known blank or no more live
    if (known[0] == 0 || ammo[0] == 0) {
        tree.self = new Node(1)
        tree.shoot = new Node(0)
        ammo[1]--
        known.shift()
        rec_shoot(ammo, known, tree.self)
        return tree
    }
    //next known live or no more blank
    if (known[0] == 1 || ammo[1] == 0) {
        tree.self = new Node(0)
        tree.shoot = new Node(1)
        ammo[0]--
        known.shift()
        return tree
    }

    /*  
    4 opzioni   : 
        sparo e colpisco
        sparo e manco
        self e mi colpisco
        self e mi manco
    */

    //se mi sparo
    let good = ammo[1] / ammo_s
    tree.self = new Node(good)
    tree.shoot = new Node(1 - good)

    // rec_shoot(ammo, tree.self)

    // const index = myArray.indexOf(2);

    // const x = myArray.splice(index, 1);

    return tree


    //---------------------------------------------------------------------------
    //shoot self case
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

    let items = data.items

    console.log("live rounds: ", ammo[0], "/", ammo_sum)
    console.log("known: ", known)
    console.log("items: ", items)

    let perm = get_all_actions(items[0], items[1], "adrenaline")

    console.log("permutations: ", perm)
    let out = solve(data.health, ammo, known, perm)
    // let rec = rec_shoot(ammo2, known2, new Node(1))
    let actions = []
    return action
}


module.exports = {
    test,
    compute
};

