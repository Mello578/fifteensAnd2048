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
    var message =``;
    for (i=0; i<b; i++) {
        const Name = document.getElementById('name' + i).value;
        const Distance = parseInt(document.getElementById('distance' + i).value);
        const Consumption = parseInt(document.getElementById('consumption' + i).value);
        const Result = Consumption / Distance * 100;
    
        message += `помойка ${Name} хавает ${Result} литров бензина \r\n`;    
    }
   
    alert(message);
}
