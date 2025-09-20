require('dotenv').config({ path: '.env.local' });
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function seedDemoAccounts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing demo accounts
    await User.deleteMany({ email: { $in: ['student@example.com', 'admin@example.com'] } });
    console.log('Cleared existing demo accounts');

    // Create demo accounts
    const demoAccounts = [
      {
        name: 'Demo Student',
        email: 'student@example.com',
        password: await bcrypt.hash('password123', 12),
        phone: '+1234567890',
        role: 'student'
      },
      {
        name: 'Demo Admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 12),
        phone: '+1234567891',
        role: 'admin'
      }
    ];

    // Insert demo accounts
    const createdUsers = await User.insertMany(demoAccounts);
    console.log('Demo accounts created successfully:');
    createdUsers.forEach(user => {
      console.log(`- ${user.role}: ${user.email}`);
    });

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeding function
seedDemoAccounts();
