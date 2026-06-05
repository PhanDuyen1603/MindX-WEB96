import Property from '../model/Property.js';
import Employee from '../model/Employee.js';
import { getEmployeeByAccountId, getManagerByAccountId } from '../utils/profileHelper.js';

const canManageProperty = async (account, property) => {
    if (account.role === 'EMPLOYEE') {
        const employee = await getEmployeeByAccountId(account._id);
        return employee && property.employeeId.toString() === employee._id.toString();
    }

    if (account.role === 'MANAGER') {
        const manager = await getManagerByAccountId(account._id);
        if (!manager) return false;

        const employee = await Employee.findById(property.employeeId);
        return employee && employee.managerId.toString() === manager._id.toString();
    }

    return false;
};

const resolveEmployeeId = async (account, employeeIdFromBody) => {
    if (account.role === 'EMPLOYEE') {
        const employee = await getEmployeeByAccountId(account._id);
        if (!employee) {
            return { error: 'Employee chưa có thông tin cá nhân' };
        }
        return { employeeId: employee._id };
    }

    if (account.role === 'MANAGER') {
        if (!employeeIdFromBody) {
            return { error: 'Manager cần chỉ định employeeId' };
        }

        const manager = await getManagerByAccountId(account._id);
        if (!manager) {
            return { error: 'Manager chưa có thông tin cá nhân' };
        }

        const employee = await Employee.findById(employeeIdFromBody);
        if (!employee) {
            return { error: 'Employee không tồn tại' };
        }

        if (employee.managerId.toString() !== manager._id.toString()) {
            return { error: 'Employee không thuộc quyền quản lý của Manager này' };
        }

        return { employeeId: employee._id };
    }

    return { error: 'Không có quyền tạo Property' };
};

export const createProperty = async (req, res) => {
    try {
        const { address, price, area, status, images, employeeId } = req.body;

        if (!address || price == null || area == null) {
            return res.status(400).json({ message: 'address, price, area là bắt buộc' });
        }

        const resolved = await resolveEmployeeId(req.account, employeeId);
        if (resolved.error) {
            return res.status(400).json({ message: resolved.error });
        }

        const property = await Property.create({
            address,
            price,
            area,
            status,
            images: images || [],
            employeeId: resolved.employeeId,
        });

        return res.status(201).json({
            message: 'Tạo Property thành công',
            data: property,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi tạo Property', error: error.message });
    }
};

export const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({ message: 'Property không tồn tại' });
        }

        const allowed = await canManageProperty(req.account, property);
        if (!allowed) {
            return res.status(403).json({ message: 'Bạn không có quyền cập nhật Property này' });
        }

        const { address, price, area, status, images } = req.body;

        if (address !== undefined) property.address = address;
        if (price !== undefined) property.price = price;
        if (area !== undefined) property.area = area;
        if (status !== undefined) property.status = status;
        if (images !== undefined) property.images = images;

        await property.save();

        return res.status(200).json({
            message: 'Cập nhật Property thành công',
            data: property,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật Property', error: error.message });
    }
};
