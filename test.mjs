// test.js

import Mocha from 'mocha';

const mocha = new Mocha({
    reporter: 'spec', // Choose a reporter (optional)
    timeout: 10000 // Adjust timeout as needed (optional)
});

// Add test files to run
mocha.addFile('tests/auth.test.js'); // Add your test files here

// Run the tests
mocha.run((failures) => {
    process.exitCode = failures ? 1 : 0;
});
