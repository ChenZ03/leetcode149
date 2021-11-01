// Solution 1 (Without Math knowledge)
// Time complexity is O(n^2)
// Space complexity is O(1)
let maxpt = arr => {
    let max  = 0
    for(let i = 0; i < arr.length; i++) {
        let curr = arr[i]
        let temp = 0
        let temp2 = 0
        let temp3 = 0
        let temp4 = 0

        for(let j = 0; j < arr.length; j++){
            let straight = Math.abs(curr[0] - arr[j][0]) == Math.abs(curr[1] - arr[j][1])
            if(straight){
                if(curr[1] - arr[j][1] > 0){
                    temp += 1
                }else{
                    temp4 += 1
                }
            }
        }

        for(let k = 0; k < arr.length; k++){
            let sameY = curr[0] == arr[k][0] 
            if(sameY){
                temp2 += 1
            }
        }

        for(let l = 0; l < arr.length; l++){
            let sameX = curr[1] == arr[l][1]
            if(sameX){
                temp3 += 1
            }
        }
        max = Math.max(max, temp, temp2, temp3, temp4);
    }

    return max
}

console.log(maxpt([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]))

//Solution 2 : Gradient 
// Time complexity is O(n^3)
// Space complexity is O(1)

let maxpt2 = arr => {
    let max = 1
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            let temp = 2
            if(arr[i][1] == arr[j][1]){
                for(let k = j + 1; k < arr.length; k++) {
                    if(arr[k][1] == arr[j][1]){
                        temp += 1
                    } 
                }
            }else if(arr[i][0] == arr[j][0]){
                for(let k = j + 1; k < arr.length; k++) {
                    if(arr[k][0] == arr[j][0]) {
                        temp += 1
                    }
                }
            }else{
                let m = gradient(arr[i][0],arr[j][0],arr[i][1], arr[j][1])
                for(let k = j + 1; k < arr.length; k++){
                    let m2 = gradient(arr[j][0],arr[k][0],arr[j][1], arr[k][1])
                    if(m == m2) {
                        temp += 1
                    }
                }
            }
            if(temp > max) max = temp
            
        }
    }
    return max
}

let gradient = (x1,x2,y1,y2) => {
    let grad = (y2 - y1) / (x2 - x1)
    return grad
}

console.log(maxpt2([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]))


//Solution 3 : Gradient + dict / Hash map
// Time complexity is O(n^2)
// Space complexity is O(n)

let maxpt3 = arr => {
    if(arr.length <= 2) return arr.length
    let dict = {}
    let result = 0
    for(let i = 0; i < arr.length; i++){
        dict = {}
        duplicate = 0
        max = 0
        for(let j = i + 1; j < arr.length; j++){
            if (arr[j][0] - arr[i][0] == 0 && arr[j][1] - arr[i][1] == 0){
                duplicate += 1
            }
            let m = (arr[j][0] - arr[i][0] != 0) ? gradient(arr[i][0], arr[j][0], arr[i][1], arr[j][1]) : Infinity
            if(dict[m] == undefined){
                dict[m] = 1
            }else{
                dict[m] += 1
            }
            max = Math.max(max, dict[m])
        }
        result = Math.max(max+duplicate+1, result)
    }
    return result
}

console.log(maxpt3([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]))


//Solution 4 : Another equation (Traingle area = 0 == collinear)
// Time complexity is O(n^3)
// Space complexity is O(1)

let maxpt4 = arr => {
    if(arr.length <= 2) return arr.length
    let result = 0
    for(let i = 0; i < arr.length; i++) {
        let duplicate = 1
        for(let j = i + 1; j < arr.length; j++){
            let max = 0
            let x1 = arr[i][0]
            let x2 = arr[j][0]
            let y1 = arr[i][1]
            let y2 = arr[j][1]
            if(x1 == x2 && y1 == y2) duplicate += 1
            for(let k = 0; k < arr.length; k++){
                let x3 = arr[k][0]
                let y3 = arr[k][1]
                if(collinear(x1,x2,x3,y1,y2,y3)) max += 1
            }
            result = Math.max(result, max)
        }
        result = Math.max(result, duplicate)
    }
    return result

}

let collinear = (x1,x2,x3,y1,y2,y3) => {
    return ((x1*y2 + x2*y3 + x3*y1 - x3*y2 - x2*y1 - x1*y3) == 0) ? true : false;
    
}

console.log(maxpt4([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]))

