const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');

// Defines the port at which we'll access the site. 
// Either http://[IP]:[PORT] or http://localhost:[PORT]
const PORT = 3000;

// Creates a 'server' in NodeJS
const app = express();

// Enables JSON responses and requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// If a route isn't defined, automatically use the 'public' folder
app.use(express.static('public'));


// Silly function to get system information
const getSysInfo = function(){
    return new Promise(function(resolve,reject){

        // Using the 'process' object, we can identify the OS - if 
        // it's win32 return 'systeminfo', if not, assume Linux and 
        // return 'uname -a'. This is the same thing as running a 
        // terminal/cmd/powershell command. 

        let command = process.platform === 'win32' ? 'systeminfo' : 'uname -a';
        exec(command, function(error,stdout,stderr){
            if(error || stderr) {
                reject(error || stderr);
                return;
            }
            // Return the result of the command
            resolve(stdout)
        })
    });
}

// Define a 'GET' route that sends system information
app.get('/api/getSysInformation', async function(request,response){
    console.log('Getting System Information');
    const sysInfo = await getSysInfo();
    response.json({
        time: new Date(),
        sysInfo
    });
})

// Defines a 'POST' route that creates file from browser submission.
// There is a touch of error handling, which will tell the user what's
// gone wrong.
app.post('/api/createFile', function(request,response){
    console.log('Checking Validation for file creation')

    // Checks if all fields exists
    if(!request.body.fileName || !request.body.fileContent){
        response.json({
            message:'Please fill out all fields',
            error: true
        });
        return;
    }

    const {fileName, fileContent} = request.body;

    // Checks to see if file exists
    if(fs.existsSync(`./${fileName}.txt`)){
        response.json({
            message:'File already exists',
            error: true
        });
        return;
    }

    // Creates file
    console.log('Validation Passed! Now creating file.')
    fs.writeFileSync(`./${fileName}.txt`, fileContent);
    response.json({message:`Created file ${fileName}.txt`});
})

// This opens the port and starts the server
app.listen(PORT, function(){
    console.log(`Server is up and running! Navigate to http://localhost:${PORT}`);
});