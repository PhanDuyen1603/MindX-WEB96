import crypto from 'crypto';

export const generateRandomString = (length = 12) => {
    return crypto.randomBytes(length).toString('hex').substring(0, length);
};

export const buildApiKey = (customerId, email, randomString) => {
    return `web-$${customerId}-$${email}-$${randomString}$`;
};

