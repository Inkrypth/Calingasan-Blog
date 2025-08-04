const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address']
   },
   password: { 
      type: String, 
      required: true,
      validate: {
         validator: function (v) {
            return validator.isStrongPassword(v, {
               minLength: 8,
               minLowercase: 1,
               minNumbers: 1,
               minSymbols: 1
            });
         },
         message: 'Password is not strong enough'
      }
   }
},
{
   timestamps: true,
}
);

// Password hashing function
userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

module.exports = mongoose.model("User", userSchema);