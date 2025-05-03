const fs = require('fs');
const path = require('path');

// Path to the output directory
const outDir = path.join(__dirname, '..', 'out');

// Path to the index.html file
const indexPath = path.join(outDir, 'index.html');

// Read the index.html file
fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }

  // Add the SPA redirect script
  const modifiedData = data.replace(
    '</head>',
    '<script type="text/javascript" src="/Apt_Fincare/spa-redirect.js"></script></head>'
  );

  // Write the modified index.html file
  fs.writeFile(indexPath, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing index.html:', err);
      return;
    }
    console.log('Successfully modified index.html');
  });
});
