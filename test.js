function deepcomp(a, b, depth) {
    let eq = true

    let dp = Math.min(depth, a.length)
    dp = Math.min(dp, b.length)

    for (let i = 0; i < dp; i++) {
        if (a[i] != b[i]) {
            console.log("diff in:", a[i], " e ", b[i])
            return false
        }
    }
    return eq
}


let a = ["item", "handcuffs", "l", "sd", "b", "item", "glass", "l", "sd", "l", 1]
let b = ["item", "handcuffs", "l", "sd", "b", "item", "glass", "l", "sd", "l", 2]
// let b = ["item", "handcuffs", "l", "item", "glass", "l", "sd", "l", "ss", "b", 1]

console.log(a.length)
console.log(b.length)


let as = a.slice(0, a.length - 1)
let bs = b.slice(0, b.length - 1)
console.log(as)
console.log(bs)

console.log(as == bs)

console.log("--------------------------")

// let tmp = [1, 2, 3, 4, 5]

// console.log(tmp.splice(0, 3))
// console.log(tmp)

console.log(a)
console.log(as)

console.log(deepcomp(as, bs, 12))