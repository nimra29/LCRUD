const mongoose=require('mongoose');
var mongoDB = 'mongodb://localhost:27017/mydb';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var Schema = mongoose.Schema;

var loginSchema = new Schema({
  name: String,
  pass: String
});

const info=mongoose.model("info",loginSchema);
const express= require("express");
const bodyParser=require("body-parser");
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
var myName=""
app.get("/", function(req,res){
    res.render("main");
    //res.render("my",{totm:name});

})
app.post("/",function(req,res){
    var item=req.body.choose
    if(item=='1'){
        res.redirect("/signup")
    }
    else{
        res.redirect("/login")
    }
    console.log(item);


})
app.get("/login",function(req,res){
    res.render("my");
})
app.post("/login",function(req,res){
    var Uname=req.body.userName;
    var Upass=req.body.userPass;
    myName=Uname
    info.findOne({name:Uname})
    .then(info=>{
        if(!info) {
            res.redirect("/login")
        }
        else{
            if(info.pass==Upass){
                res.redirect("login/welcome")
            }
            else{
                res.redirect("/login")
            }
        }
    })
   

     
})  
    

app.get("/login/welcome",function(req,res){
    res.render("welcome",{name:myName})
})
app.post("/login/welcome",function(req,res){
    var vaa=req.body.choose
    console.log(vaa)
    if(vaa=='0'){
        res.redirect("/login/welcome/update")
    }  
    if(vaa=='1'){
         info.deleteOne({name:myName},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("sucessfully del")
        }
    })
        res.redirect("/")
    }
    if(vaa=='2'){
        res.redirect("/")
    }  

})
app.get("/login/welcome/update",function(req,res){
    res.render("update",{name:myName});
})
app.post("/login/welcome/update",function(req,res){
    var it=req.body.userName;
    var em=req.body.userPass;
      info.updateOne({name:myName},{name:it,pass:em},function(err){
         if(err){
             console.log(err);
         }
         else{
             console.log("sucessfully done")
         }
     })
     var vaa=req.body.choose
     if(vaa=='1'){
         res.redirect("/login/welcome")
     }
})
app.get("/signup",function(req,res){
    res.render("signup");
})

app.post("/signup",function(req,res){
    var it=req.body.userName;
    var em=req.body.userPass;
    const data=new info({
        name:it,
        pass:em
    });
    data.save();
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("server started at port 3000");
    
})
