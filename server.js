const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hola mundo feliz')
})

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));