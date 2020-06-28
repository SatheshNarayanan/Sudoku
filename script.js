var container = document.getElementById("container")

function matrixCreator(matrix){

let span1 =  document.createElement('input')
span1.id = matrix +'one'

let span2 =  document.createElement('input')
span2.id = matrix + 'two'

let span3 =  document.createElement('input')
span3.id = matrix + 'three'

let span4 =  document.createElement('input')
span4.id = matrix + 'four'

let span5 =  document.createElement('input')
span5.id = matrix + 'five'

let span6 =  document.createElement('input')
span6.id = matrix + 'six'

let span7 =  document.createElement('input')
span7.id = matrix + 'seven'

let span8 =  document.createElement('input')
span8.id = matrix + 'eight'

let span9 =  document.createElement('input')
span9.id = matrix + 'nine'

let maxtrixName = matrix
matrix =  document.createElement('div')
matrix.id = maxtrixName;
matrix.setAttribute('class','tic')

matrix.appendChild(span1);
matrix.appendChild(span2);
matrix.appendChild(span3);
matrix.appendChild(span4);
matrix.appendChild(span5);
matrix.appendChild(span6);
matrix.appendChild(span7);
matrix.appendChild(span8);
matrix.appendChild(span9);

container.appendChild(matrix)
}

matrixCreator("matrix1")
matrixCreator("matrix2")
matrixCreator("matrix3")
matrixCreator("matrix4")
matrixCreator("matrix5")
matrixCreator("matrix6")
matrixCreator("matrix7")
matrixCreator("matrix8")
matrixCreator("matrix9")

let buttondiv = document.getElementById('buttons')

let submit =  document.createElement('button')
submit.id = 'submit'
submit.innerHTML = 'Submit'
submit.setAttribute('onclick','submitData(timerCounter)')
buttondiv.appendChild(submit)

let time =  document.createElement('p')
time.id = 'timer'
time.innerHTML = '4:00'
time.setAttribute('style','margin-left : 2%')
buttondiv.appendChild(time)

//Div for displaying the Output of the game
let bodyofDoc = document.getElementById('body')

let divis = document.createElement('div')
divis.id = 'overlay'
divis.innerHTML = "Lets Play Sudoku!!"
bodyofDoc.append(divis);

let start =  document.createElement('button')
start.id = 'start'
start.innerHTML = 'Start'
start.setAttribute('onclick','startGame()')

let restart =  document.createElement('button')
restart.id = 'restart'
restart.innerHTML = 'Restart game '
restart.setAttribute('onclick','restartGame()');

let breaks =  document.createElement('br');
divis.appendChild(start);

var timerCounter = 240

const timerFunc = (minutes,seconds) => {
    if(seconds%60 == 0){
        minutes-=1
        seconds = 59}
    else
        seconds= seconds-1;

    return minutes +   (((seconds < 10) ? (':0'+seconds) : (':'+seconds)));
}

function restartGame() {
    localStorage.setItem("startG", "yes");
    //localStorage.setItem("startG", "yes");
window.location.reload();
}

function endGame(score) {
    var highscore = parseInt((typeof localStorage.getItem("highscore") == "undefined")  ? 0 : localStorage.getItem("highscore"));
    highscore = isNaN(highscore) ? 0: highscore;
    if((score >= highscore) && (score > 0)){
        localStorage.setItem("highscore", parseInt(score));
    divis.innerHTML = `Great Man!! <br> Your have the new HighScore ${localStorage.highscore}`;
    }
    else
    divis.innerHTML = `Your score is ${score} <br> Highscore : ${highscore}`;

    divis.appendChild(restart);
    divis.setAttribute('style', 'visibility:visible');
}

function startGame() {

    divis.setAttribute('style', 'visibility:hidden')

    var oneTimer = setInterval(() => {
    timerCounter -= 1;
    let minutes = parseInt(time.innerHTML.slice(0)), seconds = parseInt(time.innerHTML.slice(-2));
    let data = timerFunc(minutes,seconds)
    time.innerHTML = data;
    }, 1000);
    setTimeout(() => {
        clearInterval(oneTimer);
        submitData(timerCounter)
    },240000)
}


