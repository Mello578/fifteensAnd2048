/**
 * Created by Sysadmin on 03.05.2017.
 */


$('ul.nav a').mouseover(function () {
    $('.left_panel').css('display', 'none');
})
$('ul.nav a').mouseout(function () {
    $('.left_panel').css('display', 'block');
})
