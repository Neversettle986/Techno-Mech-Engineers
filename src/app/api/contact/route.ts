import { NextResponse } from 'next/server';
import { addSubmission } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Strict Validation
        const phoneRegex = /^\d{10}$/;
        const cleanPhone = body.phone ? body.phone.replace(/\D/g, '') : '';

        if (!phoneRegex.test(cleanPhone)) {
            return NextResponse.json(
                { error: 'Invalid phone number. Must be exactly 10 digits.' },
                { status: 400 }
            );
        }

        if (!body.email.toLowerCase().endsWith('@gmail.com')) {
            return NextResponse.json(
                { error: 'Invalid email. Only @gmail.com addresses are supported.' },
                { status: 400 }
            );
        }

        // Format phone with +91 if valid
        body.phone = `+91 ${cleanPhone}`;

        // Verify reCAPTCHA
        const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
        if (recaptchaSecret && body.captchaValue) {
            try {
                const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${body.captchaValue}`;
                const recaptchaRes = await fetch(verifyUrl, { method: 'POST' });
                const recaptchaJson = await recaptchaRes.json();

                console.log('reCAPTCHA response:', recaptchaJson);

                // Check verification result and score (v3 only)
                if (!recaptchaJson.success || recaptchaJson.score < 0.5) {
                    console.error('reCAPTCHA verification failed:', recaptchaJson);
                    return NextResponse.json(
                        { error: 'Verification failed. We suspect you might be a bot. Please try again or contact us directly.' },
                        { status: 400 }
                    );
                }
            } catch (captchaError) {
                console.error('reCAPTCHA verification error:', captchaError);
                // Fail open or closed? Here we fail closed to be safe.
                return NextResponse.json(
                    { error: 'Security check failed. Please try again.' },
                    { status: 500 }
                );
            }
        }

        const submission = addSubmission(body);

        return NextResponse.json({ success: true, submission });
    } catch (error) {
        console.error('Error processing submission:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
