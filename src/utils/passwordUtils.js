import bcrypt from 'bcryptjs';

export const comparePassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};