let matrix1 = document.getElementById("matrix1")
let matrix2 = document.getElementById("matrix2")
let matrix3 = document.getElementById("matrix3")
let matrix4 = document.getElementById("matrix4")
let matrix5 = document.getElementById("matrix5")
let matrix6 = document.getElementById("matrix6")
let matrix7 = document.getElementById("matrix7")
let matrix8 = document.getElementById("matrix8")
let matrix9 = document.getElementById("matrix9")

let array1 = [1,2,3,4,5,6,7,8,9],
    array2 = [1,4,6,5,3,2,7,9,8]

function arrayBind (output,model) {
    output = [0,0,0,0,0,0,0,0,0]
    for(i = 0; i< 5; i++){
        let num = Math.floor(Math.random() * (9))
        output[num] = model[num]
    }
    return output
}

let arr   = [0,0,0,0,0,0,0,0,0],
    one   = arrayBind(arr,array1),
    two   = arrayBind(arr,array1),
    three = arrayBind(arr,array1),
    four  = arrayBind(arr,array2),
    five  = arrayBind(arr,array2),
    six   = arrayBind(arr,array2),
    seven = arrayBind(arr,array1),
    eight = arrayBind(arr,array1),
    nine  = arrayBind(arr,array1)

const zeroCount = (array) => {
let zeros =  array.reduce((acc,curr) => {
if(curr > 0)
acc++;
return acc
},0)
return zeros;
}

const horizontalMatrix = (val,arrayInput) => {
    if(val <=2){
        return arrayInput.slice(0,3)
}else if(val<=5){
       return arrayInput.slice(3,6)
}else{
        return arrayInput.slice(6,9)
}
}

const  arrayHor1 = (array,array1) =>{
array.forEach(val => {
    let rep = array.indexOf(val)
    let ar1 = [];
    if(val !== 0){
        ar1 = horizontalMatrix(rep,array1)
    if( ar1.includes(val))
        array[rep] = 0;
    }})
let count1 = zeroCount(array) 
if(count1 > 3)
return array 
else
{
array = arrayBind([],array2)
return arrayHor1(array,array1)
}
}

two = arrayHor1(two,one)

const  arrayHor2 = (array,array1,array2) => {
let count = 0
array.forEach(val => {
let rep = array.indexOf(val)
let ar1 = [];
let ar2 = [];
if(val !== 0){
    ar1 = horizontalMatrix(rep,array1);
    ar2 = horizontalMatrix(rep,array2);
if( (ar1.includes(val)) || (ar2.includes(val))){
    array[rep] = 0;}
}})
return array 
}

try {
three = arrayHor2([1,4,0,3,7,6,0,5,9],one,two)
}
catch(err) {
window.location.reload();
}

const verticalMatrix = (val,arrayInput) => {
    if((val == 0) || (val == 3) || (val == 6)){
        return  [arrayInput[0],arrayInput[3],arrayInput[6]]
}else if((val == 1) || (val == 4) || (val == 7)){
        return [arrayInput[1],arrayInput[4],arrayInput[7]]
}else{
        return [arrayInput[2],arrayInput[5],arrayInput[8]]
}
}

const arraysVer1 = (array,arr1) =>{
array.forEach(val => {
let rep = array.indexOf(val)
let ar1 = [];
if(val !== 0){
    ar1 = verticalMatrix(rep,arr1)
if( ar1.includes(val))
array[rep] = 0;
}})
let count1 = zeroCount(array) 
if(count1 > 3)
return array 
else
{
array = arrayBind([],array2)
return arraysVer1(array,arr1)
}
}

try {
four = arraysVer1(four,one)
}
catch(err) {
window.location.reload();
}

const arraysVertHorz = (array,arr1,arr2) => {
array.forEach(val => {
let rep = array.indexOf(val)
let ar1 = [];
let ar2 = [];
if(val !== 0){
    ar1 = verticalMatrix(rep,arr1)
    ar2 = horizontalMatrix(rep,arr2)
if( (ar1.includes(val)) || (ar2.includes(val)))
array[rep] = 0;
}})
return array 
}

