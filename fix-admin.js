import fs from 'fs';
import bcrypt from 'bcryptjs';

async function fixAdminUser() {
  try {
    // Read the current user data
    const userData = JSON.parse(fs.readFileSync('user_data.json', 'utf8'));

    // Find the admin user
    const adminUser = userData.find(user => user.email === 'admin@example.com');

    if (!adminUser) {
      console.log('Admin user not found. Creating admin user...');
      // Create admin user if it doesn't exist
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const newAdmin = {
        id: userData.length > 0 ? Math.max(...userData.map(u => u.id)) + 1 : 1,
        email: 'admin@example.com',
        password: hashedPassword,
        fullName: 'Admin User',
        gender: null,
        location: null,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        savedJobs: [],
        username: 'adminuser',
        role: 'admin',
        bio: null,
        savedSearches: [],
        isVerified: true
      };
      userData.push(newAdmin);
      console.log('Created new admin user with password: admin123');
    } else {
      // Reset admin password
      console.log('Found admin user, resetting password...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser.password = hashedPassword;
      console.log('Reset admin password to: admin123');
    }

    // Save the updated user data
    fs.writeFileSync('user_data.json', JSON.stringify(userData, null, 2));
    console.log('User data saved successfully.');
  } catch (error) {
    console.error('Error fixing admin user:', error);
  }
}

// Run the function
fixAdminUser();