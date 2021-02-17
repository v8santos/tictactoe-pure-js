const cellGroup = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.restart');
const title = document.querySelector('.winner');
const winCases = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

class Player{
    constructor(value,player){
        this.marked = [];
        this.value = value;
        this.player = player;
    }
    mark(index){
        
        this.marked.push(index);
    }
}

let player1 = new Player('x',1);
let player2 = new Player('o',2);

let marked = [];
let win = false;
let turn = [player1,player2]; // ['x','o']

cellGroup.forEach((cell,index)=>{
    cell.addEventListener('click',event=>{
        if(marked.includes(index) || win){
            return
        };
        
        marked.push(index);
        turn[0].mark(parseInt(index));
        if(turn[0].value ==='x'){
            cell.innerHTML = '<img src="./assets/cross.svg" alt="">';
        }else if(turn[0].value === 'o'){
            cell.innerHTML = '<img src="./assets/circle.svg" alt="">';
        }

        winCases.forEach(cases=>{
            let in0 = turn[0].marked.includes(cases[0]);
            let in1 = turn[0].marked.includes(cases[1]);
            let in2 = turn[0].marked.includes(cases[2]);
            if(in0 && in1 && in2){
                win = true;
                console.log('Player', turn[0].value ,'winner');
                title.innerHTML = 'Player '+turn[0].player+' win';
                cellGroup[cases[0]].classList.add('marked');
                cellGroup[cases[1]].classList.add('marked');
                cellGroup[cases[2]].classList.add('marked');
            }
        });
        
        turn = turn.reverse();
    });
    restartButton.addEventListener('click',event=>{
        cell.innerHTML = '';
        cell.classList.remove('marked');
        marked = [];
        win = false;
        player1.marked = [];
        player2.marked = [];
        title.innerHTML = '';
    });
});