try {
five = arraysVertHorz([1,2,4,6,0,8,0,9,5],two,four)
}
catch(err) {
window.location.reload();
}

const arraysVertHorz2 = (array,arr1,arr2,arr3) => {
array.forEach(val => {
let rep = array.indexOf(val)
let ar1 = [];
let ar2 = [];
let ar3 = [];
if(val !== 0){
    ar1 = verticalMatrix(rep,arr1)
    ar2 = horizontalMatrix(rep,arr2)
    ar3 = horizontalMatrix(rep,arr3)
if( (ar1.includes(val)) || (ar2.includes(val)) || (ar3.includes(val)))
    array[rep] = 0;
}})
return array 
}

try {
six = arraysVertHorz2([1,6,2,3,5,0,7,0,9],three,five,four)
}
catch(err) {
window.location.reload();
}


const arraysVert2 = (array,arr1,arr2) =>{
array.forEach(val => {
let rep = array.indexOf(val)
let ar1 = [];
let ar2 = [];
if(val !== 0){
    ar1 = verticalMatrix(rep,arr1);
    ar2 = verticalMatrix(rep,arr2);
if( (ar1.includes(val)) || (ar2.includes(val))) 
array[rep] = 0;
}})
return array 
}
seven = arraysVert2([0,0,3,5,0,2,1,0,7],four,one)


const arraysVert2Hor = (array,arr1,arr2,arr3) => {
array.forEach(val => {
let rep = array.indexOf(val)
let ar1 = [];
let ar2 = [];
let ar3 = []
if(val !== 0){
    ar1 = verticalMatrix(rep,arr1);
    ar2 = verticalMatrix(rep,arr2);
    ar3 = horizontalMatrix(rep,arr3);

if( (ar1.includes(val)) || (ar2.includes(val)) || (ar3.includes(val))) 
array[rep] = 0;
}})
let count1 = zeroCount(array) 
if(count1 > 3)
return array 
else
{
array = arrayBind([],array1)
return arraysVert2Hor(array,arr1,arr2,arr3)
}
}

try {
    eight = arraysVert2Hor(eight,five,two,seven)
}
catch(err) {
window.location.reload();
}


function arraysVert2Hor2(array,arr1,arr2,arr3,arr4) {
array.forEach(val => {
let rep = array.indexOf(val)
let ar1 = [];
let ar2 = [];
let ar3 = [];
let ar4 = [];
if(val !== 0){
    ar1 = verticalMatrix(rep,arr1);
    ar2 = verticalMatrix(rep,arr2);
    ar3 = horizontalMatrix(rep,arr3);
    ar4 = horizontalMatrix(rep,arr4);

if( (ar1.includes(val)) || (ar2.includes(val)) || (ar3.includes(val)) || (ar4.includes(val))) 
array[rep] = 0;
}})
return array 
}

try {
    nine = arraysVert2Hor2([1,7,3,5,9,2,4,8,6],three,six,seven,eight)
}
catch(err) {
window.location.reload();
}

function arrayForm (arrayPos,matrices){
arrayPos.forEach( values => {
let index = arrayPos.indexOf(values);
if(values !== 0){
    matrices.childNodes[index].value = values;
    matrices.childNodes[index].disabled = true;
    matrices.childNodes[index].style.backgroundColor= "black";
}
} )
}

arrayForm(one,matrix1);
arrayForm(two,matrix2);
arrayForm(three,matrix3);
arrayForm(four,matrix4);
arrayForm(five,matrix5);
arrayForm(six,matrix6)
arrayForm(seven,matrix7);
arrayForm(eight,matrix8);
arrayForm(nine,matrix9);


