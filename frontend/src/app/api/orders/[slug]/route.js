import { NextResponse } from 'next/server';
import Product from '@/lib/models/Products';
import connectDB from '@/lib/db';
import nodemailer from 'nodemailer';

//api to email order using nodemailer
export async function POST(request) {
    try {
        
        
        const data = await request.json();
        const { productName, quantity, customerInfo, orderDate } = data;


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
                to : `${customerInfo.email}, aniketxai@gmail.com`,
                subject : `Order Confirmation - ${productName}`,
                text: `Dear ${customerInfo.fullName},

Thank you for your order! We have received your request for ${productName}.

ORDER DETAILS:
--------------
Product: ${productName}
Quantity: ${quantity}
Order Date: ${new Date(orderDate).toLocaleString()}

SHIPPING INFORMATION:
--------------------
Name: ${customerInfo.fullName}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}
City: ${customerInfo.city}
State: ${customerInfo.state}
Postal Code: ${customerInfo.postalCode}

${customerInfo.extraMessage ? `ADDITIONAL MESSAGE:\n${customerInfo.extraMessage}\n\n` : ''}Our team will contact you shortly with pricing, delivery details, and payment options.

If you have any questions, feel free to reach out to us.

Best regards,
SAMBX Team
sambx.tech@gmail.com`
            };

            // send email
            await transporter.sendMail(mailOptions);

            return NextResponse.json({ 
                message: 'Order email sent successfully' 
            }, { status: 200 });

    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ error: 'Failed to email order' }, { status: 500 });
    }
}