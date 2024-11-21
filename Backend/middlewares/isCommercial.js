const isCommercial = (req, res, next) => {
    
    if (req.user && req.user.role === 'commercial') {
       
        return next();
    }

    return res.json({ status: "error", message: "Access denied, Commercial role required" });
};

export default isCommercial;

