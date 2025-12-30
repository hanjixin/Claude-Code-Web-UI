const pty = require('node-pty');

const shell = pty.spawn('bash', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
});

shell.onData((data) => {
  process.stdout.write(data);
});

shell.write('ls\r');
shell.write('echo hello\r');
