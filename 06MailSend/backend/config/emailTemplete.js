export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#F6FAFB; font-family:Arial, sans-serif;">
    <table width="100%" bgcolor="#F6FAFB" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" 
                 style="max-width:600px; margin:20px auto; background:#ffffff; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding:30px; text-align:center; font-size:20px; font-weight:bold; color:#333;">
                🎉 Welcome to Our Community!
              </td>
            </tr>
            <tr>
              <td style="padding:0 30px 15px; font-size:14px; color:#333;">
                Hello <b>{{name}}</b>, thank you for reaching out to us! We have received your details:
              </td>
            </tr>
            <tr>
              <td style="padding:15px 30px; background:#f9f9f9; border:1px solid #ddd; border-radius:6px; font-size:14px; color:#333;">
                <p><b>Name:</b> {{name}}</p>
                <p><b>Email:</b> {{email}}</p>
                <p><b>Message:</b> {{message}}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 30px; font-size:14px; color:#333;">
                Our team will review your message and get back to you shortly. Meanwhile, feel free to explore our website.
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:20px;">
                <a href="https://yourwebsite.com" 
                   style="background:#4C83EE; text-decoration:none; display:inline-block; 
                          padding:12px 25px; color:#fff; font-size:14px; font-weight:bold; 
                          border-radius:6px; width:100%; max-width:200px; text-align:center;">
                  Visit Website
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:20px; font-size:12px; color:#888; text-align:center;">
                © 2025 Your Company. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
