import crypto from 'crypto';

export function generatePartyKey() {
    const length = 8;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function hashPlayerIp(ipAddress) {
    const hash = crypto.createHash('sha512');
    hash.update(ipAddress);
    const hex = hash.digest('hex');
    return hex.slice(0, 32);
}
