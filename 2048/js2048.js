/**
 * Created by Jet on 15.06.2017.
 */
var globalCount = 0;
let rows = [];
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

for (let key in rows) {
    $(rows[key]).addClass('backgrondCell');
    $(rows[key]).addClass('animated');
}

$('table').addClass('click-table');
$('tr').css('height', '75px');
$('tr').css('width', '90px');
$('td').css('height', '75px');
$('td').css('width', '90px');


function createSpell() {
    let rand = 0;
    let nullCount = 0;
    for (let key in rows) {
        for (let key2 in rows[key]) {
            $(rows[key][key2]).html() === '' ? nullCount++ : nullCount;
        }

    }
    if (nullCount !== 0) {
        let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4);
        if ($(rows[x][y]).html() == '') {
            Math.floor(Math.random() * 1000) < 700 ? rand = 2 : rand = 4;
            $(rows[x][y]).addClass('.animatedCreateCell');
            $(rows[x][y]).append(rand).addClass('spell' + rand);
        } else {
            createSpell();
        }
    } else {
        alert("Вы проиграли!");
    }
}

createSpell();
createSpell();


function shiftCell(currentMas) {
    let nullCells = 0;
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
                    let classA = $(currentMas[i - k]).attr('class'),
                        valueCell;
                    classA = parseInt(classA.replace(/\D/g, ''));
                    if (classA > 256) {
                        valueCell = classA;
                        classA = 512
                    } else {
                        valueCell = classA;
                    }

                    $(currentMas[i - 1 - k]).html(valueCell).attr('class', 'spell' + classA);
                    $(currentMas[i - k]).html('').attr('class', 'backgrondCell').addClass('animated');
                    count++;

                }
            }
        }
    }
    window.globalCount += count;

}

function unionCell(currentMas) {
    let nullCells = 0;
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
                let valueCell;
                let sum = parseInt(classA.replace(/\D/g, '')) + parseInt(classB.replace(/\D/g, ''));
                if (sum > 256) {
                    valueCell = sum;
                    sum = 512
                } else {
                    valueCell = sum;
                }
                $(previousCell).html(valueCell).attr('class', 'spell' + sum);
                $(currentCell).html('').attr('class', 'backgrondCell').addClass('animated');
                counter++;
            }
        }
        shiftCell(currentMas);
    }
    window.globalCount += counter;
}

document.body.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case  37:

            for (let i = 0; i < rows.length; i++) {
                shiftCell(rows[i]);
                unionCell(rows[i]);
            }

            globalCount !== 0 ? createSpell() : globalCount;
            globalCount = 0;
            break

        case 38:

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
            break

        case 39:


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
            break

        case 40:

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
            break
    }
});

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

let gesuredZone = document.getElementById('gesuredZone');

gesuredZone.addEventListener('touchstart', function (event) {
    touchstartX = event.screenX;
    touchstartY = event.screenY;
}, false);

gesuredZone.addEventListener('touchend', function (event) {
    touchendX = event.screenX;
    touchendY = event.screenY;
    handleGesure();
}, false);

function handleGesure() {
    let swiped = 'swiped: ';
    if (touchendX < touchstartX) {
        for (let i = 0; i < rows.length; i++) {
            shiftCell(rows[i]);
            unionCell(rows[i]);
        }

        globalCount !== 0 ? createSpell() : globalCount;
        globalCount = 0;
    }
    if (touchendX > touchstartX) {
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
    if (touchendY < touchstartY) {
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
    if (touchendY > touchstartY) {
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
    if (touchendY == touchstartY) {
      
    }
}
