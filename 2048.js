var board;
var rows = 4;
var columns = 4;
var score = 0;
function setBoard() {
    var _a;
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            var tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            var num = board[i][j];
            updateTile(tile, num);
            (_a = document.getElementById("board")) === null || _a === void 0 ? void 0 : _a.append(tile);
        }
    }
    setTwo();
    setTwo();
}
function updateTile(tile, num) {
    if (tile) {
        tile.innerHTML = "";
        tile.classList.value = "";
        tile.classList.add("tile");
        if (num > 0) {
            tile.classList.add("score" + num.toString());
            tile.innerHTML = num.toString();
        }
        if (num > 0) {
            tile.innerText = num.toString();
            if (num <= 4096) {
                tile.classList.add("score" + num.toString());
            }
            else {
                tile.classList.add("score8192");
            }
        }
    }
}
function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    var found = false;
    while (!found) {
        var r = Math.floor(Math.random() * rows);
        var c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            var tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("score2");
            found = true;
        }
    }
}
function hasEmptyTile() {
    var count = 0;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}
document.addEventListener("keydown", function (e) {
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
    var scoreElement = document.getElementById("score");
    if (scoreElement !== null) {
        scoreElement.innerText = score.toString();
    }
});
function filterZeroes(row) {
    return row.filter(function (k) { return k != 0; });
}
function slide(row) {
    row = filterZeroes(row);
    for (var i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
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
    for (var i = 0; i < rows; i++) {
        var row = board[i];
        row = slide(row);
        board[i] = row;
        for (var j = 0; j < columns; j++) {
            var tile = document.getElementById(i.toString() + "-" + j.toString());
            var num = row[j];
            updateTile(tile, num);
        }
    }
}
function slideRight() {
    for (var i = 0; i < rows; i++) {
        var row = board[i];
        row.reverse();
        row = slide(row);
        board[i] = row.reverse();
        for (var j = 0; j < columns; j++) {
            var tile = document.getElementById(i.toString() + "-" + j.toString());
            var num = board[i][j];
            updateTile(tile, num);
        }
    }
}
function slideUp() {
    for (var i = 0; i < columns; i++) {
        var row = [board[0][i], board[1][i], board[2][i], board[3][i]];
        row = slide(row);
        for (var j = 0; j < rows; j++) {
            board[j][i] = row[j];
            var tile = document.getElementById(j.toString() + "-" + i.toString());
            var num = board[j][i];
            updateTile(tile, num);
        }
    }
}
function slideDown() {
    for (var i = 0; i < columns; i++) {
        var row = [board[0][i], board[1][i], board[2][i], board[3][i]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (var j = 0; j < rows; j++) {
            board[j][i] = row[j];
            var tile = document.getElementById(j.toString() + "-" + i.toString());
            var num = board[j][i];
            updateTile(tile, num);
        }
    }
}
setBoard();
