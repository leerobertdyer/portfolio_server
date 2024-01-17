import express from 'express';
import nodemailer from 'nodemailer'
import 'dotenv/config'
import cors from 'cors'

const app = express();
app.use(express.json())
// Set middleware of CORS 
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://www.leedyer.com"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
            );
            res.setHeader(
                "Access-Control-Allow-Headers",
                "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
                );
                res.setHeader("Access-Control-Allow-Credentials", true);
                res.setHeader("Access-Control-Allow-Private-Network", true);
                //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
                res.setHeader("Access-Control-Max-Age", 7200);
                
                next();
            });
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



