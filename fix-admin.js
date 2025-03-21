import fs from 'fs';
import bcrypt from 'bcryptjs';

async function fixAdminUser() {
  try {
    // Read the current user data
    const userData = JSON.parse(fs.readFileSync('user_data.json', 'utf8'));

    // Find the admin user by username
    const adminUser = userData.find(user => user.username === 'ivxx215');

    if (!adminUser) {
      console.log('Custom admin user not found. Creating admin user...');
      // Create admin user if it doesn't exist
      const hashedPassword = await bcrypt.hash('M4rdukly!', 10);
      const newAdmin = {
        id: userData.length > 0 ? Math.max(...userData.map(u => u.id)) + 1 : 1,
        email: 'ivxx215@nomadworks.com',
        password: hashedPassword,
        fullName: 'Custom Admin',
        gender: null,
        location: null,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        savedJobs: [],
        username: 'ivxx215',
        role: 'admin',
        bio: null,
        savedSearches: [],
        isVerified: true
      };
      userData.push(newAdmin);
      console.log('Created new admin user with username: ivxx215');
    } else {
      // Reset admin password
      console.log('Found admin user, resetting password...');
      const hashedPassword = await bcrypt.hash('M4rdukly!', 10);
      adminUser.password = hashedPassword;
      adminUser.role = 'admin'; // Ensure the user has admin role
      console.log('Reset admin password and set role to admin');
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