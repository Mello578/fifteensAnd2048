allLohButton.onclick = addfields;
addLohButton.onclick = addForm;
calculateButton.onclick = calculate;

var b = 0;
function addfields() {
    let quality = parseInt(quantity.value, 10);
    /*Загоняем в переменную количество лохов*/
    quality += b;
    for (let i = b; i < quality; i++) {
        addForm();
    }
}

function addForm() {
    const newName = document.createElement("input");
    /* создаем форму input */
    newName.type = "text";
    /* устанвливаем тип формы */
    newName.id = "name" + b;
    newName.value = "";
    newName.placeholder = "Имя лоха";

    const newDistance = document.createElement("input");
    newDistance.type = "text";
    newDistance.id = "distance" + b;
    newDistance.value = "";
    newDistance.placeholder = "Расстояние";

    const newConsumption = document.createElement("input");
    newConsumption.type = "text";
    newConsumption.id = "consumption" + b;
    newConsumption.value = "";
    newConsumption.placeholder = "Количество толива";

    document.getElementById('myForm').appendChild(newName);
    /* Размещаем форму */
    newName.style.display = "block";
    document.getElementById('myForm').appendChild(newDistance);
    newDistance.style.display = "block";
    document.getElementById('myForm').appendChild(newConsumption);
    newConsumption.style.display = "block";
    b++;
}

function calculate() {

    var list = []; //Список под текст
    var listNumb = []; //Список под числа
    var min;
    var max;
    var minIndex;  //индекс минимального числа
    var maxIndex;
    var equally = 0; //Сранение всех элементов

    function outFun(c) {
        const divMin = document.createElement('div');
        divMin.className = c;
        divMin.innerHTML = list[i];
        document.body.appendChild(divMin);
    }

    for (i = 0; i < b; i++)              // записываем в списки расход и полные сообщения
    {
        const Name = document.getElementById('name' + i).value;
        const Distance = parseInt(document.getElementById('distance' + i).value);
        const Consumption = parseInt(document.getElementById('consumption' + i).value);
        const Result = parseFloat(Consumption / Distance * 100, 10).toFixed(3);
        list.push(`Помойка ${Name} хавает  ${Result} литров топлива \n`);
        listNumb.push(Result);
    }
    // console.log(list);
   // console.log(listNumb);
    
    //Сравниваем все элементы
    for (let i = 0; i < listNumb.length; i++) {
        equally += listNumb[i];
    }

    // Если все равны, то заносим всё в обычный список
    if (equally / listNumb.length == listNumb[0]) {
        for (i = 0; i < list.length; i++) {
            outFun("text colorNever");
        }
    } else {
        // Если не все равны, то ищем минимум и максимум и выводим в список по цветам
        min = Math.min.apply(null, listNumb);     // Нашли min, max
        max = Math.max.apply(null, listNumb);
        minIndex = listNumb.indexOf(min);  // Нашли индексы min, max
        maxIndex = listNumb.indexOf(max);

        for (i = 0; i < list.length; i++) {
            if (i == minIndex) {
                outFun("text colorGreen");
            } else if (i == maxIndex) {
                outFun("text colorRed");
            } else {
                outFun("text colorNever");
            }
        }
    }
}
