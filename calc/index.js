/**
 * Created by Администратор on 06.01.2017.
 */
// массив чисел для проверки на число

var numbe1 = 0;
var numbe2 = 0;
var inspection = 0;  //Еслии равен 0, то ввод 1 числа
// введенный знак
var sign2 = null;  // переменная введенный знак
var val;
// Ввод чисел
function inputNumber(b) {
    if (b != 0 && document.getElementById('quantity').value == 0) {
        document.getElementById('quantity').value = b;
        inspection == 0 ? number1(b) : number2(b);
    }
    else if (b == 0 && document.getElementById('quantity').value == 0) {
        inspection == 0 ? number1(b) : number2(b);
    }
    else {
        document.getElementById('quantity').value += b;
        val = document.getElementById('quantity').value;
        inspection == 0 ? number1(val) : number2(val);
    }
}

// ввод сигнала
function inputSign(sign) {
    //  var val = document.getElementById('quantity').value;  // табло
    //   inspection == 0 ? number1(val) : number2(val);

    switch (sign) {

        case '*'  :
            sign2 = sign;
            ++inspection;
            document.getElementById('quantity').value = 0;
            break;

        case '/' :
            sign2 = sign;
            ++inspection;
            document.getElementById('quantity').value = 0;
            break;

        case '+'  :
            sign2 = sign;
            ++inspection;
            document.getElementById('quantity').value = 0;
            break;

        case '-'  :
            sign2 = sign;
            ++inspection;
            document.getElementById('quantity').value = 0;
            break;

        default :
            alert("Иди на хуй");
    }


}

function equally() {
    if (numbe1 + numbe2 == 0) {
        alert("Ты долбоёб зачем нули складываешь")
    } else {
        document.getElementById('quantity').value = result(sign2, numbe1, numbe2);
    }

    // считаем (знак, число 1, число 2)
    function result(sig, numb1, numb2) {

        switch (sig) {
            case '*'  :
                return numb1 * numb2;
                break;

            case '/'  :
                return numb1 / numb2;
                break;

            case '+'  :
                return numb1 + numb2;
                break;

            case '-'  :
                return numb1 - numb2;
                break;
        }
    }

}

function onOff() {
    document.getElementById('quantity').value ? document.getElementById('quantity').value = null : document.getElementById('quantity').value = 0;
    inspection = 0;
}

function cancelFun() {
    document.getElementById('quantity').value = 0;
    inspection = 0;
}

function number1(numb) {
    numbe1 = parseInt(numb);
    //  document.getElementById('quantity').value = 0;
}

function number2(numb2) {
    numbe2 = parseInt(numb2);
    //   document.getElementById('quantity').value = 0;
}
