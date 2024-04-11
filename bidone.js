
function whatsnext(ammo, known) {
    //-1 balnk, 0 unknown, 1 live
    let ammo_s = ammo[0] + ammo[1]

    if (ammo_s == 0) {
        return 0
    }

    //next shell known blank or no more live
    if (known[0] == -1 || ammo[0] == 0) {
        return -1
    }
    //next shell known live or no more blanks
    if (known[0] == 1 || ammo[1] == 0) {
        return 1
    }
    let klive = 0
    let kblank = 0

    for (let i = 0; i < known.length; i++) {
        if (known[i] == -1)
            kblank++
        if (known[i] == 1)
            klive++
    }

    let ulive = ammo[0] - klive
    let ublank = ammo[1] - kblank

    if (ulive == 0)
        return -1
    if (ublank == 0)
        return 1

    return 0
}