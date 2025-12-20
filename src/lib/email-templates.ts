
export const generateUserEmail = (name: string): string => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; overflow: hidden; }
            .header { background-color: #000000; padding: 40px 20px; text-align: center; }
            .logo { max-height: 50px; }
            .content { padding: 40px 40px; }
            .greeting { font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #111; }
            .message { color: #555; margin-bottom: 30px; }
            .details-box { background-color: #f9f9f9; padding: 20px; border-radius: 4px; margin-bottom: 30px; }
            .detail-row { margin-bottom: 15px; }
            .detail-label { font-size: 12px; text-transform: uppercase; color: #888; font-weight: bold; display: block; margin-bottom: 5px; }
            .detail-value { font-size: 16px; color: #333; font-weight: 500; }
            .cta-button { display: block; width: 100%; background-color: #000000; color: #ffffff; text-align: center; padding: 15px 0; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; border-radius: 4px; margin-top: 20px; }
            .footer { background-color: #1a1a1a; padding: 40px 20px; text-align: center; color: #666; font-size: 12px; }
            .footer p { margin: 5px 0; }
            .social-links { margin-bottom: 20px; }
            .social-icon { display: inline-block; width: 30px; height: 30px; background-color: #333; border-radius: 50%; margin: 0 5px; line-height: 30px; color: #fff; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                 <!-- Replace with absolute URL in production if possible, currently pointing to generic placeholder or potential public asset link -->
                 <img src="https://technomechengineers.in/assets/logo.jpg" alt="Techno Mech Engineers" class="logo" style="max-height: 60px; border-radius: 4px;">
            </div>
            <div class="content">
                <div class="greeting">${name}, thank you for contacting us.</div>
                <div class="message">
                    <p>We have received your message and our team is currently reviewing your inquiry. You will receive an update from us shortly regarding your request.</p>
                </div>

                <div class="details-box">
                     <div class="detail-row">
                        <span class="detail-label">Inquiry ID</span>
                        <span class="detail-value">REQ-${Math.floor(Math.random() * 1000000)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Status</span>
                        <span class="detail-value" style="color: #2e7d32;">Received</span>
                    </div>
                </div>

                <a href="https://technomechengineers.in" class="cta-button">Visit Our Website</a>
            </div>
            <div class="footer">
                <div class="social-links">
                    <!-- Placeholder placeholders -->
                    <span style="color: #444;">&bull;</span>
                </div>
                <p>Techno Mech Engineers</p>
                <p>Hyderabad, Telangana, India</p>
                <p style="margin-top: 20px; font-size: 10px; color: #444;">You received this email because you contacted us via our website.</p>
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
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; }
            .header { background-color: #000000; padding: 30px 20px; text-align: center; }
            .header h1 { color: #ffffff; font-size: 20px; margin: 0; text-transform: uppercase; letter-spacing: 1px; }
            .content { padding: 40px; }
            .section-title { font-size: 14px; text-transform: uppercase; color: #888; font-weight: bold; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px; }
            .data-group { margin-bottom: 20px; }
            .label { font-weight: bold; color: #000; display: block; margin-bottom: 5px; }
            .value { color: #555; background: #fafafa; padding: 10px; border-radius: 4px; border: 1px solid #eee; }
            .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Lead Notification</h1>
            </div>
            <div class="content">
                <div class="section-title">Submission Details</div>
                
                <div class="data-group">
                    <span class="label">Name</span>
                    <div class="value">${submission.name}</div>
                </div>
                
                <div class="data-group">
                    <span class="label">Subject</span>
                    <div class="value">${submission.subject}</div>
                </div>

                <div class="data-group">
                     <span class="label">Status</span>
                     <div style="display:inline-block; padding: 5px 10px; background-color: #e3f2fd; color: #1565c0; border-radius: 12px; font-size: 12px; font-weight: bold;">New Inquiry</div>
                </div>

                <div class="section-title" style="margin-top: 30px;">Contact Information</div>
                
                <div class="data-group">
                    <span class="label">Email</span>
                    <div class="value"><a href="mailto:${submission.email}" style="color: #DC143C; text-decoration: none;">${submission.email}</a></div>
                </div>
                
                <div class="data-group">
                    <span class="label">Phone</span>
                    <div class="value">${submission.phone}</div>
                </div>

                ${submission.company ? `
                <div class="data-group">
                    <span class="label">Company</span>
                    <div class="value">${submission.company}</div>
                </div>` : ''}

                <div class="section-title" style="margin-top: 30px;">Message</div>
                <div class="value" style="min-height: 100px; white-space: pre-wrap;">${submission.message}</div>
            </div>
            <div class="footer">
                <p>Received via Techno Mech Engineer's Contact Form</p>
                <p>${new Date().toLocaleString()}</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
