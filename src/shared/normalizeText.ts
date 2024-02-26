export default function normalizeText(text: string, limit: number): string {
    const normalized = text.replace(/\n/g, ' ').replace(/ +/g, ' ').trim();
    return normalized.substring(0, limit) + (normalized.length > limit ? '...' : '');
}
