class Node {
    constructor(value = 1) {
        this.value = value
        this.shoot = null
        this.self = null
    }
}


function test() {
    console.log("in test function")
}

function rec_shoot(/** @type {Array} */ ammo, /** @type {Array} */ known, /** @type {Node} */ tree) {
    console.log("----------------------------------")
    console.log(tree)
    console.log(ammo)
    console.log(known)
    ammo[0] + ammo[1]
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

    console.log("live rounds: ", ammo[0], "/", ammo_sum)
    console.log("known: ", known)
    // if (known[0] == 0) {
    //     action.verbose = "next is blank shell"
    //     action.desc = "self"
    //     return action
    // }
    // if (known[0] == 1) {
    //     action.verbose = "next is live shell"
    //     action.desc = "shoot"
    //     return action
    // }
    // if (ammo[0] >= ammo_sum) {
    //     action.verbose = "all live rounds, shoot"
    //     action.desc = "shoot"
    //     return action
    // }
    // if (ammo[1] == ammo_sum) {
    //     action.verbose = "all blanks, self"
    //     action.desc = "shoot self"
    //     return action
    // }

    let ammo2 = [...ammo]
    let known2 = [...known]

    let rec = rec_shoot(ammo2, known2, new Node(1))
    console.log("------------------------------------")
    console.log(JSON.stringify(rec, null, 4));

    return action
}


module.exports = {
    test,
    compute
};

