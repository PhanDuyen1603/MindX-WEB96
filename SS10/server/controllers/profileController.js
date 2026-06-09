import Manager from '../model/Manager.js';
import Employee from '../model/Employee.js';
import Customer from '../model/Customer.js';
import { getProfileByRole } from '../utils/profileHelper.js';

export const getMyProfile = async (req, res) => {
    try {
        const profile = await getProfileByRole(req.account);

        if (!profile) {
            return res.status(404).json({ message: 'Chưa có thông tin cá nhân cho tài khoản này' });
        }

        return res.status(200).json({
            message: 'Lấy thông tin cá nhân thành công',
            data: profile,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi lấy thông tin cá nhân', error: error.message });
    }
};

export const createMyProfile = async (req, res) => {
    try {
        const { role, _id: accountId, email: accountEmail } = req.account;
        const existingProfile = await getProfileByRole(req.account);

        if (existingProfile) {
            return res.status(400).json({ message: 'Thông tin cá nhân đã tồn tại' });
        }

        if (role === 'MANAGER') {
            const { name, email, phone, department } = req.body;

            if (!name || !email || !phone || !department) {
                return res.status(400).json({ message: 'name, email, phone, department là bắt buộc' });
            }

            const profile = await Manager.create({
                name,
                email,
                phone,
                department,
                accountId,
            });

            return res.status(201).json({
                message: 'Tạo thông tin Manager thành công',
                data: profile,
            });
        }

        if (role === 'CUSTOMER') {
            const { name, email, phone, address } = req.body;

            if (!name || !email || !phone || !address) {
                return res.status(400).json({ message: 'name, email, phone, address là bắt buộc' });
            }

            const profile = await Customer.create({
                name,
                email,
                phone,
                address,
                accountId,
            });

            return res.status(201).json({
                message: 'Tạo thông tin Customer thành công',
                data: profile,
            });
        }

        if (role === 'EMPLOYEE') {
            const { name, email, phone, department, managerId } = req.body;

            if (!name || !email || !phone || !department || !managerId) {
                return res.status(400).json({
                    message: 'name, email, phone, department, managerId là bắt buộc',
                });
            }

            const manager = await Manager.findById(managerId);
            if (!manager) {
                return res.status(404).json({ message: 'Manager không tồn tại' });
            }

            const profile = await Employee.create({
                name,
                email: email || accountEmail,
                phone,
                department,
                managerId,
                accountId,
            });

            return res.status(201).json({
                message: 'Tạo thông tin Employee thành công',
                data: profile,
            });
        }

        return res.status(400).json({ message: 'Role không hợp lệ' });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi tạo thông tin cá nhân', error: error.message });
    }
};
