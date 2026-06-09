import bcrypt from 'bcrypt';
import Account from '../model/Account.js';
import { generateTokens } from '../utils/jwt.js';

export const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email và password là bắt buộc' });
        }

        const existingAccount = await Account.findOne({ email });
        if (existingAccount) {
            return res.status(400).json({ message: 'Email đã được sử dụng' });
        }

        const allowedRoles = ['MANAGER', 'CUSTOMER', 'EMPLOYEE'];
        const accountRole = role && allowedRoles.includes(role) ? role : 'CUSTOMER';

        const hashedPassword = await bcrypt.hash(password, 10);

        const account = await Account.create({
            email,
            password: hashedPassword,
            role: accountRole,
        });

        return res.status(201).json({
            message: 'Đăng ký tài khoản thành công',
            data: {
                _id: account._id,
                email: account.email,
                role: account.role,
                isActive: account.isActive,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi đăng ký tài khoản', error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email và password là bắt buộc' });
        }

        const account = await Account.findOne({ email });
        if (!account) {
            return res.status(401).json({ message: 'Email hoặc password không đúng' });
        }

        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email hoặc password không đúng' });
        }

        if (!account.isActive) {
            return res.status(403).json({ message: 'Tài khoản chưa được kích hoạt' });
        }

        const tokens = generateTokens(account._id.toString(), account.role);

        return res.status(200).json({
            message: 'Đăng nhập thành công',
            data: {
                account: {
                    _id: account._id,
                    email: account.email,
                    role: account.role,
                    isActive: account.isActive,
                },
                ...tokens,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi đăng nhập', error: error.message });
    }
};
