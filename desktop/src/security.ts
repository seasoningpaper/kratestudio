/** Only the bundled top-level application may use the desktop bridge. */
export function isApplicationURL(value: string): boolean {
    try {
        const url = new URL(value);
        return url.protocol === 'koi:' && url.hostname === 'app' &&
            !url.username && !url.password && !url.port &&
            url.pathname === '/index.html' && !url.search;
    }
    catch {
        return false;
    }
}
