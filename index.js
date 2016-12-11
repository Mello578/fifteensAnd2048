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


function addForm() {
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

    var divMin = document.createElement('div');
        divMin.className = "text";
    var divMin1 = document.createElement('div');
        divMin1.className = "text1";
    
    

    for (i=0; i<b; i++)
    {
        const Name = document.getElementById('name' + i).value;
        const Distance = parseInt(document.getElementById('distance' + i).value);
        const Consumption = parseInt(document.getElementById('consumption' + i).value);
        const Result = parseInt(Consumption / Distance * 100);
    
        list.push ( `Помойка ${Name} хавает  ${Result} литров топлива \n`);
        listNumb.push (parseInt( Result));
    }
    min = Math.min.apply(null, listNumb);     // Нашли min, max
    max = Math.max.apply(null, listNumb);
    minIndex = parseInt( listNumb.indexOf(min));  // Нашли индексы min, max
    maxIndex = parseInt( listNumb.indexOf(max));
    for (i=0; i<list.length; i++)
    {
          if (i == minIndex)
          {
              divMin.innerHTML=list[i];
              document.body.appendChild(divMin);
          }
         if (i == maxIndex)
          {   
              divMin1.innerHTML=list[i];
              document.body.appendChild(divMin1);
          }
         if (i != minIndex && i != maxIndex)
              {
                  var divMin2 = document.createElement('div');
                  divMin2.className = "text2";
                  divMin2.innerHTML=list[i];
                  document.body.appendChild(divMin2);
              }
    }
}
