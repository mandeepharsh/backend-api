const handleSignin = (req,res,db ,bcrypt)=>{
    const {email,password} = req.body;
    if (!email ||!password){
        return  res.status(400).json("Infromation incorrect")
      }
    db.select('email','hash').from ("login")
    .where('email','=',email)
    .then(data =>{
        let valid = bcrypt.compareSync(password,data[0].hash); 
        if(valid){
          return  db.select('*').from('users')
            .where('email','=',email)
            .then(user => {
                res.json(user[0])
            })
        .catch(err=> res.status(400).json('unabable to get user'))
        }else{
           res.status(400).json('wrong credientials')
            
        }
    })
    
     .catch(err => res.status(400).json('wrong credientials'))
   

}

module.exports ={
handleSignin : handleSignin
};