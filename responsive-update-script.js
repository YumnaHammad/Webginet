const fs = require('fs');
const path = require('path');

function updateHTMLFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Add responsive CSS link if not present
        if (!content.includes('css/responsive.css')) {
            const linkPattern = /<link[^>]*css\/style\.css[^>]*>/;
            const responsiveLink = '    <link rel="stylesheet" href="css/responsive.css" />';
            
            if (linkPattern.test(content)) {
                content = content.replace(linkPattern, (match) => {
                    return match + '\n' + responsiveLink;
                });
                modified = true;
            }
        }

        // Remove duplicate CSS imports
        const duplicatePatterns = [
            /<link[^>]*bootstrap[^>]*>[\s\S]*?<link[^>]*bootstrap[^>]*>/gi,
            /<link[^>]*font-awesome[^>]*>[\s\S]*?<link[^>]*font-awesome[^>]*>/gi,
            /<link[^>]*bootstrap-icons[^>]*>[\s\S]*?<link[^>]*bootstrap-icons[^>]*>/gi
        ];

        duplicatePatterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                matches.forEach(match => {
                    const lines = match.split('\n');
                    const uniqueLines = [...new Set(lines)];
                    content = content.replace(match, uniqueLines.join('\n'));
                    modified = true;
                });
            }
        });

        // Ensure proper viewport meta tag
        if (!content.includes('viewport')) {
            const headPattern = /<head[^>]*>/;
            const viewportMeta = '    <meta name="viewport" content="width=device-width, initial-scale=1.0">';
            
            if (headPattern.test(content)) {
                content = content.replace(headPattern, (match) => {
                    return match + '\n' + viewportMeta;
                });
                modified = true;
            }
        }

        // Add responsive classes to images
        const imgPattern = /<img([^>]*?)>/g;
        content = content.replace(imgPattern, (match, attributes) => {
            if (!attributes.includes('img-fluid') && !attributes.includes('class=')) {
                return `<img class="img-fluid"${attributes}>`;
            } else if (!attributes.includes('img-fluid') && attributes.includes('class=')) {
                return match.replace('class="', 'class="img-fluid ');
            }
            return match;
        });

        // Wrap tables in table-responsive divs
        const tablePattern = /<table([^>]*?)>/g;
        content = content.replace(tablePattern, (match, attributes) => {
            const beforeTable = content.substring(0, content.indexOf(match));
            const afterTable = content.substring(content.indexOf(match) + match.length);
            
            // Check if table is already wrapped
            const beforeLines = beforeTable.split('\n');
            const lastLine = beforeLines[beforeLines.length - 1].trim();
            
            if (!lastLine.includes('table-responsive')) {
                return '<div class="table-responsive">\n' + match;
            }
            return match;
        });

        // Close table-responsive divs
        const closeTablePattern = /<\/table>/g;
        content = content.replace(closeTablePattern, (match) => {
            const afterTable = content.substring(content.indexOf(match) + match.length);
            const afterLines = afterTable.split('\n');
            const nextLine = afterLines[0].trim();
            
            if (!nextLine.includes('</div>') && !nextLine.includes('table-responsive')) {
                return match + '\n</div>';
            }
            return match;
        });

        // Add form-control class to form inputs
        const inputPattern = /<input([^>]*?)>/g;
        content = content.replace(inputPattern, (match, attributes) => {
            if (!attributes.includes('form-control') && !attributes.includes('class=')) {
                return `<input class="form-control"${attributes}>`;
            } else if (!attributes.includes('form-control') && attributes.includes('class=')) {
                return match.replace('class="', 'class="form-control ');
            }
            return match;
        });

        // Update spacing classes for better mobile responsiveness
        const spacingPatterns = [
            { from: 'py-5', to: 'py-3 py-md-5' },
            { from: 'my-5', to: 'my-3 my-md-5' },
            { from: 'pt-5', to: 'pt-3 pt-md-5' },
            { from: 'pb-5', to: 'pb-3 pb-md-5' },
            { from: 'px-5', to: 'px-3 px-md-5' },
            { from: 'mx-5', to: 'mx-3 mx-md-5' }
        ];

        spacingPatterns.forEach(pattern => {
            const regex = new RegExp(`\\b${pattern.from}\\b`, 'g');
            if (content.includes(pattern.from)) {
                content = content.replace(regex, pattern.to);
                modified = true;
            }
        });

        // Update column classes for better mobile responsiveness
        const columnPatterns = [
            { from: 'col-lg-', to: 'col-12 col-md-6 col-lg-' },
            { from: 'col-xl-', to: 'col-12 col-md-6 col-lg-4 col-xl-' },
            { from: 'col-md-', to: 'col-12 col-md-' }
        ];

        columnPatterns.forEach(pattern => {
            const regex = new RegExp(`\\b${pattern.from}(\\d+)\\b`, 'g');
            if (content.includes(pattern.from)) {
                content = content.replace(regex, (match, number) => {
                    return pattern.to + number;
                });
                modified = true;
            }
        });

        // Add text-center class to main content areas on small screens
        const contentSections = [
            'section', 'div', 'article', 'aside', 'header', 'footer', 'main'
        ];

        contentSections.forEach(tag => {
            const tagPattern = new RegExp(`<${tag}([^>]*?)>`, 'g');
            content = content.replace(tagPattern, (match, attributes) => {
                if (!attributes.includes('text-center') && !attributes.includes('class=')) {
                    return `<${tag} class="text-center"${attributes}>`;
                } else if (!attributes.includes('text-center') && attributes.includes('class=')) {
                    return match.replace('class="', 'class="text-center ');
                }
                return match;
            });
        });

        // Add responsive centering classes to headings
        const headingPattern = /<(h[1-6])([^>]*?)>/g;
        content = content.replace(headingPattern, (match, tag, attributes) => {
            if (!attributes.includes('text-center') && !attributes.includes('class=')) {
                return `<${tag} class="text-center"${attributes}>`;
            } else if (!attributes.includes('text-center') && attributes.includes('class=')) {
                return match.replace('class="', 'class="text-center ');
            }
            return match;
        });

        // Add responsive centering classes to paragraphs
        const paragraphPattern = /<p([^>]*?)>/g;
        content = content.replace(paragraphPattern, (match, attributes) => {
            if (!attributes.includes('text-center') && !attributes.includes('class=')) {
                return `<p class="text-center"${attributes}>`;
            } else if (!attributes.includes('text-center') && attributes.includes('class=')) {
                return match.replace('class="', 'class="text-center ');
            }
            return match;
        });

        // Add responsive centering classes to buttons
        const buttonPattern = /<(button|a)([^>]*?class="[^"]*btn[^"]*"[^>]*?)>/g;
        content = content.replace(buttonPattern, (match, tag, attributes) => {
            if (!attributes.includes('d-block') && !attributes.includes('mx-auto')) {
                return match.replace('class="', 'class="d-block mx-auto ');
            }
            return match;
        });

        // Add responsive centering classes to images
        const imgCenterPattern = /<img([^>]*?)>/g;
        content = content.replace(imgCenterPattern, (match, attributes) => {
            if (!attributes.includes('d-block') && !attributes.includes('mx-auto')) {
                if (!attributes.includes('class=')) {
                    return `<img class="d-block mx-auto"${attributes}>`;
                } else {
                    return match.replace('class="', 'class="d-block mx-auto ');
                }
            }
            return match;
        });

        // Add responsive centering classes to forms
        const formPattern = /<form([^>]*?)>/g;
        content = content.replace(formPattern, (match, attributes) => {
            if (!attributes.includes('text-center') && !attributes.includes('class=')) {
                return `<form class="text-center"${attributes}>`;
            } else if (!attributes.includes('text-center') && attributes.includes('class=')) {
                return match.replace('class="', 'class="text-center ');
            }
            return match;
        });

        // Add responsive centering classes to cards
        const cardPattern = /<div([^>]*?class="[^"]*card[^"]*"[^>]*?)>/g;
        content = content.replace(cardPattern, (match, attributes) => {
            if (!attributes.includes('text-center')) {
                return match.replace('class="', 'class="text-center ');
            }
            return match;
        });

        // Add responsive centering classes to lists
        const listPattern = /<(ul|ol)([^>]*?)>/g;
        content = content.replace(listPattern, (match, tag, attributes) => {
            if (!attributes.includes('text-center') && !attributes.includes('class=')) {
                return `<${tag} class="text-center"${attributes}>`;
            } else if (!attributes.includes('text-center') && attributes.includes('class=')) {
                return match.replace('class="', 'class="text-center ');
            }
            return match;
        });

        // Add responsive centering classes to list items
        const listItemPattern = /<li([^>]*?)>/g;
        content = content.replace(listItemPattern, (match, attributes) => {
            if (!attributes.includes('text-center') && !attributes.includes('class=')) {
                return `<li class="text-center"${attributes}>`;
            } else if (!attributes.includes('text-center') && attributes.includes('class=')) {
                return match.replace('class="', 'class="text-center ');
            }
            return match;
        });

        // Add responsive centering classes to navigation
        const navPattern = /<nav([^>]*?)>/g;
        content = content.replace(navPattern, (match, attributes) => {
            if (!attributes.includes('text-center') && !attributes.includes('class=')) {
                return `<nav class="text-center"${attributes}>`;
            } else if (!attributes.includes('text-center') && attributes.includes('class=')) {
                return match.replace('class="', 'class="text-center ');
            }
            return match;
        });

        // Add responsive centering classes to tables
        const tableCenterPattern = /<table([^>]*?)>/g;
        content = content.replace(tableCenterPattern, (match, attributes) => {
            if (!attributes.includes('text-center') && !attributes.includes('class=')) {
                return `<table class="text-center"${attributes}>`;
            } else if (!attributes.includes('text-center') && attributes.includes('class=')) {
                return match.replace('class="', 'class="text-center ');
            }
            return match;
        });

        // Add responsive centering classes to table cells
        const cellPattern = /<(th|td)([^>]*?)>/g;
        content = content.replace(cellPattern, (match, tag, attributes) => {
            if (!attributes.includes('text-center') && !attributes.includes('class=')) {
                return `<${tag} class="text-center"${attributes}>`;
            } else if (!attributes.includes('text-center') && attributes.includes('class=')) {
                return match.replace('class="', 'class="text-center ');
            }
            return match;
        });

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated: ${filePath}`);
        } else {
            console.log(`⏭️  No changes needed: ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

function findHTMLFiles(dir) {
    const files = [];
    
    function traverse(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                traverse(fullPath);
            } else if (item.endsWith('.html')) {
                files.push(fullPath);
            }
        }
    }
    
    traverse(dir);
    return files;
}

function main() {
    const projectDir = process.cwd();
    const htmlFiles = findHTMLFiles(projectDir);
    
    console.log(`🚀 Starting responsive updates for ${htmlFiles.length} HTML files...\n`);
    
    let updatedCount = 0;
    let errorCount = 0;
    
    for (const file of htmlFiles) {
        try {
            updateHTMLFile(file);
            updatedCount++;
        } catch (error) {
            console.error(`❌ Failed to update ${file}:`, error.message);
            errorCount++;
        }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`✅ Successfully processed: ${updatedCount} files`);
    if (errorCount > 0) {
        console.log(`❌ Errors: ${errorCount} files`);
    }
    console.log(`\n🎉 Responsive centering updates complete!`);
    console.log(`📱 All content will now be centered on small screens (≤768px)`);
}

if (require.main === module) {
    main();
}

module.exports = { updateHTMLFile, findHTMLFiles }; 