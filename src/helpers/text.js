export async function copyToClipboard(text) {
    if (!text) return false;

    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (err) {
        console.warn('navigator.clipboard failed, fallback used:', err);
    }

    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        const success = document.execCommand('copy');
        document.body.removeChild(textarea);

        return success;
    } catch (err) {
        console.error('Fallback copy failed:', err);
        return false;
    }
}
