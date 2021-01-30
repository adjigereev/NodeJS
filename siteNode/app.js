const express = require("express");
const hbs = require("hbs");
const multer = require("multer");
const upload = multer({dest: "files"});
const app = express();
const folder = require("./folder");
const storageConfig = multer.diskStorage(
    {
        destination:(reg,file,cb)=>{
            cb(null,"files")
        },
        filename:(reg,file,cb)=>{
            cb(null,file.originalname)
        },
    }
);
app.set("view engine", "hbs");
app.use(express.static(__dirname));
app.use(multer({storage:storageConfig}).single("fileData"))

hbs.registerPartials(__dirname + "/views/partial")
app.get("/", function (request, response) {
   let links = folder.getFiles("./files/");
    response.render("index", {
        title: "Главная страница",
        description: "Вывод хранимих файлов",
        links:links,
    });

});
app.get("/upload", function (request, response) {
    response.render("upload", {
        buttonName: "Загрузить файл",
        title: "Загрузка файлов"
    });
});
app.post('/upload', upload.single("fileData"), function (request, response, next) {
    let fileDate =  request.file;
    if(!fileDate) response.send("Ошибка при загрузке файла")
    else {
        response.render("upload", {
            buttonName: "Загрузить файл",
            title: "Загрузка файлов"
        });
    }
});
app.listen(3000, function () {
    console.log("Сервер Запушен 3000")
});