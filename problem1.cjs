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

    fs.mkdir(path.join(__dirname, directoryName), (error) => {

        if (error) {

            console.error(error);

        } else {

            console.log('directory created');

        }

    });

    function filesCreation(fileRefrenceArray) {

        fileRefrenceArray.map((elment, index, array) => {

            fs.writeFile(

                `${path.join(__dirname, `${directoryName}`,
                    `file${index + 1}.json`)}`,

                JSON.stringify({ 'name': 'Sanjeev', 'roll_no': 100 }),

                (error) => {

                    if (error) {

                        console.error(error);

                    } else {

                        console.log('files created');
                        fileDeletion(`file${index + 1}.json`);

                    }

                });

        });

    }

    filesCreation(fileRefrenceArray);

    function fileDeletion(fileName) {

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

    return 'Asynchronous Task completed';

}

module.exports = createDirectoryAndDeleteTheDirectoryFiles;