var main = (function () {
    var uploadFile = function () {
        var x = document.getElementById("myFile");
        var formData = new FormData();
        formData.append(x.files[0].name, x.files[0])
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                // File(s) uploaded.
                uploadButton.innerHTML = 'Upload';
            } else {
                alert('An error occurred!');
            }
        };
        xhr.send(formData);
        document.getElementById("demo").innerHTML = txt;
    }
    return {
        uploadFile: uploadFile
    }
}(window)) 