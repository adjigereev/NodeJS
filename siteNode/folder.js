 let getFiles =  function (folder) {
    const fs = require("fs");
    let filesFolder = [];
    fs.readdirSync("./files/").forEach((file) => {
            filesFolder.push(file)
        }
    );
    return filesFolder;
}
module.exports.getFiles = getFiles;