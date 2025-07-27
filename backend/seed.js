const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email: 'testuser@example.com' });
    if (existing) {
      console.log('User already exists. Skipping...');
      return process.exit();
    }

    const user = new User({
      email: 'testuser@example.com',
      password: 'Test1234',
    });

    await user.save();
    console.log('Test user created:', user.email);
    process.exit();
  } catch (err) {
    console.error('Error seeding user:', err.message);
    process.exit(1);
  }
};

seedUser();
