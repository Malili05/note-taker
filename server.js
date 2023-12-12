const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const PORT = process.env.PORT || 3001;

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.get('/notes', (req,res) => {

    res.sendFile(path.join(__dirname,'./public/notes.html'))
})
app.get('/', (req,res) => {

    res.sendFile(path.join(__dirname,'./public/index.html'))
})
app.get('/api/notes', (req,res) => {

    res.sendFile(path.join(__dirname,'./db/db.json'))
})
app.post('/api/notes', (req,res) => {
    fs.readFile('./db/db.json', 'utf-8', function(err,data){
        const notes = JSON.parse(data)
        notes.push({
            title:req.body.title,
            text:req.body.text,
            id:req.body.id
        })
        fs.writeFile('./db/db.json', JSON.stringify(notes), function(err,data){
            console.log("works")
    res.json(notes)
        })
    })
})
// app.delete
// app.get('/assets/css/styles.css', (req,res) => {
//     console.log('hello')
//     res.sendFile(path.join(__dirname,'./public/assets/css/styles.css'))
// })







app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// app.listen(3001)

