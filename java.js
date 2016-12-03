var name;
var consum=0, consum2=0;
name = prompt("Введи своё беспонтовое имя");
name2= prompt ("Введи имя второго лоха");

function consumption ()
{
    var distance = document.getElementById("dist").value=0;
    var spent = document.getElementById("cpa").value=0;
    consum=spent/distance*100;
    alert (name + " Твоя помойка на 100 км жрет " + consum + " литров бензина");
    return consum;
}
function consumption2 ()
{
    var distance2 = document.getElementById("dist2").value=0;
    var spent2 = document.getElementById("cpa2").value=0;
    consum2=spent2/distance2*100;
    alert ("А помойка лоха на 100 км жрет " + consum2 + " литров бензина");
    return consum2;
}
    lohan(consum, consum2)
/*
function lohan (a, b)
{
 if (a>b)
 {
     open("loh.html");
     alert ("Ебать "+ name+" ты лошара, продавай своё ведро");
 }
    else
 {
     open("loh.html");
     alert ("Ебать "+ name2+" ты лошара, продавай своё ведро");
 }
}

