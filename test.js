function a1(a, b) {
    console.log("in a1: ", a, b)
}
function a2() {
    return [1, 3, 5, 7, 9]
}


let r1 = a1(b = 11, a = 22)

console.log(r1)