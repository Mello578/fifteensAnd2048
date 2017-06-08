/**
 * Created by Sysadmin on 18.05.2017.
 */

let rows = [], standartRows = [];


// создаем таблицу
window.onload = function () {
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
    $('tr').css('height', '127px');
    $('tr').css('width', '528px');
    $('td').css('height', '127px');
    $('td').css('width', '132px');

// создаем массив из пятнашек
    let specks = [{
        id: 1,
        speck: '<img src="img/1.png">'
    }, {
        id: 2,
        speck: '<img src="img/2.png">'
    }, {
        id: 3,
        speck: '<img src="img/3.png">'
    }, {
        id: 4,
        speck: '<img src="img/4.png">'
    }, {
        id: 5,
        speck: '<img src="img/5.png">'
    }, {
        id: 6,
        speck: '<img src="img/6.png">'
    }, {
        id: 7,
        speck: '<img src="img/7.png">'
    }, {
        id: 8,
        speck: '<img src="img/8.png">'
    }, {
        id: 9,
        speck: '<img src="img/9.png">'
    }, {
        id: 10,
        speck: '<img src="img/10.png">'
    }, {
        id: 11,
        speck: '<img src="img/11.png">'
    }, {
        id: 12,
        speck: '<img src="img/12.png">'
    }, {
        id: 13,
        speck: '<img src="img/13.png">'
    }, {
        id: 14,
        speck: '<img src="img/14.png">'
    }, {
        id: 15,
        speck: '<img src="img/15.png">'
    }, {
        id: 0,
        speck: ''
    }];

    //массив с правильным расположением ячеек
    for (let key in specks){
        standartRows.push(specks[key]);
    }

// заполняем поле пятнашками
    (function () {
        let oneSpeck, countSpeck = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                oneSpeck = specks[countSpeck];
                $(rows[i][j]).append(oneSpeck.speck);
                countSpeck++;
            }
        }
        }());

    //перемешивание ячеек

    function shufle() {

        let summ = 0;
        for (let i = 0; i < 1024; i++) {
            for (let key in rows) {
                let stringCells = rows[key];
                for (let key2 in stringCells) {
                    let columsCells = stringCells[key2];
                    if ($(columsCells).html() == '') {
                        let randY = Math.round(3 * Math.random()),
                            randX = Math.round(3 * Math.random());
                        if (randY != key && randX != key2) {
                            let content = $(rows[randY][randX]).html();
                            $(rows[key][key2]).append(content);
                            $(rows[randY][randX]).html('');
                        }
                    }
                }
            }
        }
        //проверка на сходимость
        let shufleTable = [];
        for (let key in rows) {
            let stringCells = rows[key];
            for (let key in stringCells) {
                let cells = stringCells[key];
                for (let key in specks) {
                    cells.innerHTML === specks[key].speck ? shufleTable.push(specks[key].id) : shufleTable;
                }
            }
        }
        for (let i = 0; i < shufleTable.length; i++) {
            let shufleId = shufleTable[i];
            for (let j = i + 1; j < shufleTable.length; j++) {
                shufleTable[j] != 0 && shufleTable[j] < shufleId ? summ++ : summ + 0;
            }
        }
        //4 - номер ряда пустой клетки
        (summ + 4)%2 !== 0 ? shufle() : summ;
    }

    // старт игры
    document.getElementById('START').onclick = function start() {
        shufle();
    }

}

$(document).ready(function() {
    $(function () {
        let x, y, number;
        $('.click-table td').on('click', function () {
            y = $(this).parent('tr').index();
            x = $(this).index();
            number = $(this).html();
            motionCell(y, x, number);

        });
    });
});

function motionCell(axisY, axisX, content) {
    if (content != "") {
        if (axisX !== 3 && $(rows[axisY][axisX + 1]).html() == "") {
            $(rows[axisY][axisX]).html("");
            $(rows[axisY][axisX + 1]).append(content);
        }
        if (axisX !== 0 && $(rows[axisY][axisX - 1]).html() == "") {
            $(rows[axisY][axisX]).html("");
            $(rows[axisY][axisX - 1]).append(content);
        }

        if (axisY !== 3 && $(rows[axisY + 1][axisX]).html() == "") {
            $(rows[axisY][axisX]).html("");
            $(rows[axisY + 1][axisX]).append(content);
        }
        if (axisY !== 0 && $(rows[axisY - 1][axisX]).html() == "") {
            $(rows[axisY][axisX]).html("");
            $(rows[axisY - 1][axisX]).append(content);
        }
    }
}

document.getElementById('FINISH').onclick = function finish() {
    let counter = 0, finishRows = [];
    for (let key in rows) {
        for (let key2 in rows[key]){
            finishRows.push(rows[key][key2].innerHTML);
        }
            }
            for (let key in finishRows){
                finishRows[key] === standartRows[key].speck ? counter++ : counter;
            }

    if (counter === 16) {
        alert('Вы победили');
    } else {
        alert('Что то тут не так');
    }
};
