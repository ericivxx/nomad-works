import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the BlogListing component
const filePath = path.join(__dirname, 'client', 'src', 'pages', 'BlogListing.tsx');

// Read and update the file
try {
  // Read the file content
  const data = fs.readFileSync(filePath, 'utf8');
  
  // Replace all `/blog/${post.slug}` with `/blog/post/${post.slug}`
  const updatedContent = data.replace(/\/blog\/\${post\.slug}/g, '/blog/post/${post.slug}');
  
  // Write the updated content back to file
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  
  console.log('Successfully updated BlogListing.tsx with the correct blog post links!');
} catch (err) {
  console.error('Error updating file:', err);
}