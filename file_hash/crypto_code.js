function arrayBufferToWordArray(ab) {
    var i8a = new Uint8Array(ab);
    var a = [];
    for (var i = 0; i < i8a.length; i += 4) {
        a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length);
}

function getSha1CryptoJS(inputArrayBuffer) {
    //преобразование к формату CryptoJS
    const inputWordArray = arrayBufferToWordArray(inputArrayBuffer);
    //получение хеша
    const hash = CryptoJS.SHA1(inputWordArray);
    return hash;
}

async function getHash_crypto(inputArrayBuffer, hashAlgorithm) {
    //вычисление хеша встроенной функцией браузера
    const result = await crypto.subtle.digest(hashAlgorithm, inputArrayBuffer);
    //преобразование к строке
    const stringHash = Array.prototype.map.call(new Uint8Array(result), x => (('00' + x.toString(16)).slice(-2))).join('');
    return stringHash;
}

async function getFileHash(inputFile) {
    var reader = new FileReader();
    reader.onload = (function () {
        return async function (e) {
            document.getElementById('id_crypto_subtle').value = await getHash_crypto(e.target.result, 'SHA-1');
            document.getElementById('id_crypto_js').value = getSha1CryptoJS(e.target.result);
        };
    })();
    reader.readAsArrayBuffer(inputFile);
}

var fileInput = document.getElementById('file_select');

fileInput.addEventListener("change", async function (evt) {
    await getFileHash(fileInput.files[0]);
});