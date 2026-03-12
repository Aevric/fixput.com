// scripts/toggle-content.js
window.addEventListener('load', function() {
    const config = {
        triggerKeys: ['Enter', ' '],
        debounceTime: 200,
        initialEls: ['initial', 'fishes'],
        targetEls: ['target-related']
    };

    let isTargetShow = false;
    let lastTrigger = 0;
    const initialEls = config.initialEls.map(id => document.getElementById(id));
    const targetEls = config.targetEls.map(id => document.getElementById(id));

    /**
     * @param {HTMLElement[]} els
     * @param {boolean} isShow
     */
    function toggleElements(els, isShow) {
        els.forEach(el => {
            if (!el) return;
            el.classList.toggle('hide', !isShow);
            el.classList.toggle('show', isShow);
            if (el.tagName === 'CANVAS') {
                el.style.display = isShow ? 'block' : 'none';
            } else {
                el.style.display = isShow ? 'flex' : 'none';
            }
        });
    }

    function switchContent(e) {
        const isTrigger = config.triggerKeys.some(key => {
            return (key === 'Enter' && e.keyCode === 13) || 
                   (key === ' ' && e.keyCode === 32) || 
                   e.key === key;
        });
        if (!isTrigger) return;

        const now = Date.now();
        if (now - lastTrigger < config.debounceTime) return;
        lastTrigger = now;

        isTargetShow = !isTargetShow;

        toggleElements(initialEls, !isTargetShow);
        toggleElements(targetEls, isTargetShow);
    }

    document.addEventListener('keydown', switchContent);
});
