import { appendFile } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as os from 'os';

const promisifiedExec = promisify(exec);
const promisifiedAppend = promisify(appendFile);

const LOG_FILE_NAME = 'activityMonitor.log';

const run = async () => {
  let command: string;

  switch (os.platform()) {
    case 'win32':
      command = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
      break;
    case 'linux':
    case 'darwin':
      command = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
      break;
    default:
      console.error('Unsupported platform');
      process.exit(1);
  }

  const appendToFile = async (data: string) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const logEntry = `${timestamp} : ${data}`;
    await promisifiedAppend(LOG_FILE_NAME, logEntry);
  };

  const executeCmd = async () => {
    try {
      const { stdout, stderr } = await promisifiedExec(command);
      process.stdout.write(`\r${stdout.trim()} `);
      return stdout;
    } catch (error) {
      console.error(`Error executing command: ${error}`);
    }
  };

  setInterval(async () => {
    const output = await executeCmd();
    if (output) {
      await appendToFile(output);
    }
  }, 60000);


  let isRunning = false;

  setInterval(async () => {
    if (!isRunning) {
      isRunning = true;
      await executeCmd();
      isRunning = false;
    }
  }, 500);
};

export default run;