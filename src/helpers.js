export function zip(arr){
    const tempArr = [];
    for(let i =0; i < arr.length; i += 2){

        tempArr[tempArr.length] = [];
        arr[i] && tempArr[tempArr.length - 1].push(arr[i]);
        arr[i + 1] && tempArr[tempArr.length - 1].push(arr[i + 1])
    }
    return tempArr;
}