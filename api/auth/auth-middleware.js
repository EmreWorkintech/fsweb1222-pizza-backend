const bcrypt = require('bcryptjs');
const { HASH_ROUND } = require('../../config/config');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config/config')

const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

const checkPayload = (req,res,next)=> {
    try {
        if(!req.body.name || !req.body.name.trim() || req.body.name.length <= 3) {
            next({status:400, message: "Name bilgisi yok veya 3 karakterden büyük olmalı..."})
        } else if (!req.body.surname || !req.body.surname.trim() || req.body.surname.length <= 3) {
            next({status:400, message: "Surname bilgisi yok veya 3 karakterden büyük olmalı..."})
        } else if (!req.body.password || !req.body.password.trim() || req.body.password.length <= 3) {
            next({status:400, message: "password bilgisi yok veya 3 karakterden büyük olmalı..."})
        } else if (!req.body.email || !req.body.email.trim() || !validateEmail(req.body.email)) {
            next({status:400, message: "email bilgisi yok veya geçerli değil..."})
        }
        if(!req.body.role_id){
            req.body.role_id = 2
        }
        next()
    }
        catch(err)
    {
        next({status:500, message: "Payload error"})
    }
}
const hashPassword = (req,res,next)=> {
    try {
        const password = req.body.password;
        const hashedPassword = bcrypt.hashSync(password, HASH_ROUND);
        req.body.password = hashedPassword;
        next();
    } catch(err)
    {
        next({status:500, message: "Password hashing error"})
    }
    
}

const checkLoginPayload = (req,res,next)=> {
    try {
        if (!req.body.password || !req.body.password.trim() || req.body.password.length <= 3) {
            next({status:400, message: "password bilgisi yok veya 3 karakterden büyük olmalı..."})
        } else if (!req.body.email || !req.body.email.trim() || !validateEmail(req.body.email)) {
            next({status:400, message: "email bilgisi yok veya geçerli değil..."})
        }
        next()
    }
        catch(err)
    {
        next({status:500, message: "Payload error"})
    }
}

const checkPassword = (req,res,next)=> {
    try {
        const password = req.body.password;
        if(bcrypt.compareSync(password, req.user.password)) {
            next();
        } else {
            next({status:403, message: "Invalid credentials..."})
        }
        
    } catch(err)
    {
        next({status:500, message: "Password hashing error"})
    }
    
}

const restricted = (req,res,next)=> {
    try {
        const token = req.headers.authorization;
        if(token) {
            jwt.verify(token, JWT_SECRET, (err,decodedJWT)=> {
                if(err) {
                    next({status:403, message: "token geçerli değil!..."})
                } else {
                    req.decocedJWT = decodedJWT;
                    next();
                }
            })
        } else {
            next({status:403, message: "token yok!..."})
        }
        
    } catch(err)
    {
        next({status:500, message: "token check error!.."})
    }
    
}

const checkRole = (role) => (req,res,next)=> {
    try {
        if(req.decocedJWT.role && req.decocedJWT.role == role) {
            next();
        } else {
            next({status:403, message: "Bu servisi kullanma yetkiniz yok!..."})
        }
        
    } catch(err)
    {
        next({status:500, message: "Restricted areaa check error!.."})
    }
    
}


module.exports = {
    hashPassword,
    checkPayload,
    checkLoginPayload,
    checkPassword,
    restricted,
    checkRole
}