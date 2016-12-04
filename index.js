calculateButton.onclick = () => {
    const firstName = name1.value;
    const secondName = name2.value;
    const firstDistance = parseInt(distance1.value, 10);
    const secondDistance = parseInt(distance2.value, 10);
    const firstConsumption = parseInt(consumption1.value, 10);
    const secondConsumption = parseInt(consumption2.value, 10);

    const firstResult = firstConsumption / firstDistance;
    const secondResult = secondConsumption / secondDistance;

    const message = `Помойка мудака ${firstName} хавает ${firstResult} литров на километр
Хуйня уёбка ${secondName} жрет ${secondResult} литров на километр
Машина лоха ${firstResult > secondResult ? secondName : firstName} пизже`;

    alert(message);

    distance1.value = '';
    distance2.value = '';
    consumption1.value = '';
    consumption2.value = '';

    lohImage.style.display = firstResult > secondResult ? 'block' : 'none';
};
