import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import users from "./models/users";


const app =express();
app.use(bodyparser.json())
app.use(cors())
//jBTw3xIoUPeROH6d
mongoose.connect('mongodb+srv://SudheeshnaVijju:FVku86Kla1YiPsLv@cluster0.lertnm8.mongodb.net/rps_game?retryWrites=true&w=majority')
.then(() => app.listen(5000))
.then(() =>console.log("Connected to Database & Listining to localhost 5000"))
.catch((err) => console.log(err));

app.post('/handle_sign',async(req,res,next)=>{
    const {name, email,pwd}=req.body;
    const total=0,win=0,lose=0,winrate=0.0;
    const f=new users({
        name,
        email,
        pwd,
        total,
        win,
        lose,
        winrate
    })
    // if(name=='' || rollnum=='' || uremail=='' || phnum=='' || branch=='' || clg=='' || hodemail=='' || pwd==''){
    //   return res.send({msg:"Enter valid details"})
    // }
    users.findOne({email: email})
    .then(user=>{
      if(user){
        return res.send({msg:"Already exists..."})
      }
      else{
        try{
          f.save()
      }
      catch(err){
          console.log(err)
      }
      return res.send({msg:"Submitted Successfully..."})
      }
    })
    
  })

  app.post('/handle_log',(req,res)=>{
    const {email,pwd}=req.body;
    users.findOne({email: email})
    .then(user=>{
      if(user){
        if(user.pwd===pwd){
          res.send({msg:'Login Successfull...',id:user._id})
        }
        else{
          res.json({msg:'Password is Incorrect'})
        }
      }
      else{
        res.json({msg:"Not Registered"})
      }
    })
  })

// app.post('/IncTotal/:id',(req,res,next)=>{
//   const id=req.params.id
//   var total
//   users.findOne({_id:id}).then(user=>{
//     total=(user.total)+1
//   })
//   // users.findOneAndUpdate({_id:id},{total}).then(user=>{
//   //   console.log(user)
//   // })
// })


// Assuming you have a 'users' model defined using mongoose

app.post('/inctotal/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    const user = await users.findOne({ _id: id });

    if (user) {
      user.total += 1;
      user.winrate=(user.win)/user.total
      await user.save();

      res.status(200).json({ message: 'Total incremented successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/incwin/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    const user = await users.findOne({ _id: id });

    if (user) {
      user.win += 1;
      user.winrate=(user.win)/user.total
      await user.save();

      res.status(200).json({ message: 'Total incremented successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/inclose/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    const user = await users.findOne({ _id: id });

    if (user) {
      user.lose += 1;
      user.winrate=(user.win)/user.total
      await user.save();

      res.status(200).json({ message: 'Total incremented successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
