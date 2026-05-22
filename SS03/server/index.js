// import http from 'http';
import express from 'express';
import crypto from 'crypto';
// import data from './data.js';
import { customers } from './data.js';
const app = express();
app.use(express.json());


// tạo server
const PORT = 8080;
const JSON_SERVER = "http://localhost:3004";




app.get('/customers', (req, res) => {
    res.json(customers);
});

app.get('/customers/:id', (req, res) => {
    const { id } = req.params;// lấy id từ params //C001
    const customer = customers.find(c => c.id === id); //C001 = C001
    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
});

app.get("/customers/:customerId/orders", async (req, res) => {
    const { customerId } = req.params;
    try {
        const response = await fetch(`${JSON_SERVER}/orders?customerId=${customerId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        const orders = await response.json();
        res.json(orders);
    } catch (error) {
        res.status(502).json({ error: 'Server is not connected' });
    }

});

app.get("/customers", async (req, res) => {
    try {
        const response = await fetch(`${JSON_SERVER}/customers`);
        if (!response.ok) {
            throw new Error('Failed to fetch customers');
        }
        const customers = await response.json();
        res.json(customers);
    } catch (error) {
        res.status(502).json({ error: 'Server is not connected' });
    }
});

app.post('/customers', (req, res) => {
    const { name, email, age } = req.body; // lấy dữ liệu từ body

    //validate data
    if (!name || !email || age === undefined) {
        return res.status(400).json({ error: 'Name, email and age are required' });
    }

    const isEmailUsed = customers.some(c => c.email === email);
    if (isEmailUsed) {
        return res.status(400).json({ error: 'Email already used' });
    }

    //create new customer 
    //Tao sinh ngau nhien id
    const id = crypto.randomUUID(); // tạo id ngẫu nhiên
    const newCustomer = { id, name, email, age };
    console.log(newCustomer); // tạo customer mới
    customers.push(newCustomer); // thêm customer mới vào customers
    res.status(201).json(newCustomer); // trả về customer mới
});

app.delete('/customers/:id', (req, res) => {
    const { id } = req.params;
    const index = customers.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    customers.splice(index, 1);
    return res.status(200).json({ message: 'Customer deleted successfully' });
  });

app.listen(PORT, () => {
    console.log(`Server is running`);
});



