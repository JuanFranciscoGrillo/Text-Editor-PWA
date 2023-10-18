const butInstall = document.getElementById('buttonInstall');

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const ev = window.deferredPrompt;
    if (ev) {
        ev.prompt();
        window.deferredPrompt = null;
        butInstall.classList.toggle('hidden', true);
    } else {
        return;
    }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
