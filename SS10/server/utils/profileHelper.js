import Manager from '../model/Manager.js';
import Employee from '../model/Employee.js';
import Customer from '../model/Customer.js';

export const getProfileByRole = async (account) => {
    const { role, _id: accountId } = account;

    if (role === 'MANAGER') {
        return Manager.findOne({ accountId });
    }

    if (role === 'EMPLOYEE') {
        return Employee.findOne({ accountId }).populate('managerId');
    }

    if (role === 'CUSTOMER') {
        return Customer.findOne({ accountId });
    }

    return null;
};

export const getManagerByAccountId = (accountId) => Manager.findOne({ accountId });

export const getEmployeeByAccountId = (accountId) => Employee.findOne({ accountId });
