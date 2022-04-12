var arr = [1,2,3,2,1,3,4,2,5];
// function kill(arr){
//     var newarr = [];
//     for(i=0;i<arr.length;i++){
//         newarr.push(arr[i]);
//         for(j=0;j<newarr.length;j++){
//             if(newarr[j] == arr[i]){
//                 newarr.splice(newarr[j],newarr[j+1]);
//             }
//         }
//     }
//     return newarr;
// }
// var result = kill(arr);
// console.log(result);

for(i=0;i<arr.length;i++){
    for(j=i+1;j<arr.length;j++){
        if(arr[i] == arr[j]){
            arr.splice(j,1);
            j--;
        }
    }
}
console.log(arr);