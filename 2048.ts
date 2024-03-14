let board: number[][];
let rows: number = 4;
let columns: number = 4;
let score: number = 0;

function setBoard(){

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            let num = board[i][j];
            updateTile(tile, num);
            document.getElementById("board")?.append(tile);
        }
    }

    setTwo();
    setTwo();
}

function updateTile(tile: HTMLDivElement, num: number){
    if (tile) { 
        tile.innerHTML = ""
        tile.classList.value = "";
        tile.classList.add("tile");
        if(num>0){
            tile.classList.add("score" + num.toString());
            tile.innerHTML = num.toString();
        }

        if (num > 0) {
            tile.innerText = num.toString();
            if (num <= 4096) {
                tile.classList.add("score"+num.toString());
            } else {
                tile.classList.add("score8192");
            }                
        }
    }
}


function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString()) as HTMLElement;
            tile.innerText = "2";
            tile.classList.add("score2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { 
                return true;
            }
        }
    }
    return false;
}

document.addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
    }
    setTwo();
    const scoreElement = document.getElementById("score");
    if (scoreElement !== null) {
        scoreElement.innerText = score.toString();
    }
})

function filterZeroes(row: number[]){
    return row.filter(k => k!=0)
}

function slide(row: number[]) {
    row = filterZeroes(row);
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } 
    row = filterZeroes(row); 
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    for (let i = 0; i < rows; i++) {
        let row = board[i];
        row = slide(row);
        board[i] = row;
        for (let j = 0; j < columns; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString()) as HTMLDivElement;
            let num = row[j];
            updateTile(tile, num);
        }
    }
}

function slideRight(){
    for (let i = 0; i < rows; i++) {
        let row = board[i];         
        row.reverse();              
        row = slide(row)            
        board[i] = row.reverse();   
        for (let j = 0; j < columns; j++){
            let tile = document.getElementById(i.toString() + "-" + j.toString()) as HTMLDivElement;
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let i = 0; i < columns;i++) {
        let row = [board[0][i], board[1][i], board[2][i], board[3][i]];
        row = slide(row);
        for (let j = 0; j < rows; j++){
            board[j][i] = row[j];
            let tile = document.getElementById(j.toString() + "-" + i.toString())  as HTMLDivElement;
            let num = board[j][i];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let i = 0; i < columns; i++) {
        let row = [board[0][i], board[1][i], board[2][i], board[3][i]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let j = 0; j < rows; j++){
            board[j][i] = row[j];
            let tile = document.getElementById(j.toString() + "-" + i.toString()) as HTMLDivElement;
            let num = board[j][i];
            updateTile(tile, num);
        }
    }
}

setBoard();