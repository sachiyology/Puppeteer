const fs = require('fs');
const resemble = require('node-resemble-js');

//Replace the file names as below
const file1 = Buffer.from(fs.readFileSync('sc_prod.png'));
const file2 = Buffer.from(fs.readFileSync('sc_preprod.png'));

resemble.outputSettings({ transparency: 0.1 });
resemble(file1).compareTo(file2).onComplete( data => {
    if(data.misMatchPercentage >= 0.01) {
        data.getDiffImage().pack().pipe(fs.createWriteStream('diff_result.png'));
    }
});
