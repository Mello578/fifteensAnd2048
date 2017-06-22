/**
 * Created by Jet on 15.06.2017.
 *
 */

$('#best').html('BEST <br>' + 0);
$('#score').html('SCORE <br>' + 0);

// счетчик на перемещение и складывание ячеек. Если ячейки не складывались и соединялись, то новая ячейка не создается
let countCell = 0;
// проверка на выигрыш
let winCell = 0;
var rows = [];
var table = document.createElement('table'),
    fragment = document.createDocumentFragment(),
    r = 4, c;
table.id = 'table';

while (r--) {
    var cells = [];
    rows.push(cells)

    tr = table.insertRow(-1);
    c = 4;
    while (c--) {
        var cell = tr.insertCell(-1);
        cells.push(cell);
    }
}
document.body.appendChild(fragment.appendChild(table));


$('table').addClass('click-table');
$('tr').css('height', '75px');
$('tr').css('width', '90px');
$('td').css('height', '75px');
$('td').css('width', '90px');

for (let key in rows) {
    for (let key2 in rows[key]) {
        $(rows[key][key2]).addClass('backgrondCell');
        $(rows[key][key2]).addClass('animated');
    }
}

/** функция считает количество очков
 *
 * @param counter сумма складываемых ячеек
 */
function countScore(counter) {
    let score = 'SCORE <br>';
    let scoreBest = 'BEST <br>';
    let currentScore = $('#score').html();
    let currentBestScore = $('#best').html();
    currentScore = parseInt(currentScore.replace(/\D/g, ''));
    currentBestScore = parseInt(currentBestScore.replace(/\D/g, ''));
    let sumCount = counter + currentScore;
    $('#score').html(score + sumCount);
    sumCount > currentBestScore ? $('#best').html(scoreBest + sumCount) : currentScore;

}

$(document).ready(function(){


$('.repeat').html('Продолжить ?').attr('onclick', 'close_func()');
$('.noRepeat').attr('onclick', 'close_func()').attr('return', 'false');
setTimeout('$("#lose_1").attr("class", "b-popup")', 500);
setTimeout('$("#lose_2").attr("class", "b-popup-content").html("Вы ВЫИГРАЛИ")', 500);
setTimeout('$(".repeat").css("display","block")', 500);
setTimeout('$(".noRepeat").css("display","block")', 500);
});
/**
 *   проверка на проигрыш
 */
function gameOver() {
    let countEqual = 0;
    for (let i = 0; i < rows.length; i++) {
        for (let j = 1; j < rows.length; j++) {
            $(rows[i][j]).html() === $(rows[i][j - 1]).html() ? countEqual++ : countEqual;
            $(rows[j][i]).html() === $(rows[j - 1][i]).html() ? countEqual++ : countEqual;
            $(rows[i][j]).html() === '' ? countEqual++ : countEqual;
            $(rows[i][j - 1]).html() === '' ? countEqual++ : countEqual;

        }
    }
    if (countEqual === 0) {
        $('.repeat').attr('onclick', 'restartGame()').html('Заново ?');
        $('.noRepeat').attr('onclick', 'close_func()').attr('return', 'false');
        setTimeout('$("#lose_1").attr("class", "b-popup")', 2000);
        setTimeout('$("#lose_2").attr("class", "b-popup-content").html("Вы ПРОИГРАЛИ")', 2000);
        setTimeout('$(".repeat").css("display","block")', 2000);
        setTimeout('$(".noRepeat").css("display","block")', 2000);

    }
}

/**
 *   Создание фишки
 */
function createSpell() {
    let rand = 0;

    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);

    if ($(rows[x][y]).html() == '') {
        Math.floor(Math.random() * 1000) < 700 ? rand = 2 : rand = 4;
        $(rows[x][y]).addClass('.animatedCreateCell');
        $(rows[x][y]).append(rand).addClass('spell' + rand);
        gameOver();
    } else {
        createSpell();
    }
}

createSpell();
createSpell();

function restartGame() {
    close_func();
    window.winCell = 0;
    let score = 'SCORE <br>';
    $('#score').html(score + 0);
    for (let key in rows) {
        for (let key2 in rows[key]) {
            $(rows[key][key2]).attr('class', 'backgrondCell').addClass('animated').html('');
        }
    }
    createSpell();
    createSpell();
}

/**
 * убираем затемнение
 */
function close_func() {
    $("#lose_1").attr("class", "");
    $("#lose_2").attr("class", "").html("");
    $(".repeat").css("display", "none");
    $(".noRepeat").css("display", "none");
}


/** функция проверяет свободные клетки и сдвигает ячейки с числами
 *
 * @param currentMas  передаем массив ячеек (строку или столбец)
 */
function shiftCell(currentMas) {
    let nullCells = 0;
    // счетчик на движение, если равен нулю, значит ни одна фишка не сдвинулась
    let count = 0;
    for (let i = 0; i < currentMas.length; i++) {
        $(currentMas[i]).html() === '' ? nullCells++ : nullCells;
    }
    if (nullCells < 4) {
        let countNull = $(currentMas[0]).html() === '' ? 1 : 0;
        for (let i = 1; i < currentMas.length; i++) {
            let currentCell = currentMas[i];
            $(currentCell).html() === '' ? countNull++ : countNull;
            if ($(currentCell).html() !== '') {
                for (let k = 0; k < countNull; k++) {
                    let classA = $(currentMas[i - k]).attr('class');
                    let valueCell;
                    classA = parseInt(classA.replace(/\D/g, ''));

                    classA > 256 ? classA = 512 : classA;

                    valueCell = $(currentMas[i - k]).html();
                    $(currentMas[i - 1 - k]).html(valueCell).attr('class', 'spell' + classA);
                    $(currentMas[i - k]).html('').attr('class', 'backgrondCell').addClass('animated');
                    count++;

                }
            }
        }
    }
    window.globalCount += count;

}

