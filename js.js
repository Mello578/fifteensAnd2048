/**
 * Created by Sysadmin on 18.05.2017.
 */

let rows = [], rowsFinish = [];

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

    $(rows[0][0]).append('<img id="1" src="img/1.png">');
    $(rows[0][1]).append('<img id="2" src="img/2.png">');
    $(rows[0][2]).append('<img id="3" src="img/3.png">');
    $(rows[0][3]).append('<img id="4" src="img/4.png">');
    $(rows[1][0]).append('<img id="5" src="img/5.png">');
    $(rows[1][1]).append('<img id="6" src="img/6.png">');
    $(rows[1][2]).append('<img id="7" src="img/7.png">');
    $(rows[1][3]).append('<img id="8" src="img/8.png">');
    $(rows[2][0]).append('<img id="9" src="img/9.png">');
    $(rows[2][1]).append('<img id="10" src="img/10.png">');
    $(rows[2][2]).append('<img id="11" src="img/11.png">');
    $(rows[2][3]).append('<img id="12" src="img/12.png">');
    $(rows[3][0]).append('<img id="13" src="img/13.png">');
    $(rows[3][1]).append('<img id="14" src="img/14.png">');
    $(rows[3][2]).append('<img id="15" src="img/15.png">');
    $(rows[3][3]).append('');

    rowsFinish = rows;
};
let x, y, number;


$(function () {

    $('.click-table td').on('click', function () {
        y = $(this).parent('tr').index();
        x = $(this).index();
        number = $(this).html();
        motionCell(y, x, number);

    });
});


function motionCell(axisY, axisX, content) {
    if (content !== '') {
        if (axisX !== 3 && $(rowsFinish[axisY][axisX + 1]).html() == '') {
            $(rowsFinish[axisY][axisX]).html('');
            $(rowsFinish[axisY][axisX + 1]).append(content);
        }
        if (axisX !== 0 && $(rowsFinish[axisY][axisX - 1]).html() == '') {
            $(rowsFinish[axisY][axisX]).html('');
            $(rowsFinish[axisY][axisX - 1]).append(content);
        }

        if (axisY !== 3 && $(rowsFinish[axisY + 1][axisX]).html() == '') {
            $(rowsFinish[axisY][axisX]).html('');
            $(rowsFinish[axisY + 1][axisX]).append(content);
        }
        if (axisY !== 0 && $(rowsFinish[axisY - 1][axisX]).html() == '') {
            $(rowsFinish[axisY][axisX]).html('');
            $(rowsFinish[axisY - 1][axisX]).append(content);
        }
    }
}

document.getElementById('START').onclick = function start() {
    for (let i = 0; i < 1024; i++) {
        for (let key in rowsFinish) {
            let str = rowsFinish[key];
            for (let key2 in str) {
                let noElem = str[key2];
                if ($(noElem).html() == '') {
                    let randY = Math.round(3 * Math.random()),
                        randX = Math.round(3 * Math.random());
                    //Переставление пятнашек с проверкой на решаемость
                    if (randY != key && randX != key2) {
                        let content = $(rowsFinish[randY][randX]).html();
                        $(rowsFinish[key][key2]).append(content);
                        $(rowsFinish[randY][randX]).html('');
                    }
                }
            }
        }
    }


};

document.getElementById('FINISH').onclick = function finish() {
    let counter = 0;
    for (let i = 0; i < 4; i++) {
        let str = rowsFinish[i];
        for (let j = 0; j < 4; j++) {
            let tablSt = $(rowsFinish[i][j]).html(),
                tablFin = $(rows[i][j]).html();
            if (tablSt === tablFin) {
                counter++;
            }
        }
    }
    if (counter === 16) {
        alert('Вы победили');
    } else {
        alert('Что то тут не так');
    }
};

