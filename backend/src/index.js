require('dotenv').config();

const app = require('./app');
require('./database'); 

const fbase = require("./FirebaseConnect");
console.log("opciones de firebase: ",fbase.name);

async function main() {
     await app.listen(app.get('port'));
     console.log('Servidor activo en el puerto', app.get('port'));
}
main();
