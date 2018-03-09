// --IMPORTS--
require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser');
// --SETUP APP--
const app = express();
app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());

// -- LAST END POINT -- DO NOT PUT ANY END POINTS BELOW HERE --
const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})
// --SETUP APP TO LISTEN TO PORT--
const PORT = 8087;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
