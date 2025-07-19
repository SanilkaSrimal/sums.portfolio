# 📧 Email Setup Guide for Portfolio Contact Form

## 🚀 Quick Setup with EmailJS

Your portfolio now has a fully functional contact form that will send emails directly to your inbox! Follow these steps to set it up:

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook/Hotmail**
   - **Yahoo**
   - Or any other SMTP service
4. Follow the setup instructions for your chosen provider
5. **Copy the Service ID** (you'll need this later)

### Step 3: Create Email Template
1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}}
Email: {{from_email}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply directly to this email to respond to {{from_name}}.
```

4. **Copy the Template ID** (you'll need this later)

### Step 4: Get Your Public Key
1. Go to **Account** → **General** in EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. **Copy the Public Key**

### Step 5: Update Environment Variables
1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual EmailJS credentials:

```env
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
VITE_EMAILJS_SERVICE_ID=your_actual_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id_here
```

### Step 6: Test Your Setup
1. Restart your development server: `npm run dev`
2. Go to your portfolio contact form
3. Fill out and submit a test message
4. Check your email inbox for the message!

## 🔧 Template Variables

The email template uses these variables from your contact form:
- `{{from_name}}` - Visitor's name
- `{{from_email}}` - Visitor's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content

## 📱 Features Included

✅ **Real Email Delivery** - Messages go directly to dilmijayanetthi66@gmail.com
✅ **Form Validation** - All fields are required
✅ **Loading States** - Shows "Sending..." while processing
✅ **Success/Error Messages** - Clear feedback to users
✅ **Auto-Reply Setup** - Easy to reply directly to sender
✅ **Responsive Design** - Works on all devices
✅ **Spam Protection** - EmailJS includes basic spam protection

## 🎯 Free Tier Limits

EmailJS free tier includes:
- **200 emails/month** - Perfect for portfolio contact forms
- **2 email services** - Gmail + backup service
- **3 email templates** - More than enough for most needs

## 🔒 Security Notes

- Environment variables keep your credentials secure
- EmailJS handles all email delivery securely
- No backend server required
- HTTPS encryption for all communications

## 🚨 Troubleshooting

**Email not sending?**
1. Check console for error messages
2. Verify all environment variables are set correctly
3. Make sure EmailJS service is properly configured
4. Check EmailJS dashboard for delivery status

**Getting "Configuration missing" error?**
1. Make sure `.env` file exists in project root
2. Restart development server after updating `.env`
3. Verify environment variable names match exactly

**Emails going to spam?**
1. Add your domain to EmailJS allowed origins
2. Set up SPF/DKIM records (advanced)
3. Ask users to check spam folder initially

## 📞 Support

If you need help:
1. Check EmailJS documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. EmailJS support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

Your contact form is now ready to receive real messages! 🎉
