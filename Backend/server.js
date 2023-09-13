///contract address deploy ka

const express = require('express')
const cors = require("cors")
const tasks=require('./routes/routes')
const app = express();

//user-/api/ethereum/create-task -> server.js -> routes.js -> controller.js -> tasks.js
app.use(cors())

//this is a body parser for feth the req.body data ye middleware hai taki ham jason formate me data ko access krr paye
app.use(express.json())

app.use('/api/ethereum',tasks)

const PORT=4000;
app.listen(PORT,()=>{
    console.log(`Server Running At PORT ${PORT}`)
})
