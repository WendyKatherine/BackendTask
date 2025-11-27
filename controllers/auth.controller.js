import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secretito', {
    expiresIn: '7d',
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const user = await User.create({ name, email, password });
    const token = createToken(user._id);

    return res.status(201).json({
      message: 'Usuario creado correctamente',
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error('❌ Error al registrar usuario:', err);
    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = createToken(user._id);

    return res.json({
      message: 'Login correcto',
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error('❌ Error al iniciar sesión:', err);
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};
