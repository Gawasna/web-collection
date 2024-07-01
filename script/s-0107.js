document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('glow-image');
    
    // Load image and analyze dominant color
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imgObj = new Image();
    imgObj.src = img.src;
    
    imgObj.onload = function() {
        canvas.width = this.width;
        canvas.height = this.height;
        ctx.drawImage(this, 0, 0);
        
        // Analyze dominant color
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const color = getDominantColor(imageData);
        
        // Set custom CSS variable for glow color
        document.documentElement.style.setProperty('--glow-color', `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`);
    };
});

// Function to get dominant color from image data
function getDominantColor(imageData) {
    const pixelCount = imageData.length / 4; // 4 components: RGBA
    let r = 0, g = 0, b = 0;

    for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
    }

    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    return { r, g, b };
}
