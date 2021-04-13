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

function update_lcd() {
    var data = get_lcg();
    document.getElementById("lcg_text_result").innerHTML = data.join("<br/>");
    var trace = {
        x: data,
        type: 'histogram',
    };
    var parent_width = document.getElementById("lcg_gist_result").offsetWidth;
    layout = {
        width: parent_width * 0.99,
        responsive: true,
        margin: { t: 0, b: 30, l: 10, r: 0 },
    }
    Plotly.newPlot('lcg_gist_result', [trace], layout);
}

update_lcd();

a_data.addEventListener("change", update_lcd);
c_data.addEventListener("change", update_lcd);
interval_data.addEventListener("change", update_lcd);
count_data.addEventListener("change", update_lcd);