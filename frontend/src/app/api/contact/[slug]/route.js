import { NextResponse } from 'next/server';
import Product from '@/lib/models/Products';
import connectDB from '@/lib/db';
import nodemailer from 'nodemailer';

//api to email order using nodemailer
export async function POST(request, { params }) {
    try {
        
        const slug = params?.slug;
        const isProductEnquiry = slug && slug !== 'general';
        const data = await request.json();
        const { name, email, mobile, product, subject, message } = data;


        // nodemailer transporter setup
        const transporter = nodemailer.createTransport({
           service : 'Gmail',
              auth : {
                user : 'sambx.tech@gmail.com',
                pass : 'bltx supm pmla tvpz'
              } 
          });
           
          // email options
            const mailOptions = {
                from : 'sambx.tech@gmail.com',  
                to : `${email}, aniketxai@gmail.com`,
                subject : isProductEnquiry ? `Product: ${subject}` : `Contact Form: ${subject}`,
                text: `Dear ${name},

Thank you for contacting us! We have received your message.

CONTACT DETAILS:
--------------
Name: ${name}
Email: ${email}
Mobile: ${mobile}
${product ? `Product Enquiry: ${product}\n` : ''}Subject: ${subject}

MESSAGE:
--------
${message}

Our team will get back to you shortly.

Best regards,
SAMBX Team
sambx.tech@gmail.com`
            };

            // send email
            await transporter.sendMail(mailOptions);

            return NextResponse.json({ 
                message: 'Contact email sent successfully' 
            }, { status: 200 });

    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ error: 'Failed to send contact email' }, { status: 500 });
    }
}