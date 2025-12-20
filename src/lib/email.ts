import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Initialize Resend dynamically to avoid build-time errors if key is missing
const getResendClient = () => {
    if (!RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is missing. Emails will not be sent.');
        return null;
    }
    return new Resend(RESEND_API_KEY);
};

interface SendEmailProps {
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
}

export const sendEmail = async ({ to, subject, html, replyTo }: SendEmailProps) => {
    const resend = getResendClient();
    if (!resend) return { success: false, error: 'Missing API Key' };

    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    try {
        const data = await resend.emails.send({
            from: `Techno Mech <${fromEmail}>`,
            to,
            subject,
            html,
            replyTo: replyTo
        });

        if (data.error) {
            console.error('Resend Email Error:', data.error);
            return { success: false, error: data.error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Email Sending Exception:', error);
        return { success: false, error };
    }
};
