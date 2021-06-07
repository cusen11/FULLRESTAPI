const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{

    // Authorization: Bearer asdjo;akd;akd;lasdk;asdkasl;doNotTrack;ldkasl;daksdl;aksd;
    const authHeader = req.header('Authorization');
    // tách ra lấy phần sau 
    const token = authHeader && authHeader.split(' ')[1]
    if(!token)
        return res.status(401).json({sussess:false, message: "Accsess token not found!!!"})
    try {

        // phần này xem ở 1h03p https://www.youtube.com/watch?v=rgFd17fyM4A
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {

        return res.status(403).json({susscess: false, message:'Invalid token'})
    }
}

module.exports = verifyToken