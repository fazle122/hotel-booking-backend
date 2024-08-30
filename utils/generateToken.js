import jwt from 'jsonwebtoken';


const generateToken = (res,userId) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'30d'})
    console.log('token: ',token);
    res.cookie(
        'hmjwt',
        token,
        {
            httpOnly:true,
            // secure:process.env.NODE_ENV !== 'development',
            // sameSite:'strict',

            secure:true,
            sameSite:'none',
            maxAge:30*24*60*60*100
        }
    )
}

export default generateToken;

