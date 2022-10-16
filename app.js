const express = require('express');
const app = express();
const path = require('path');
const translator = require('translatte');
const languages = require('./utils/langCode')
const axios = require("axios");
const cors = require('cors')

app.use(cors());
require('dotenv').config();
function findLang(to)
{
   for(let i=0;i<languages.length;i++)
   {
      if (languages[i].substring(0, 2) === to)
         return languages[i];
    }
    return false;
}
app.use(express.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'public')))

function opt(to, ans) {
    const options = {
        method: 'GET',
        url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
        params: {
            key: process.env.VOICEAPI,
            src: ans,
            hl: to,
            r: '0',
            b64: true,
            f: '8khz_8bit_mono'
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI,
            'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
        }
    };
    return options;
}
app.get('/', (req, res) => {
    res.render('trans', {
        convert:"",answer:""})
})
let to = '';
let a=''
app.post('/', async (req, res,) => {
    await transConv(req, res);
    if(to!==false)
        await resp(res)
})
async function transConv(req, res){
    let data = await translator(req.body.convert, { to: req.body.to })
    a = data.text;
    to = findLang(req.body.to);
    if (to === false) {
            res.json({ a, v: 'false' })
        } 
}
async function resp(res) {
    
    try {
        const options = opt(to, a)
         let response = await axios.request(options)
        to = '';
        res.json({ a, v: response.data });
    } catch (e) {
        res.json({ a, v: "false" });
    }
} 
const port=process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})