// scripts/gradient-switch.js
window.addEventListener('load', function() {
    const colorBlocks = document.querySelectorAll('.color-block');
    const body = document.body;
    const html = document.documentElement;

    html.style.height = '100vh';
    body.style.height = '100vh';

    colorBlocks.forEach(block => {
        block.addEventListener('click', function() {
            const parentWrap = this.closest('.gradient-blocks-wrap');
            if (parentWrap.classList.contains('hide')) return;

            const bgValue = this.getAttribute('data-gradient') || '';
            body.style.background = '';

            if (bgValue.trim().startsWith('url(')) {
                body.style.backgroundImage = bgValue;
                body.style.backgroundPosition = '0 0';
                body.style.backgroundSize = 'auto';
                body.style.backgroundRepeat = 'repeat';
                body.style.backgroundAttachment = 'scroll';
            } else if (bgValue.trim().startsWith('linear-gradient(')) {
                body.style.background = bgValue;
            } else {
                body.style.background = 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)';
            }
        });
    });

    window.addEventListener('resize', function() {
        body.style.height = '100vh';
        html.style.height = '100vh';
        body.style.overflow = 'hidden';
    });
});
