import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import https from 'https';

// Automatically download placeholder images if they don't exist or are empty (0 bytes)
const publicDir = resolve(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function downloadFile(url: string, dest: string) {
  try {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      return; // Already exists and has content
    }
  } catch (e) {
    // Stat might fail, ignore and attempt download
  }

  https.get(url, (response) => {
    if (response.statusCode === 302 || response.statusCode === 301) {
      if (response.headers.location) {
        downloadFile(response.headers.location, dest);
      }
      return;
    }
    const file = fs.createWriteStream(dest);
    response.pipe(file);
    file.on('finish', () => {
      file.close();
    });
  }).on('error', () => {
    // Fail silently on network errors
  });
}

downloadFile('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&h=400&q=80', resolve(publicDir, '01.png'));
downloadFile('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&h=100&q=80', resolve(publicDir, 'logo.png'));
downloadFile('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=32&h=32&q=80', resolve(publicDir, 'fevicon.png'));

export default defineConfig({
  base: process.env.BASE_URL || '/',
  publicDir: 'public',
  server: {
    port: 3000,
    host: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        pcbDesign: resolve(__dirname, 'pcb-design.html'),
        products: resolve(__dirname, 'products.html'),
        industries: resolve(__dirname, 'industries.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        blogs: resolve(__dirname, 'blogs.html'),
        careers: resolve(__dirname, 'careers.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacyPolicy: resolve(__dirname, 'privacy-policy.html'),
        termsAndConditions: resolve(__dirname, 'terms-and-conditions.html'),
        notFound: resolve(__dirname, '404.html'),
      }
    }
  }
});
