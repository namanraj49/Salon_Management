const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/SalonManagement')
.then(function(){
   console.log("Sucssesfully Connnceted");
})
.catch(function(err){
    console.log(err);
})
module.exports = mongoose.connection;
