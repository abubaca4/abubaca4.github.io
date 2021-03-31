var a_data = document.getElementById('id_a_data');
var c_data = document.getElementById('id_c_data');
var interval_data = document.getElementById('id_interval_data');
var count_data = document.getElementById('id_count_data');

function get_xn(a, xn, c, m) {
    return (a * xn + c) % m;
}

function get_lcg() {
    var result = [];
    var xn = 0;
    for (var i = 0; i < parseInt(count_data.value); i++) {
        xn = get_xn(parseInt(a_data.value), xn, parseInt(c_data.value), parseInt(interval_data.value));
        result.push(xn);
    }
    return result;
}

document.getElementById("lcg_text_result").innerHTML = get_lcg().join("<br/>");