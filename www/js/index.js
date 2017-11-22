
// Wait for device API libraries to load
//
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    
}

function onDeviceReady() {
    // Add similar listeners for other events
    document.getElementById("cambtn").addEventListener("click", camera, false);
    document.getElementById("cambtn2").addEventListener("click", camera2, false);
}

//first Button
function camera(){
    //alert(navigator.camera);
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI });   
}

function onSuccess(imageURI) {
    var image = document.getElementById('photo');
    image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}

//2nd Button
function camera2(){
    //alert(navigator.camera);
    navigator.camera.getPicture(onSuccess2, onFail2, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI });   
}

var fileData;
var fileName;

function onSuccess2(imageURI) {
    var image = document.getElementById('photo');
    image.src = imageURI;

    //dirEntry = [cordova.file.dataDirectory];
    //alert("dirEntry: "+dirEntry)
    //alert("imageURI: "+imageURI)
    var url = [imageURI];
    fileData = new Blob(url, {type: 'file'});//create blob of file
    var currentdate = new Date(); 
    fileName = currentdate.getDate() + ""
                + (currentdate.getMonth()+1)  + "" 
                + currentdate.getFullYear() + ""  
                + currentdate.getHours() + ""  
                + currentdate.getMinutes() + "" 
                + currentdate.getSeconds() + ".jpg";
    //alert("fileName: "+fileName)
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    //saveFile(dirEntry, fileData, fileName);
}

function onFail2(message) {
    alert('Failed because: ' + message);
}

function gotFS(fileSystem) {
    fileSystem.root.getDirectory("photos", 
        {create: true, exclusive: false}, 
        saveFile, 
        fail);
}

function fail(error) {
    console.log("fail");
}

var url;
function saveFile(dirEntry) {
    //alert("dirEntry "+dirEntry.toURL());
    dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
        //alert("v1 fileEntry "+fileEntry.toURL());
        url=fileEntry.toURL();
        writeFile(fileEntry, fileData);

    }, onErrorCreateFile);
}

function onErrorCreateFile() {
    alert("error creating file");
}

function writeFile(fileEntry, dataObj, isAppend) {
    //alert("writeFile function");
    //alert("data: "+dataObj);
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter, fileEntry) {

        fileWriter.onwriteend = function() {
            //alert("hello");
            alert("Photo saved succesfully!");
            //alert("fileEntry "+fileEntry.toURL());
                var photo2 = document.getElementById('photo');
                
                //alert("datadirectory "+cordova.file.dataDirectory);
                /*var scripts = document.getElementsByTagName("script");
                for (var i = scripts.length - 1; i >= 0; i--) {
                    alert(scripts[i].src);
                }
                cordova.plugins.fileOpener2.open(
                    fileEntry, 
                    "image/jpeg", 
                    {
                        error : function(){ }, 
                        success : function(){ } 
                    } 
                );
                photo2.src = cordova.file.dataDirectory+"files/photos/"+fileName;
                alert(photo2.src);*/
        };

        fileWriter.onerror = function(e) {
            console.log("Failed file write: " + e.toString());
        };

        fileWriter.write(dataObj);
    });
}
/*
function readBinaryFile(fileEntry) {
    alert("readBinaryFile function");
    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {

            console.log("Successful file write: " + this.result);
            displayFileData(fileEntry.fullPath + ": " + this.result);

            var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpg" });
            displayImage(blob);
        };

        reader.readAsArrayBuffer(file);

    }, onErrorReadFile);
}

function displayImage(blob) {
    alert("displayImage function");
    // Displays image if result is a valid DOM string for an image.
    var elem = document.getElementById('photo');
    // Note: Use window.URL.revokeObjectURL when finished with image.
    elem.src = window.URL.createObjectURL(blob);
}*/