const submitData = (timerCounter) =>{
let containerOut = [...container.childNodes]

const removeDuplicate = (a,b,c) => {
            if ((c.indexOf(a) === b) && (a > 0) && (a<10))
                return a;
            else
                return 
            }

 let finalisedArray = containerOut.reduce((acc,val) => {
     let values = [...val.childNodes]
        acc = [...acc,values.reduce( (arr,data) =>{
            arr = [...arr,isNaN(parseInt(data.value))? 0 : parseInt(data.value) ]
            return arr
        },[])]
        return acc
    },[])
    let pointFactor = 100;
    finalisedArray.forEach(val => {
    if(val.length > 0){
       let filArray =  val.filter( (a,b,c) => removeDuplicate(a,b,c));
     if(filArray.length < 9){
        pointFactor-=3.7
     }}       
    })
    

console.log(finalisedArray)
        let array1 = []
        let array2 = []
        let array3 = []

        let array4 = []
        let array5 = []
        let array6 = []
    for(let i = 1; i< 10; i++){
      
        for(let j = 0; j<3;j++){
           array1.push(finalisedArray[i][j])
        if((j == 0) && ((i == 0) || (i == 3) || (i == 6)))
            array4.push(finalisedArray[i][j])
        else if((j == 1)  && ((i == 1) || (i == 4) || (i == 7)))
            array5.push(finalisedArray[i][j])
        else if ((j == 2) && ((i == 2) || (i == 5) || (i == 8)))
            array6.push(finalisedArray[i][j])
        }
        for(let j = 3; j<6;j++){
           array2.push(finalisedArray[i][j])
        if((j == 3) && ((i == 0) || (i == 3) || (i == 6)))
            array4.push(finalisedArray[i][j])
        else if((j == 4)   && ((i == 1) || (i == 4) || (i == 7)))
            array5.push(finalisedArray[i][j])
        else if ((j == 5) && ((i == 2) || (i == 5) || (i == 8)))
            array6.push(finalisedArray[i][j])
        }
        for(let j = 6; j<9;j++){
           array3.push(finalisedArray[i][j])
        if((j == 6)   && ((i == 0) || (i == 3) || (i == 6)))
            array4.push(finalisedArray[i][j])
        else if((j == 7) && ((i == 1) || (i == 4) || (i == 7)))
            array5.push(finalisedArray[i][j])
        else if ((j == 8) && ((i == 2) || (i == 5) || (i == 8)))
            array6.push(finalisedArray[i][j])
        }
        if((i % 3) == 0){
           let filArray1 =  array1.filter((a,b,c) => removeDuplicate(a,b,c));
            if(filArray1.length < 9)
            pointFactor-=3.7 
            array1 = [];   

            let filArray2 =  array2.filter((a,b,c) => removeDuplicate(a,b,c));
            if(filArray2.length < 9)
            pointFactor-=3.7 
            array2 = []; 

            let filArray3 =  array3.filter((a,b,c) => removeDuplicate(a,b,c));
            if(filArray3.length < 9)
            pointFactor-=3.7 
            array3 = []; 

        }
        if((i == 7) || (i == 8) || (i == 9)){
            let filArray4 =  array4.filter((a,b,c) => removeDuplicate(a,b,c));
            if(filArray4.length < 9)
            pointFactor-=3.7 
            array4 = [];   
            let filArray5 =  array5.filter((a,b,c) => removeDuplicate(a,b,c));
            if(filArray5.length < 9)
            pointFactor-=3.7 
            array5 = []; 
            let filArray6 =  array6.filter((a,b,c) => removeDuplicate(a,b,c));         
            if(filArray6.length < 9)
            pointFactor-=3.7 
            array6 = [];  
            
        }
    
}
console.log(pointFactor , timerCounter);
let score = 0
    if(((timerCounter<180) || (timerCounter<120) || (timerCounter<60)) && pointFactor > 50)
        score = (pointFactor * (timerCounter+30));
    else
    score = (((pointFactor<1) ? 0: pointFactor) * (timerCounter));
    endGame(score);
    }

var starts = (typeof localStorage.getItem("startG") == undefined) ? 'No' : localStorage.getItem("startG");
console.log(starts)
if(starts == "yes"){
    divis.setAttribute('style', 'visibility:hidden')
    localStorage.setItem("startG", "No");
    startGame();
}