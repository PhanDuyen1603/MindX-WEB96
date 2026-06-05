import jwt from 'jsonwebtoken';
import Account from '../model/Account.js';

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token không hợp lệ hoặc chưa đăng nhập' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        const account = await Account.findById(decoded.accountId).select('-password');

        if (!account) {
            return res.status(401).json({ message: 'Tài khoản không tồn tại' });
        }

        if (!account.isActive) {
            return res.status(403).json({ message: 'Tài khoản đã bị vô hiệu hóa' });
        }

        req.account = account;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};

export const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.account.role)) {
        return res.status(403).json({ message: 'Bạn không có quyền thực hiện thao tác này' });
    }
    next();
};
