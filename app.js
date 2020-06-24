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
var myName="nimra"
app.get("/", function(req,res){
    res.render("main");
    //res.render("my",{totm:name});

})
app.post("/",function(req,res){
     //console.log(req.body.buton.value);
    
    // if(req.body.login=="login"){
    //     res.render("my");
    // }
    // const data=new info({
    //     name:userName,
    //     pass:userPass
    // });
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
    var it=req.body.userName;
    var em=req.body.userPass;
   
    var item=req.body.choose
    if(item=='1'){
        res.redirect("login/welcome")
    }  
    myName=it
    // info.find(function(err,infos){
    //     if(err){
    //         console.log("error");
    //     }
    //     else{
             
    // infos.forEach(function(info){
    //      if(info.name==it){
    //         if(info.pass==em)
    //         {
    //             res.redirect("login/welcome")
    //         }
    //         else{
    //             res.redirect("/")
    //         }
            
    //     }
    //     else{res.redirect("/")}
    // })

    //     }


    // })

     
})  
    

app.get("/login/welcome",function(req,res){
    res.render("welcome",{name:myName})
    // info.updateOne({name:"nimra"},{pass:"janymn"},function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("sucessfully done")
    //     }
    // })


   


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
    var vaa=req.body.choose
    if(vaa=='0'){
        var add=prompt('Please enter your name');
    }
    if(vaa=='1'){
        var add=alert("enter pass");
    }
    if(vaa=='2'){
        res.redirect("/login/welcome");
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
