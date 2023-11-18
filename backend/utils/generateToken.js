const {pbkdf2Sync} = require('crypto');
require('dotenv').config({path:'../config/.env'})

const keyCode = process.env.TOKEN_KEY
const loopCount = 1000;
const charCount=32;
const encType='sha512'

module.exports = function (string){
    return pbkdf2Sync(string, keyCode, loopCount, charCount, encType).toString('hex');
}
