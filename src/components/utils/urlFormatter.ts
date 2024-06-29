export function urlFormatter(url: string): string {
    if(!url) return '#';
    if(url.startsWith('https://') || url.startsWith('http://')) return url;
    return `https://${url}`;
}