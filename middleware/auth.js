const User = require('../src/config').collection; 

const isLogin = async(req,res, next)=>{
    try {
    if(req.session.user_id){
        console.log("csdcsd")
        console.log(req.session.user_id)
        const userData= await User.findById({_id: req.session.user_id});

        res.render('userDetails', {user:userData});
    }

    else{
        console.log("nope")
        next();
    // res.render('account');
    }
    // next();
    } catch (error) {
    console.log(error.message);
    }
    }

    const isLogout = async(req, res, next)=> {
        try {
        if(req.ession.user_id){
        res.redirect('home');
        }
        next();
        } catch (error) {
        console.log(error.message);
        }
    }
    const isLoggedIn = (req, res, next) => {
        if (req.session.user_id) {
            next(); // User is logged in, proceed to the next middleware or route handler
        } else {
            res.status(401).json({ message: 'User is not logged in' }); // User is not logged in, send an unauthorized response
        }
    };
    
    module.exports={
        isLogin,
        isLogout,
        isLoggedIn
    }
