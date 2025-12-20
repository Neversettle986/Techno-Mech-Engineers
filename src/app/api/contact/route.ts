import { NextResponse } from 'next/server';
import { addSubmission } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { generateUserEmail, generateAdminEmail } from '@/lib/email-templates';

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

        const submission = await addSubmission(body);

        // Send Email Notifications (Fire and Forget or Await safely)
        const adminEmail = process.env.ADMIN_EMAIL;
        const emailPromises = [];

        // 1. User Confirmation Email
        if (body.email) {
            emailPromises.push(sendEmail({
                to: body.email,
                subject: 'We received your message - Techno Mech Engineers',
                html: generateUserEmail(body.name, {
                    phone: body.phone,
                    email: body.email,
                    subject: body.subject
                })
            }));
        }

        // 2. Admin Notification Email
        if (adminEmail) {
            emailPromises.push(sendEmail({
                to: adminEmail,
                subject: `New Contact Form: ${body.subject}`,
                html: generateAdminEmail(submission)
            }));
        }

        // Execute email sending without blocking the response too long, or handle errors silently
        await Promise.allSettled(emailPromises);

        return NextResponse.json({ success: true, submission });
    } catch (error) {
        console.error('Error processing submission:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
