require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { z, ZodError } = require('zod');
const app = express();
const port = 3000;

const User = require('./models/User');
const userSchema = require('./validators/userValidator');

app.use(express.json()); // For parsing application/json

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));



// Create a new user
app.post('/users', async (req, res) => {
    try {
        const parsed = userSchema.parse(req.body); // Validate request body
        const user = new User(parsed);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json({ message: 'Validation error', errors: err.errors });
        } else {
            res.status(400).json({ message: 'Error creating user', error: err.message });
        }
    }
});

// Read all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
});

// Read a user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const parsed = userSchema.parse(req.body);
        const user = await User.findByIdAndUpdate(req.params.id, parsed, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json({ message: 'Validation error', errors: err.errors });
        } else {
            res.status(400).json({ message: 'Error updating user', error: err.message });
        }
    }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// General error handler
app.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});