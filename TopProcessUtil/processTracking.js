const childProcess = require('child_process');
const fs = require('fs');
const Os = require('os');

let data = '';
const execProcess = (command) => {
    childProcess.exec(command, (error, stdout, stderr) => {
        data+= `${Math.floor(new Date() / 1000)} : ${stdout}`;
        const one = stdout.replace(/\r|\n/g, '');
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(one);

        if (error !== null) {
            console.log(`error: ${error}`);
        }
    });
}

const writeToFile = () => fs.appendFile('activityMonitor.log', data, (err) => {
    if (err) throw err;
});

setInterval(writeToFile, 60000);

const command = Os.platform() === 'win32' ? `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"`
    : 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
execProcess(command);
setInterval(execProcess, 2000, command);
