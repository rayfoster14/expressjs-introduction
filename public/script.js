// Global object to store elements we're using
let elems = {};

// Submission function
const submitContent = async function(){
    console.log('Submitting Data');

    // Getting body content to make the request to ExpressJS
    const toSubmit = {
        fileName: elems.fileNameField.value,
        fileContent: elems.contentField.value
    }

    // Making the POST request with JSON data
    const submissionResponse = await fetch('/api/createFile', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toSubmit)
    });

    // Alerting user of response from server
    const msgData = await submissionResponse.json();
    alert(`${msgData.error ? 'ERROR':'SUCCESS'}: ${msgData.message}`)
}

// Start up function
const main = async function(){

    // Just stores all the elements so we don't need to keep grabbing them
    elems.systemInfo = document.querySelector('#systemInfo');
    elems.contentField = document.querySelector('#fileContent');
    elems.fileNameField = document.querySelector('#fileName');
    elems.submitBtn = document.querySelector('#submitBtn');

    // Sets function to button click
    elems.submitBtn.onclick = submitContent;

    // Gets system info from Express server
    const systemInfoResponse = await fetch('/api/getSysInformation');
    
    // Parses the system information (note: this is an await function)
    const info = await systemInfoResponse.json();
    
    // Prints out the system informaiton on the page
    elems.systemInfo.innerHTML = `${info.sysInfo} (Fetched at ${info.time})`
}()