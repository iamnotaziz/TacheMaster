const isClient = (req, res, next) => {
    
    if (req.user && req.user.role === 'client') {
       
        return next();
    }

    return res.json({ status: "error", message: "Access denied, Client role required" });
};

export default isClient;

