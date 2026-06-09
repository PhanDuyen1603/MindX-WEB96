import bcrypt from 'bcrypt';
import Account from '../model/Account.js';
import Employee from '../model/Employee.js';
import { getManagerByAccountId } from '../utils/profileHelper.js';

export const createEmployee = async (req, res) => {
    try {
        const manager = await getManagerByAccountId(req.account._id);

        if (!manager) {
            return res.status(404).json({ message: 'Manager chưa có thông tin cá nhân' });
        }

        const { email, password, name, phone, department } = req.body;

        if (!email || !password || !name || !phone || !department) {
            return res.status(400).json({
                message: 'email, password, name, phone, department là bắt buộc',
            });
        }

        const existingAccount = await Account.findOne({ email });
        if (existingAccount) {
            return res.status(400).json({ message: 'Email đã được sử dụng' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const account = await Account.create({
            email,
            password: hashedPassword,
            role: 'EMPLOYEE',
            isActive: true,
        });

        const employee = await Employee.create({
            name,
            email,
            phone,
            department,
            managerId: manager._id,
            accountId: account._id,
        });

        return res.status(201).json({
            message: 'Tạo tài khoản và thông tin Employee thành công',
            data: {
                account: {
                    _id: account._id,
                    email: account.email,
                    role: account.role,
                    isActive: account.isActive,
                },
                employee,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi tạo Employee', error: error.message });
    }
};
