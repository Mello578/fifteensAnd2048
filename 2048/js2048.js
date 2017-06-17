/**
 * Created by Jet on 15.06.2017.
 */
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

for (let key in rows){
    $(rows[key]).addClass('backgrondCell');
  }

$('table').addClass('click-table');
$('tr').css('height', '90px');
$('tr').css('width', '90px');
$('td').css('height', '90px');
$('td').css('width', '90px');


function creatSpell() {
    let rand = 0;
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);
    if ($(rows[x][y]).html() == '') {
        Math.floor(Math.random() * 1000) < 700 ? rand = 2 : rand = 4;
        $(rows[x][y]).append(rand).addClass('spell' + rand);
    } else {
        creatSpell();
    }
}

creatSpell();
creatSpell();

function unionCell(currentCell, previousCell) {
    if ($(currentCell).html() === $(previousCell).html() && $(currentCell).html() !== '') {
        let classA = $(previousCell).attr('class');
        let classB = $(currentCell).attr('class');
        let sum = parseInt(classA.replace(/\D/g, '')) + parseInt(classB.replace(/\D/g, ''));
        $(previousCell).html(sum).attr('class', 'spell' + sum);
        $(currentCell).html('').attr('class', 'backgrondCell');
    }
}

function shiftCellY(currentCell, previousCell) {

        unionCell(currentCell, previousCell);
        if ($(previousCell).html() === '' && $(currentCell).html() !== '') {
            let classA = $(currentCell).attr('class');
            classA = parseInt(classA.replace(/\D/g, ''));
            $(previousCell).html(classA).attr('class', 'spell' + classA);
            $(currentCell).html('').attr('class', 'backgrondCell');
            unionCell(currentCell, previousCell);
        }

}

document.body.addEventListener("keydown", function(event) {
    switch (event.keyCode) {
        case  37:

            for (let i = 0; i < rows.length; i++) {
                let counterNull = 1,
                    counter = 0;
                for (let j =  0; j < rows.length; j++) {
                    $(rows[i][j]).html() === '' ? counterNull++ : counter++;
                    if (counter > 0) {
                        for (let k = 0; k < counterNull; k++) {
                            shiftCellY(rows[i][j - k], rows[i][j - k - 1]);
                        }
                    }
                }
            }
            creatSpell();
            break

        case 38:

            for (let j = 0; j < rows.length; j++) {
                let counterNull = 1,
                    counter = 0;
                for (let i = 1; i < rows.length; i++) {
                    $(rows[i][j]).html() === '' ? counterNull++ : counter++;
                    if (counter > 0) {
                        for (let k = 0; k < counterNull; k++) {
                            shiftCellY(rows[i - k][j], rows[i - k - 1][j]);
                        }
                    }
                }
            }
            creatSpell();
            break

        case 39:

            for (let i = 0; i < rows.length; i++) {
                let counterNull = 1,
                    counter = 0;
                for (let j = rows.length - 2; j > -1; j--) {
                    $(rows[i][j]).html() === '' ? counterNull++ : counter++;
                    if (counter > 0) {
                        for (let k = 0; k < counterNull; k++) {
                            shiftCellY(rows[i][j + k], rows[i][j + k + 1]);
                        }
                    }
                }
            }
            creatSpell();
            break

        case 40:

            for (let j = 0; j < rows.length; j++) {
                let counterNull = 1,
                    counter = 0;
                for (let i = rows.length - 2; i > -1; i--) {
                    $(rows[i][j]).html() === '' ? counterNull++ : counter++;
                    if (counter > 0) {
                        for (let k = 0; k < counterNull; k++) {
                            shiftCellY(rows[i + k][j], rows[i + k + 1][j]);
                        }
                    }
                }
            }
            creatSpell();
            break
    }
});

