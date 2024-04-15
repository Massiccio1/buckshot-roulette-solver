function a1() {
    return 1
}
function a2() {
    return [1, 3, 5, 7, 9]
}


console.log(a1())
console.log(a2())

let [a, b] = a2()

console.log(a, b)