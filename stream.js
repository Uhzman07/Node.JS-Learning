const fs = require('fs');

// When dealing with large files, we have to be able to read and write more efficiently
const rs = fs.createReadStream('./files/lorem.txt', {encoding: 'utf8'});

const ws = fs.createWriteStream('./files/new-lorem.txt');

/*
rs.on('data', (dataChunck) => {
    ws.write(dataChunck);
}
)
*/

// Contrary to the above, we could have a "pipe" do it for us.
rs.pipe(ws);