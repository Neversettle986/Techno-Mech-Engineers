
export const generateUserEmail = (name: string): string => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
            .header { background-color: #DC143C; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px; background-color: #fff; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #888; border-top: 1px solid #eee; margin-top: 20px; }
            .button { display: inline-block; background-color: #DC143C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Thank You for Contacting Us</h1>
            </div>
            <div class="content">
                <p>Hello ${name},</p>
                <p>We have received your message and appreciate you reaching out to <strong>Techno Mech Engineers</strong>.</p>
                <p>Our team is reviewing your inquiry and will get back to you as soon as possible, typically within 24 hours.</p>
                <p>If your matter is urgent, please feel free to call us directly.</p>
                <a href="https://technomechengineers.in" class="button">Visit Our Website</a>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Techno Mech Engineers. All rights reserved.</p>
                <p>Hyderabad, Telangana, India</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const generateAdminEmail = (submission: any): string => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
            .header { background-color: #1F2937; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px; background-color: #fff; }
            .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .table th { text-align: left; padding: 10px; background-color: #f8f9fa; border-bottom: 2px solid #eee; width: 30%; }
            .table td { padding: 10px; border-bottom: 1px solid #eee; }
            .status-new { color: green; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Lead Notification</h1>
            </div>
            <div class="content">
                <p><strong>You have a new contact form submission.</strong></p>
                <table class="table">
                    <tr>
                        <th>Date</th>
                        <td>${new Date(submission.date || new Date()).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>${submission.name}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td><a href="mailto:${submission.email}">${submission.email}</a></td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>${submission.phone}</td>
                    </tr>
                    <tr>
                        <th>Company</th>
                        <td>${submission.company || '-'}</td>
                    </tr>
                    <tr>
                        <th>Subject</th>
                        <td>${submission.subject}</td>
                    </tr>
                    <tr>
                        <th>Message</th>
                        <td>${submission.message.replace(/\n/g, '<br>')}</td>
                    </tr>
                </table>
            </div>
        </div>
    </body>
    </html>
    `;
};
