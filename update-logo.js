#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateFile(filePath) {
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  // Check if it's an SVG file
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== '.svg') {
    throw new Error(`Invalid file type: ${ext}. Only SVG files are supported.`);
  }

  // Check file size (should be reasonable for an SVG)
  const stats = fs.statSync(filePath);
  const fileSizeInMB = stats.size / (1024 * 1024);
  if (fileSizeInMB > 5) {
    throw new Error(`File too large: ${fileSizeInMB.toFixed(2)}MB. SVG files should typically be under 5MB.`);
  }

  return true;
}

function backupCurrentLogo() {
  const logoPath = path.join(__dirname, 'src', 'assets', 'logo.svg');
  const backupPath = path.join(__dirname, 'src', 'assets', `logo-backup-${Date.now()}.svg`);
  
  if (fs.existsSync(logoPath)) {
    fs.copyFileSync(logoPath, backupPath);
    log(`✅ Current logo backed up to: ${path.relative(__dirname, backupPath)}`, 'green');
    return backupPath;
  }
  
  return null;
}

function updateLogo(sourcePath) {
  const targetPath = path.join(__dirname, 'src', 'assets', 'logo.svg');
  const targetDir = path.dirname(targetPath);
  
  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    log(`📁 Created directory: ${path.relative(__dirname, targetDir)}`, 'blue');
  }
  
  // Backup current logo
  const backupPath = backupCurrentLogo();
  
  // Copy new logo
  fs.copyFileSync(sourcePath, targetPath);
  log(`✅ Logo updated successfully!`, 'green');
  log(`📍 New logo location: ${path.relative(__dirname, targetPath)}`, 'blue');
  
  return { targetPath, backupPath };
}

function optimizeSVG(filePath) {
  try {
    let svgContent = fs.readFileSync(filePath, 'utf8');
    
    // Basic SVG optimizations
    const optimizations = [
      // Remove comments
      { pattern: /<!--[\s\S]*?-->/g, replacement: '' },
      // Remove unnecessary whitespace
      { pattern: />\s+</g, replacement: '><' },
      // Remove empty attributes
      { pattern: /\s+[a-zA-Z-]+=""\s*/g, replacement: ' ' },
      // Clean up multiple spaces
      { pattern: /\s{2,}/g, replacement: ' ' }
    ];
    
    optimizations.forEach(({ pattern, replacement }) => {
      svgContent = svgContent.replace(pattern, replacement);
    });
    
    // Ensure SVG has proper attributes for React
    if (!svgContent.includes('xmlns=')) {
      svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    
    // Add currentColor for dynamic styling if not present
    if (!svgContent.includes('currentColor') && !svgContent.includes('fill=')) {
      svgContent = svgContent.replace('<svg', '<svg fill="currentColor"');
    }
    
    fs.writeFileSync(filePath, svgContent.trim());
    log(`🎨 SVG optimized for web usage`, 'yellow');
    
    return true;
  } catch (error) {
    log(`⚠️  SVG optimization failed: ${error.message}`, 'yellow');
    return false;
  }
}

function showUsageInstructions() {
  log('\n📋 Next Steps:', 'bold');
  log('1. Restart your development server:', 'blue');
  log('   npm run dev', 'green');
  log('\n2. Or rebuild your project:', 'blue');
  log('   npm run build', 'green');
  log('\n3. Your new logo will appear throughout the application!', 'blue');
  log('\n💡 Pro Tips:', 'bold');
  log('• Your logo will automatically adapt to different colors using CSS', 'yellow');
  log('• Use className="text-nyano-terracotta" to make it terracotta colored', 'yellow');
  log('• Use className="text-white" for white logo on dark backgrounds', 'yellow');
  log('• The logo is now fully responsive and accessible', 'yellow');
}

function promptForFile() {
  return new Promise((resolve) => {
    log('\n🏔️  Darjeeling Soul Logo Updater', 'bold');
    log('=====================================', 'blue');
    
    rl.question('\n📁 Enter the path to your new logo file (SVG format): ', (answer) => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  try {
    // Get file path from user
    const filePath = await promptForFile();
    
    if (!filePath) {
      log('❌ No file path provided. Exiting.', 'red');
      process.exit(1);
    }
    
    // Resolve absolute path
    const absolutePath = path.resolve(filePath);
    log(`\n🔍 Checking file: ${absolutePath}`, 'blue');
    
    // Validate file
    validateFile(absolutePath);
    log('✅ File validation passed', 'green');
    
    // Update logo
    const { targetPath, backupPath } = updateLogo(absolutePath);
    
    // Optimize SVG
    optimizeSVG(targetPath);
    
    // Show success message
    log('\n🎉 Logo Update Complete!', 'bold');
    log('========================', 'green');
    
    if (backupPath) {
      log(`💾 Previous logo backed up to: ${path.relative(__dirname, backupPath)}`, 'yellow');
    }
    
    // Show usage instructions
    showUsageInstructions();
    
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    log('\n💡 Make sure:', 'yellow');
    log('• The file path is correct', 'yellow');
    log('• The file is an SVG format', 'yellow');
    log('• You have read permissions for the file', 'yellow');
    log('• The file is not corrupted', 'yellow');
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Handle script interruption
process.on('SIGINT', () => {
  log('\n\n👋 Logo update cancelled by user', 'yellow');
  rl.close();
  process.exit(0);
});

// Run the script
if (require.main === module) {
  main();
}

module.exports = { updateLogo, validateFile, optimizeSVG };