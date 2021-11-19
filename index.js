const app=require("./server")

const PORT=8080
app.get("/",(req,res)=>{
    res.send("Hey whats up")
})

app.listen(PORT,()=>{
    console.log("Listening on port "+PORT)
})

