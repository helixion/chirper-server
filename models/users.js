//grab dependancies
var bcrypt = require('bcrypt-nodejs')
,   mongoose = require('mongoose')
,   Schema = mongoose.Schema
//set salt #
, SALT = 10;

var userSchema = new Schema({
    username: { type: String, min: 3, max: 20, required: true, index: { unique: true }},
    password: { type: String, min: 6, max: 15, required: true }
});

//validate the password entered against the hashed password
userSchema.methods.comparePassword = function(guess, cb) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        if (err) { return cb(err); }
        cb(null, isMatch);
    });
};

//validate and secure the password
userSchema.pre('save', function(done) {
   var user = this;//refers to the properties belonging to the schema
   
   //only has if the password has been modified or is new
   if (!user.isModified('password')) { return done(); }
   
   //generate a salt
   bcrypt.genSalt(SALT, function(err, salt) {
       if (err)  { return done(err); }
       
       //hash the password using the salt
       bcrypt.hash(user.password, salt, function(err, hash) {
           if (err) { return done(err); }
           
           user.password = hash;
           done();
       });
       
   });    
    
});

module.exports = mongoose.model('User', userSchema);