/** функция проверяет рядомстоящие ячейки и если они одиннаковые, объеденяет их
 *
 * @param currentMas  передаем массив ячеек (строку или столбец)
 */
function unionCell(currentMas) {
    let nullCells = 0;
    //счетчик на количество объеденений
    let counter = 0;
    for (let i = 0; i < currentMas.length; i++) {
        $(currentMas[i]).html() === '' ? nullCells++ : nullCells;
    }
    if (nullCells < 4) {
        for (let i = 1; i < currentMas.length; i++) {
            let currentCell = currentMas[i],
                previousCell = currentMas[i - 1];
            if ($(currentCell).html() === $(previousCell).html() && $(currentCell).html() !== '') {
                let classA = $(previousCell).attr('class');
                let classB = $(currentCell).attr('class');
                let valueCell, valueA, valueB;
                let sum = parseInt(classA.replace(/\D/g, '')) + parseInt(classB.replace(/\D/g, ''));
                valueA = $(currentCell).html();
                valueB = $(previousCell).html();
                valueCell = parseInt(valueA) + parseInt(valueB);
                sum > 256 ? sum = 512 : sum;
                $(previousCell).html(valueCell).attr('class', 'spell' + sum);
                $(currentCell).html('').attr('class', 'backgrondCell').addClass('animated');
                 if (valueCell === 2048 && winCell === 0) {

                    window.winCell++;
                    $('.repeat').html('Продолжить ?').attr('onclick', 'close_func()');
                    $('.noRepeat').attr('onclick', 'close_func()').attr('return', 'false');
                    setTimeout('$("#lose_1").attr("class", "b-popup")', 500);
                    setTimeout('$("#lose_2").attr("class", "b-popup-content").html("Вы ВЫИГРАЛИ")', 500);
                    setTimeout('$(".repeat").css("display","block")', 500);
                    setTimeout('$(".noRepeat").css("display","block")', 500);


                }
                counter++;
                countScore(sum);
            }
        }
        shiftCell(currentMas);
    }
    window.globalCount += counter;
}

function leftSwipe() {
    for (let i = 0; i < rows.length; i++) {
        shiftCell(rows[i]);
        unionCell(rows[i]);
    }

    // проверка на движение ячеек, если они сдвигались или объеденялись, то создаем новую ячейку с цифрой
    globalCount !== 0 ? createSpell() : globalCount;
    globalCount = 0;
}

function upSwipe() {
    for (let j = 0; j < rows.length; j++) {
        let rowsUp = [];
        for (let i = 0; i < rows.length; i++) {
            rowsUp.push(rows[i][j]);
        }
        shiftCell(rowsUp);
        unionCell(rowsUp);
    }
    globalCount !== 0 ? createSpell() : globalCount;
    globalCount = 0;
}

function rightSwipe() {
    for (let i = 0; i < rows.length; i++) {
        let rowsRight = [];
        for (let j = rows.length - 1; j > -1; j--) {
            rowsRight.push(rows[i][j]);
        }
        shiftCell(rowsRight);
        unionCell(rowsRight);
    }
    globalCount !== 0 ? createSpell() : globalCount;
    globalCount = 0;
}

function downSwipe() {
    for (let j = 0; j < rows.length; j++) {
        let rowsDown = [];
        for (let i = rows.length - 1; i > -1; i--) {
            rowsDown.push(rows[i][j]);
        }
        shiftCell(rowsDown);
        unionCell(rowsDown);
    }
    globalCount !== 0 ? createSpell() : globalCount;
    globalCount = 0;
}


/**
 * обработчик нажатия клавиш
 */

document.body.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case  37:

            leftSwipe();
            break

        case 38:

            upSwipe();
            break

        case 39:

            rightSwipe();
            break

        case 40:

            downSwipe();
            break
    }
});

document.addEventListener('touchend',function(e){
    e.preventDefault();
    e.target.click();
},false);
document.addEventListener('click', someFunction,false);

    let initialPoint;
    let finalPoint;

    document.addEventListener('touchstart', function (event) {
        event.preventDefault();
        event.stopPropagation();
        initialPoint = event.changedTouches[0];
    }, false);
    document.addEventListener('touchend', function (event) {
        event.preventDefault();
        event.stopPropagation();
        finalPoint = event.changedTouches[0];
        var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
        if (xAbs > 20 || yAbs > 20) {
            if (xAbs > yAbs) {
                if (finalPoint.pageX < initialPoint.pageX) {
                    leftSwipe();
                }
                else {
                    rightSwipe();

                }
            }
            else {
                if (finalPoint.pageY < initialPoint.pageY) {
                    upSwipe();

                }
                else {
                    downSwipe();

                }
            }
        }

    }, false);









