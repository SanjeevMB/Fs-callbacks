/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the upperCaseContent to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the upperCaseContent, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.        
*/

const fs = require('fs');

function mainFunction() {

    fs.readFile('./lipsum.txt', (error, data) => {

        if (error) {

            console.log(error);

        } else {

            // console.log(data.toString());

            let upperCaseContent = data.toString()
                .toUpperCase();
            // console.log(upperCaseContent);

            let filename = 'upperCaseContentFile.txt';


            fs.writeFile(filename, upperCaseContent,

                (error) => {

                    if (error) {

                        console.log(error);

                    } else {

                        fs.appendFile('filenames.txt', filename + '\n', (error) => {

                            if (error) {

                                console.log(error);

                            } else {

                                fs.readFile(filename, (error, data) => {

                                    if (error) {

                                        console.log(error);

                                    } else {

                                        let lowerCaseContent = data.toString()
                                            .toLowerCase()
                                            .split('.').join('\n');

                                        let lowerCaseContentFile = 'lowerCaseContent.txt';

                                        fs.writeFile(lowerCaseContentFile, lowerCaseContent,
                                            (error) => {

                                                if (error) {

                                                    console.log(error);

                                                } else {

                                                    fs.appendFile('filenames.txt' , lowerCaseContentFile + '\n', 
                                                    (error) => {

                                                        if(error) {

                                                            console.log(error);

                                                        }else{

                                                            fs.readFile(lowerCaseContentFile, 
                                                                (error, data) => {
                                                                    if(error){

                                                                        console.log(error);

                                                                    }else{

                                                                        let sortedContent = 'sortedContent.txt';

                                                                        let sortedFile = data.toString().split('.')
                                                                        .sort((first, second) => {
                                                                            return first.localeCompare(second);
                                                                        });

                                                                        fs.writeFile('sortedFile.txt', sortedFile.join('\n'), 
                                                                        (error) => {
                                                                            if(error){
                                                                                console.log(error);
                                                                            }else{
                                                                                fs.appendFile('filenames.txt', 'sortedFile.txt' + '\n', (error) => {
                                                                                    if(error) {
                                                                                        console.log(error);
                                                                                    }else {
                                                                                        
                                                                                        fs.readFile('filenames.txt', (error, data) => {
                                                                                            if(error){
                                                                                                console.log(error);
                                                                                            }else{
                                                                                                let sortedFilesNamesInArray = data.toString()
                                                                                                .split('\n');
                                                                                                sortedFilesNamesInArray.forEach((element) => {
                                                                                                    fs.unlink(element, (error) => {
                                                                                                        if(error){
                                                                                                            console.log(error);
                                                                                                        }else{
                                                                                                            console.log('All task completed');
                                                                                                        }
                                                                                                    } )
                                                                                                })
                                                                                            }
                                                                                        })
                                                                                        
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })

                                                        }

                                                    })

                                                }

                                            });

                                    }



                                })

                            }
                        })
                    }
                });

        }

    });

}

module.exports = mainFunction;