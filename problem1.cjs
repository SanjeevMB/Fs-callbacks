/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/


const fs = require('fs');
const path = require('path');

function createDirectoryAndDeleteTheDirectoryFiles() {

    let directoryName = './createdDirectory';
    let fileRefrenceArray = new Array(10);
    fileRefrenceArray.fill(0);

    function callback(error, data) {

        if (error) {

            console.log('Error : ' + error);

        } else {

            console.log(data);

        }

    }

    function creatingDirectory(directoryName, callback) {

        fs.mkdir(path.join(__dirname, directoryName), (error) => {

            if (error) {
    
                callback(error);
    
            } else {
    
                callback(null, 'directory created');
    
            }
    
        });


    }

    creatingDirectory(directoryName, callback);


    function filesCreation(fileRefrenceArray, callback) {

        fileRefrenceArray.forEach((elment, index, array) => {

            fs.writeFile(

                `${path.join(__dirname, `${directoryName}`,
                    `file${index + 1}.json`)}`,

                JSON.stringify({ 'name': 'Sanjeev', 'roll_no': 100 }),

                (error) => {

                    if (error) {

                        callback(error);

                    } else {

                        callback(null, 'files created');
                        fileDeletion(`file${index + 1}.json`, callback);

                    }

                });

        });

    }

    filesCreation(fileRefrenceArray, callback);

    function fileDeletion(fileName, callback) {

        fs.unlink(

            `${path.join(__dirname, `${directoryName}`, `${fileName}`)}`,

            (error) => {

                if (error) {

                    console.log(error);

                } else {

                    console.log('files deleted');

                }

            });

    }

    return 'this is Asynchronous task';

}

module.exports = createDirectoryAndDeleteTheDirectoryFiles;