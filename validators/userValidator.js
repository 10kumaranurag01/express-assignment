const { z } = require('zod');

const userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format')
});

module.exports = userSchema;
