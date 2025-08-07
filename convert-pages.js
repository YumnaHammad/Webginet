#!/usr/bin/env node

/**
 * Page Converter Script
 * 
 * This script helps convert existing pages to use the new navbar system.
 * It removes hardcoded navbar HTML and adds the navbar loader script.
 * 
 * Usage: node convert-pages.js [filename.html]
 */

const fs = require('fs');
const path = require('path');

// Function to read file content
function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return null;
    }
}

// Function to write file content
function writeFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error.message);
        return false;
    }
}

// Function to remove hardcoded navbar HTML
function removeHardcodedNavbar(content) {
    // Remove mobile navbar section
    content = content.replace(
        /<!-- Mobile Navbar -->[\s\S]*?<!-- Desktop Navbar -->/g,
        '<!-- Navbar will be automatically loaded -->'
    );
    
    // Remove desktop navbar section
    content = content.replace(
        /<!-- Desktop Navbar -->[\s\S]*?<!-- Navbar End -->/g,
        ''
    );
    
    // Remove any remaining navbar-related HTML
    content = content.replace(
        /<nav class="navbar[\s\S]*?<\/nav>/g,
        ''
    );
    
    // Remove mobile menu divs
    content = content.replace(
        /<div class="mobile-menu"[\s\S]*?<\/div>/g,
        ''
    );
    
    return content;
}

// Function to add navbar loader script
function addNavbarLoaderScript(content) {
    // Check if navbar loader script is already included
    if (content.includes('navbar-loader.js')) {
        console.log('Navbar loader script already included');
        return content;
    }
    
    // Find the closing body tag
    const bodyCloseIndex = content.lastIndexOf('</body>');
    if (bodyCloseIndex === -1) {
        console.log('No closing body tag found');
        return content;
    }
    
    // Add navbar loader script before closing body tag
    const navbarScript = '\n    <!-- Navbar Loader - This will automatically load the navbar -->\n    <script src="js/navbar-loader.js"></script>\n';
    
    const beforeBodyClose = content.substring(0, bodyCloseIndex);
    const afterBodyClose = content.substring(bodyCloseIndex);
    
    return beforeBodyClose + navbarScript + afterBodyClose;
}

// Function to ensure navbar.css is included
function ensureNavbarCSS(content) {
    // Check if navbar.css is already included
    if (content.includes('navbar.css')) {
        console.log('Navbar CSS already included');
        return content;
    }
    
    // Find the closing head tag
    const headCloseIndex = content.lastIndexOf('</head>');
    if (headCloseIndex === -1) {
        console.log('No closing head tag found');
        return content;
    }
    
    // Add navbar CSS before closing head tag
    const navbarCSS = '\n  <link rel="stylesheet" href="css/navbar.css" />\n';
    
    const beforeHeadClose = content.substring(0, headCloseIndex);
    const afterHeadClose = content.substring(headCloseIndex);
    
    return beforeHeadClose + navbarCSS + afterHeadClose;
}

// Function to remove old navbar scripts
function removeOldNavbarScripts(content) {
    // Remove old navbar custom element definitions
    content = content.replace(
        /class MyNavbar extends HTMLElement[\s\S]*?customElements\.define\('my-navbar', MyNavbar\);/g,
        ''
    );
    
    // Remove old mobile menu scripts
    content = content.replace(
        /document\.addEventListener\("DOMContentLoaded", function \(\) \{[\s\S]*?openSubMenu\(id\) \{[\s\S]*?closeAllSubmenus\(\) \{[\s\S]*?\}/g,
        ''
    );
    
    return content;
}

// Main conversion function
function convertPage(filePath) {
    console.log(`Converting ${filePath}...`);
    
    // Read file content
    const content = readFile(filePath);
    if (!content) {
        return false;
    }
    
    let modifiedContent = content;
    
    // Remove hardcoded navbar
    modifiedContent = removeHardcodedNavbar(modifiedContent);
    
    // Remove old navbar scripts
    modifiedContent = removeOldNavbarScripts(modifiedContent);
    
    // Add navbar loader script
    modifiedContent = addNavbarLoaderScript(modifiedContent);
    
    // Ensure navbar CSS is included
    modifiedContent = ensureNavbarCSS(modifiedContent);
    
    // Write modified content back to file
    if (writeFile(filePath, modifiedContent)) {
        console.log(`✅ Successfully converted ${filePath}`);
        return true;
    } else {
        console.log(`❌ Failed to convert ${filePath}`);
        return false;
    }
}

// Function to convert all HTML files in directory
function convertAllPages(directory = '.') {
    const files = fs.readdirSync(directory);
    const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'navbar.html' && file !== 'template-with-navbar.html');
    
    console.log(`Found ${htmlFiles.length} HTML files to convert:`);
    htmlFiles.forEach(file => console.log(`  - ${file}`));
    
    let successCount = 0;
    let failCount = 0;
    
    htmlFiles.forEach(file => {
        const filePath = path.join(directory, file);
        if (convertPage(filePath)) {
            successCount++;
        } else {
            failCount++;
        }
    });
    
    console.log(`\nConversion complete:`);
    console.log(`✅ Successfully converted: ${successCount} files`);
    console.log(`❌ Failed to convert: ${failCount} files`);
}

// Main execution
function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        // Convert all HTML files in current directory
        console.log('Converting all HTML files in current directory...\n');
        convertAllPages();
    } else if (args.length === 1) {
        // Convert specific file
        const filePath = args[0];
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            process.exit(1);
        }
        convertPage(filePath);
    } else {
        console.log('Usage: node convert-pages.js [filename.html]');
        console.log('  If no filename is provided, all HTML files in the current directory will be converted.');
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = {
    convertPage,
    convertAllPages,
    removeHardcodedNavbar,
    addNavbarLoaderScript,
    ensureNavbarCSS
};
