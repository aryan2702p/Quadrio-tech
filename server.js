require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoute');
const carRoutes = require('./routes/carRoute');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/register', (req, res) => {
  console.log('register');
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});
app.get('/dashboard', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
app.get('/list', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'list.html'));
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/admin', adminRoutes);


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
