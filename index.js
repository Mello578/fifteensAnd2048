allLohButton.onclick = () => {addfields();}
addLohButton.onclick = () => {addForm(); }
calculateButton.onclick = () => {calculate();}

var b = parseInt(0);
function addfields()
{
    var quality = parseInt(quantity.value, 10);   /*Загоняем в переменную количество лохов*/
    quality+=b;
        for (var i = b; i < quality; i++)
        {
            addForm();
        }
   }


function addForm() 
{
    var newName = document.createElement("input");   /* создаем форму input */
    newName.type = "text";                           /* устанвливаем тип формы */
    newName.id = "name" + b;
    newName.value = "";
    newName.placeholder = "Имя лоха";

      var newDistance = document.createElement("input");   
        newDistance.type = "text";                           
        newDistance.id = "distance" + b;                        
        newDistance.value = "";
        newDistance.placeholder = "Расстояние";

            var newConsumption = document.createElement("input");
            newConsumption.type = "text";
            newConsumption.id = "consumption" + b;
            newConsumption.value = "";
            newConsumption.placeholder = "Количество толива";

    document.getElementById('myForm').appendChild(newName);    /* Размещаем форму */
    newName.style.display = "block";
    document.getElementById('myForm').appendChild(newDistance);
    newDistance.style.display = "block";
    document.getElementById('myForm').appendChild(newConsumption);
    newConsumption.style.display = "block";
    b++;
}

function calculate() 
{

    var list = new Array;      //Список под текст
    var listNumb = new Array; //Список под числа
    var min;
    var max;
    var minIndex;  //индекс минимального числа
    var maxIndex;
    var equally=0; //Сранение всех элементов
  
     for (i=0; i<b; i++)              // записываем в списки расход и полные сообщения
      {
        const Name = document.getElementById('name' + i).value;
        const Distance = parseInt(document.getElementById('distance' + i).value);
        const Consumption = parseInt(document.getElementById('consumption' + i).value);
        const Result = parseInt(Consumption / Distance * 100);
          const styleGreen = "text colorGreen";
          const styleRed = "text colorRed";
        const styleWhite = "text colorNever";
          function outFun (c)
          {
               var divMin = document.createElement('div');
               divMin.className = c;
               divMin.innerHTML = list[i];
               document.body.appendChild(divMin);
          }   
    
        list.push ( `Помойка ${Name} хавает  ${Result} литров топлива \n`);
        listNumb.push (parseInt( Result));
    }
    for (i=0; i<listNumb.length; i++)       //Сравниваем все элементы
        {
            equally +=listNumb[i];
        }
            if (equally/listNumb.length == listNumb[0])      // Если все равны, то заносим всё в обычный список
                 {
                    for (i = 0; i < list.length; i++)
                    {
                       
                        outFun ("text colorNever");  
                    /*  var divMin2 = document.createElement('div');
                        divMin2.className = "text2";
                        divMin2.innerHTML = list[i];
                        document.body.appendChild(divMin2);  */
                    }
                }
    else {               // Если не все равны, то ищем минимум и максимум и выводим в список по цветам
        min = Math.min.apply(null, listNumb);     // Нашли min, max
        max = Math.max.apply(null, listNumb);
        minIndex = parseInt(listNumb.indexOf(min));  // Нашли индексы min, max
        maxIndex = parseInt(listNumb.indexOf(max));

        for (i = 0; i < list.length; i++) {
            if (i == minIndex) {
              /*    var divMin;
                        outFun (divMin, styleGreen);  */
              var divMin = document.createElement('div');
                divMin.className = "text colorGreen";
                divMin.innerHTML = list[i];
                document.body.appendChild(divMin); 
            }
            else if (i == maxIndex) {
              /*     var divMin;
                        outFun (divMin, styleRed);  */
             var divMin1 = document.createElement('div');
                divMin1.className = "text colorRed";
                divMin1.innerHTML = list[i];
                document.body.appendChild(divMin1);   
            }
            else {
             /*      var divMin;
                        outFun (divMin, styleWhite);   */
             var divMin2 = document.createElement('div');
                divMin2.className = "text colorNever";
                divMin2.innerHTML = list[i];
                document.body.appendChild(divMin2);  
            }
        }
    }
}
