const express = require('express');
const path    = require('path');
const app     = express();


app.use(express.static(path.join(__dirname, 'public')));

// Inicia en el puerto 3000
app.listen(3000, () =>
  console.log('Frontend corriendo en http://localhost:3000')
);
