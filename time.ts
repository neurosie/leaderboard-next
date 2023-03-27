
/**
 * Formats a timestamp like "00:00:00.000"
 */
export function displayTime(timeMs: number) {
    const d = new Date(0);
    d.setMilliseconds(timeMs);
    return `${d.toISOString().substring(11, 19)}.${d.getMilliseconds().toString().padStart(3, '0')}`;
}