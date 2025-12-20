
export const generateUserEmail = (name: string, details: any): string => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "Organization",
          "name": "Techno Mech Engineers",
          "url": "https://technomechengineers.in",
          "logo": "https://technomechengineers.in/assets/logo.jpg"
        }
        </script>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden; }
            .header { padding: 30px; background-color: #111111; border-bottom: 3px solid #DC143C; }
            .header-content { width: 100%; border-collapse: collapse; }
            .logo-cell { text-align: left; vertical-align: middle; width: 40%; }
            .text-cell { text-align: right; vertical-align: middle; width: 60%; font-size: 20px; font-weight: bold; color: #DC143C; text-transform: uppercase; letter-spacing: 1px; }
            .logo { max-height: 80px; width: auto; display: block; border-radius: 4px; background: #fff; padding: 5px; }
            .content { padding: 40px; }
            .greeting { font-size: 22px; color: #111; margin-bottom: 20px; font-weight: 600; }
            .text { color: #555; margin-bottom: 15px; font-size: 16px; }
            .summary-box { background-color: #fcfcfc; border: 1px solid #eee; border-radius: 6px; padding: 25px; margin: 30px 0; }
            .summary-title { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #DC143C; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
            .summary-item { margin-bottom: 10px; display: flex; }
            .summary-label { font-weight: 600; width: 80px; color: #444; font-size: 14px; }
            .summary-value { color: #333; flex: 1; font-size: 14px; }
            .btn-container { text-align: center; margin-top: 30px; }
            .button { display: inline-block; background-color: #DC143C; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; transition: background-color 0.3s; box-shadow: 0 4px 6px rgba(220, 20, 60, 0.2); }
            .button:hover { background-color: #b91032; }
            .footer { background-color: #f1f1f1; padding: 25px; text-align: center; color: #888; font-size: 13px; }
            .footer a { color: #888; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <table class="header-content" role="presentation">
                    <tr>
                        <td class="logo-cell">
                            <a href="https://technomechengineers.in" target="_blank" style="text-decoration: none;">
                                <img src="https://technomechengineers.in/assets/logo.jpg" alt="Techno Mech Engineers" class="logo" width="80" height="80" style="border:0; pointer-events: none;">
                            </a>
                        </td>
                        <td class="text-cell" style="padding-right: 10px;">
                            <div style="display: inline-block; text-align: left;">
                                Thank You<br>For Choosing Us
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="content">
                <div class="greeting">Hello ${name},</div>
                
                <p class="text">Thank you for choosing <strong>Techno Mech Engineers</strong>. We have successfully received your inquiry and truly appreciate the opportunity to assist you.</p>
                
                <p class="text">Our team is currently reviewing the details you submitted. We are committed to providing top-quality industrial solutions and will be in touch with you shortly to discuss your requirements.</p>

                <div class="summary-box">
                    <div class="summary-title">Your Submission Details</div>
                    <div class="summary-item">
                        <span class="summary-label">Name:</span>
                        <span class="summary-value">${name}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Phone:</span>
                        <span class="summary-value">${details.phone}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Email:</span>
                        <span class="summary-value">${details.email}</span>
                    </div>
                    ${details.subject ? `
                    <div class="summary-item">
                        <span class="summary-label">Subject:</span>
                        <span class="summary-value">${details.subject}</span>
                    </div>` : ''}
                </div>

                <p class="text">In the meantime, we invite you to explore our comprehensive range of products and services.</p>

                <div class="btn-container">
                    <a href="https://technomechengineers.in/products" class="button" style="color: #ffffff !important; text-decoration: none;">View Our Products</a>
                </div>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Techno Mech Engineers.</p>
                <p>Hyderabad, Telangana, India</p>
                <p><a href="https://technomechengineers.in">www.technomechengineers.in</a></p>
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
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); overflow: hidden; }
            .header { background-color: #111111; color: white; padding: 20px; text-align: center; border-bottom: 3px solid #DC143C; }
            .content { padding: 30px; }
            .row { border-bottom: 1px solid #eee; padding: 12px 0; display: flex; }
            .label { font-weight: bold; width: 100px; color: #555; }
            .value { flex: 1; color: #000; }
            .message-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #DC143C; margin-top: 10px; border-radius: 4px; }
            .footer { background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2 style="margin:0;">New Website Inquiry</h2>
            </div>
            <div class="content">
                <div class="row">
                    <div class="label">Name</div>
                    <div class="value">${submission.name}</div>
                </div>
                 <div class="row">
                    <div class="label">Date</div>
                    <div class="value">${new Date().toLocaleString()}</div>
                </div>
                <div class="row">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${submission.email}">${submission.email}</a></div>
                </div>
                <div class="row">
                    <div class="label">Phone</div>
                    <div class="value">${submission.phone}</div>
                </div>
                ${submission.company ? `
                <div class="row">
                    <div class="label">Company</div>
                    <div class="value">${submission.company}</div>
                </div>` : ''}
                <div class="row">
                    <div class="label">Subject</div>
                    <div class="value">${submission.subject}</div>
                </div>
                
                <div style="margin-top: 20px;">
                    <strong style="color: #555;">Message:</strong>
                    <div class="message-box">
                        ${submission.message.replace(/\n/g, '<br>')}
                    </div>
                </div>
            </div>
             <div class="footer">
                <p>Techno Mech Admin Notification</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
