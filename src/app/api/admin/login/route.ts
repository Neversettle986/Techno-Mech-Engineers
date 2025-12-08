import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Hardcoded credentials as requested
        if (username === 'technomech' && password === 'antigravity.com') {
            // Set a simple auth cookie
            const response = NextResponse.json({ success: true });
            response.cookies.set('auth_token', 'admin_authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 24 hours
            });

            return response;
        }

        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
