import express from "express";
const app=express();

app.use(express.json());





const PORT=8267;
app.listen(PORT,()=>{
    console.log(`app is running at http://localhost:${PORT}`);
})
