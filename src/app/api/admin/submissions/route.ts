import { NextResponse } from 'next/server';
import { getSubmissions, updateSubmission, deleteSubmission, deleteSubmissions } from '@/lib/db';
import { cookies } from 'next/headers';

// Helper to check auth
const isAuthenticated = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    return token?.value === 'admin_authenticated';
};

export async function GET() {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const submissions = getSubmissions();
    return NextResponse.json(submissions);
}

export async function PUT(request: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await request.json();
        const { id, ...updates } = body;
        const updated = updateSubmission(id, updates);
        if (updated) {
            return NextResponse.json({ success: true, submission: updated });
        }
        return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            deleteSubmission(id);
            return NextResponse.json({ success: true });
        }

        // Check for bulk delete
        const body = await request.json().catch(() => null);
        console.log('DELETE request body:', body);
        if (body && Array.isArray(body.ids)) {
            console.log('Deleting IDs:', body.ids);
            deleteSubmissions(body.ids);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Missing ID or IDs' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
