const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set environment variables
process.env.NODE_ENV = 'production';
process.env.NEXTAUTH_URL = 'https://tarang07q.github.io/Apt_Fincare';
process.env.NEXTAUTH_SECRET = 'TWPJQGsS1m1Q59Ts1AIgqMbnPBQy+b8zdyWz/zVILFs=';
process.env.RESEND_API_KEY = 'dummy_key_for_static_build';
process.env.MONGODB_URI = 'mongodb://localhost:27017/fintrack-manager';

// Create a temporary next.config.js without the export option
const originalConfigPath = path.join(__dirname, '..', 'next.config.mjs');
const tempConfigPath = path.join(__dirname, '..', 'next.config.temp.mjs');
const outDir = path.join(__dirname, '..', 'out');

// Read the original config
let configContent = fs.readFileSync(originalConfigPath, 'utf8');

// Modify the config to remove the export option
configContent = configContent.replace("output: 'export',", "// output: 'export',");

// Write the temporary config
fs.writeFileSync(tempConfigPath, configContent);

try {
  // Rename the config files
  fs.renameSync(originalConfigPath, originalConfigPath + '.bak');
  fs.renameSync(tempConfigPath, originalConfigPath);

  // Build the application
  console.log('Building the application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Create the out directory if it doesn't exist
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Copy the .next directory to out
  console.log('Copying build files to out directory...');
  execSync('cp -r .next/* out/', { stdio: 'inherit' });

  // Create a .nojekyll file
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '');

  // Copy the 404.html file
  const publicDir = path.join(__dirname, '..', 'public');
  if (fs.existsSync(path.join(publicDir, '404.html'))) {
    fs.copyFileSync(path.join(publicDir, '404.html'), path.join(outDir, '404.html'));
  }

  // Copy the spa-redirect.js file
  if (fs.existsSync(path.join(publicDir, 'spa-redirect.js'))) {
    fs.copyFileSync(path.join(publicDir, 'spa-redirect.js'), path.join(outDir, 'spa-redirect.js'));
  }

  console.log('Static build completed successfully!');
} catch (error) {
  console.error('Error during build:', error);
} finally {
  // Restore the original config
  if (fs.existsSync(originalConfigPath + '.bak')) {
    fs.renameSync(originalConfigPath + '.bak', originalConfigPath);
  }
}
