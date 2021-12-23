const express= require("express")
const app= express()
const path =require("path")
const methodOverride = require('method-override');

app.set("views",path.join(__dirname,'views'))
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.json());
app.use(express.urlencoded({extended :true}))
app.use(methodOverride('_method'));

let comments=[
    {
        id:0,
        username:"dinesh",
        message :"We are doing some CRUD operation using RESTFUL ROUTES"
    },
    {
        id:1 ,
        username: "alok" ,
        message :"keep watching the address bar for Routes"
    },
    { 
        id:2,
        username :"vishal",
        message:"This how we implement rhe Restful route"

    }
]

app.get("/comments",(req,res)=>{
    res.render("index.ejs",{comments})
})

app.post("/comments",(req,res)=>{
    const {username ,message} =req.body;
    comments.push({username,message,id: comments.length})
    res.redirect('/comments')
})

app.patch("/comments/:commentid",(req,res)=>{
    
    
    const {commentid} =req.params;
    const oldComment= comments.find((comment)=>comment.id==commentid);

    const text = req.body;
    oldComment.message=text.message;
    res.redirect("/comments");

})

app.delete("/comments/:commentid",(req,res)=>{

    const {commentid} =req.params;
    //const delComment =comments.find((comment)=>comment.id==commentID);

    const newComments=  comments.filter((comment)=>comment.id !=parseInt(commentid)) ;
    comments =newComments
    
    res.redirect("/comments")

})
app.get("/comments/new",(req,res)=>{    
    res.render("new")
 })

app.get('/comments/:commentid',(req,res)=>{
    const { commentid }= req.params;
    const showen =comments.find((co)=>co.id== commentid)
    res.render("show.ejs",{foundComment: showen})
})

app.get("/comments/:commentid/edit",(req,res)=>{
    const { commentid } =req.params;
    const editComment =comments.find((Comment)=>Comment.id==commentid)

    res.render("edit.ejs",{comment:editComment})
})

app.use("/index",(req,res)=>{
    res.send("Restful routs")
})










app.listen(8080,()=>{
console.log("sarting the server")
console.log("srever runing at 8080 port no")
})