/**
 * Created by Mello on 17.06.2017.
 */

Skip to content
Features
Business
Explore
Marketplace
Pricing
This repository
Sign in or Sign up

0
0

0

Mello578/snake.github.io
Code
Issues 0
Pull requests 0
Projects 0
snake.github.io/js.js
90bc4ec 29 days ago
@Mello578 Mello578 snake project
62 lines (51 sloc) 1.8 KB
/**
 * Created by Sysadmin on 18.05.2017.
 */

let rows = [];

window.onload = function() {
    var table = document.createElement('table'),
        fragment = document.createDocumentFragment(),
        r = 50, c;
    table.id = 'table';

    while(r--) {
        var cells = [];
        rows.push(cells)

        tr = table.insertRow(-1);
        c = 50;
        while(c--){
            var cell = tr.insertCell(-1);
            cells.push(cell);
        }
    }                                                                       //38
    document.body.appendChild(fragment.appendChild(table));               //37  39
    var x = 10, y = 15, j=[];                                                //40        q-81
    rows[y][x].style.backgroundColor = '#000000';

    document.body.addEventListener("keydown", function(event) {
        switch (event.keyCode){
            case  37:
                let b = x;
                x == 0 ? x = 49 : x;
                rows[y][x-=1].style.backgroundColor = '#000000';
                rows[y][b += j].style.backgroundColor = '#ffffff';
                break

            case 38:
                let n = y;
                y == 0 ? y = 49 : y;
                rows[y-=1][x].style.backgroundColor = '#000000';
                rows[n][x].style.backgroundColor = '#ffffff';
                break

            case 39:
                let m = x;
                x == 49 ? x = 0 : x;
                rows[y][x+=1].style.backgroundColor = '#000000';
                rows[y][m -= j].style.backgroundColor = '#ffffff';
                break

            case 40:
                let l = y;
                y == 49 ? y = 0 : y;
                rows[y+=1][x].style.backgroundColor = '#000000';
                rows[l][x].style.backgroundColor = '#ffffff';
                break
        }
    });
};


Contact GitHub API Training Shop Blog About

© 2017 GitHub, Inc. Terms Privacy Security Status Help

