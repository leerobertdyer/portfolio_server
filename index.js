import express from 'express';
import nodemailer from 'nodemailer'
import 'dotenv/config'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())

const myEmail = 'lee.dyer.dev@gmail.com';
const myPhone = 12318818138


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASS  
    }
  });

app.get("/", (req, res) => {
    res.send("hello");
});

app.post('/send-email', async (req, res) => {

    const { senderEmail, message } = req.body;
  
    const emailBody = `Message from: ${senderEmail}\n\n${message}`;
    
    try {
      const info = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `👾!Form Submitted!👾 ${senderEmail}`, 
        text: emailBody,
        replyTo: senderEmail 
      });
  
      console.log('Message sent: %s', info.messageId);
      res.status(200).send('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email: ', error);
      res.status(500).send(error.toString());
    }
  });
  
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });



