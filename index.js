const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const route = express.Router(); //any route file we are generating to call and work along with index.js

app.get('/', (req, res) => {
  res.redirect('/email.html');
});

//create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: 'bhattacharyyamanjima@gmail.com',
    pass: 'zouu esab llyz zbgu',
  },
  secure: true,
});

route.post('/expmail', (req, res) => {
  //console.log(req.body);
  const to = req.body.to;
  const subject = req.body.subject;
  const text = req.body.text;
  const mailInfo = {
    from: 'bhattacharyyamanjima@gmail.com',
    to: to,
    subject: subject,
    text: 'Hurry it was easy application',
    html: text,
  };

  transporter.sendMail(mailInfo, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Error sending email' });
    } else {
      res.status(200).send({ message: 'Mail Send', message_id: info.messageId });
    }
  });
});

app.use('/api', route);

app.listen(port, () => {
  console.log(`server listening on the port ${port}`);
});