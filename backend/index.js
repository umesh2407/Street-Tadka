const express = require('express');
// const cors = require('cors');
const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');

const secret = 'jhbzmgtw';

const app = express ();
// app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/');


app.listen(8800, (req,res)=>{
    console.log("Database connected successfully!!!! ");
});
