import  express  from "express";
import bodyParser from "body-parser";
import fs from 'fs';
import { dirname } from "path";
import { fileURLToPath } from "url";
import { maxHeaderSize } from "http";
const __dirname = dirname(fileURLToPath(import.meta.url));



const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended : true}))


app.use(express.static('public'));

app.get('/',(req,res)=>{
    
    res.render(__dirname +"/view/index.ejs",{dirName : __dirname})

})
app.get('/work',(req,res)=>{

    res.render(__dirname+"/view/workNote.ejs",{dirName : __dirname})
    // let noteBox = (texted) => {s
    //     box = doucment.querySelector('#typingArea')
    //     let textValue = document.querySelector('textBox');
       
    // }  
})
let arrayOfTask = [];
app.post('/work',(req,res)=>{
  
        let task =  req.body['taskMessageWork']
        arrayOfTask.push(task)
        console.log(arrayOfTask)
        console.log(req.body)
        fs.writeFile(__dirname + '/taskBase.txt',  task ,'utf8' , (err) => {
            console.log('File have been been save');
        });
       
        res.render(__dirname +"/view/workNote.ejs",{
                                            dirName : __dirname,
                                            taskArray : arrayOfTask,                      })
});
//add each value to the list array

// let arrayNote = [];
// app.post('/submit',(req,res) => {
//         // let noteBox = (texted) => {
//         //     box = doucment.querySelector('#typingArea')
//         //     let textValue = document.querySelector('textBox');
//         // }
//         let messagingValue = req.body['messaging'];
//         arrayNote.push(messagingValue); 
//         // let noteBox = (messagingValue) => {
//         //     box = doucment.querySelector('#typingArea')
//         //     let textValue = document.querySelector('textBox');
//         //     textValue.innerHTML = messagingValue
//         // }
//         // let messageElement = [];
//         res.render(__dirname + "/view/workNote.ejs",{dirName : __dirname,noteMessage :arrayNote})
//         console.log(arrayNote);
// });



// app.get('/submit',(req,res)=>{
//     res.render(__dirname + "/view/workNote.ejs",{dirName : __dirname,noteMessage :arrayNote})
// })


app.listen(port,()=>{
    console.log(`Port ${port} is listening`)
})