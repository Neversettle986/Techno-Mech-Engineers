import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://technomechengineers.in';

    // Core pages
    const routes = [
        '',
        '/about',
        '/products',
        '/services',
        '/contact',
        '/privacy-policy',
        '/terms-conditions',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
