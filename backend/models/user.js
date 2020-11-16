var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcryptjs = require('bcryptjs');

var schema = new Schema({
    email : {type:String, require:true},
    username: {type:String, require:true},
    password:{type:String, require:true},
    creation_dt:{type:Date, require:true}
});

schema.statics.hashPassword = function hashPassword(password){
    return bcryptjs.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
    return  bcryptjs.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User',schema);