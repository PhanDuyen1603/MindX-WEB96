export const validateRegister = (req, res, next) => {
    const { name, email, age, password } = req.body;
    if(!name || !email || age === undefined || age === null || !password) {
        return res.status(400).json({ error: 'Thiếu trường bắt buộc: name, email, age, password' });
    }
    if(typeof age !== 'number') {
        return res.status(400).json({ error: 'age phải là số' });
    }
    next();
    //okay => allow to register
};