export function generateUserId(): string {
    // Example: uid_ks7d83hsb_1733827381723
    return "uid_" + Math.random().toString(36).substring(2) + "_" + Date.now();
}
