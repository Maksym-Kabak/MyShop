import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Max Smith',
        email: 'Max@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Alina Smith',
        email: 'Alina@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users;
