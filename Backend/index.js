const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require('./Database/db');
const router = express.Router();
const model = require('./Models/user')
const cors = require("cors");
const PORT = process.env.PORT || 3000;


const youtube_search = require('./Routes/youtube_search')
const video_description = require('./Routes/video_description')
const video_growth = require('./Routes/video_growth')
const mp4_to_text = require('./Routes/mp4_to_text')
const generate_pdf = require('./generate_pdf')
const user = require('./Routes/users')
const pdf = require('./Routes/addPdf')
const appp = require('./app')
const mcq = require('./Routes/generate_mcq')
const chat = require('./Routes/question_answer')
const dash = require('./Routes/student_dashboard')
const bibtex = require('./Routes/get_letex')
const analysis = require('./Routes/student_analysis')
const youtubeRoutes = require('./Routes/youtube.routes')
const growthRoutes = require('./Routes/growth.routes.js')


app.use(cors());

app.use("/api/files", express.static("files"))
app.use(bodyParser.json());
app.use('/api/youtube',youtube_search);
app.use('/api/video',video_description);
app.use('/api/growth',video_growth);
app.use('/api/',generate_pdf);
app.use('/api/',mp4_to_text);
app.use('/api/user',user); 
app.use('/api/pdf',pdf);
app.use('/api/backend',appp);
app.use('/api/mcq',mcq); 
app.use('/api/chat',chat);
app.use('/api/dashboard',dash);
app.use('/api/bibtex',bibtex); 
app.use('/api/analysis',analysis); 
// Use routes
app.use('/api/youtube', youtubeRoutes);
app.use('/api/growth', growthRoutes);


app.get('/',(req,res)=>{
    res.json({msg:"Welcome, Welcome, Bhale Padhara"});
})

app.listen(PORT, ()=>{
    console.log("Listing on port 3000...");
})