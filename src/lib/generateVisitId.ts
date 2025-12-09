export function generateVisitId(): string {
    // Example: visit_ks7d83hsb_1733827381723
    return "visit_" + Math.random().toString(36).substring(2) + "_" + Date.now();
}
