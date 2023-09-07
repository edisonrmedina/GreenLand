const transporterGmail = require('../config/mailer')
require('dotenv').config()
const { CLIENT_URL } = process.env

const approvedPayment = async (name, email, order, date, total) => {
  const message = await transporterGmail.sendMail({
    from: '"Greenland" <$greenlandgrupo7@gmail.com> ',
    to: email,
    subject: 'Purchase successfully registered ✅',
    text: `Thank you for your purchase, ${name}. We hope you enjoy your products.`,
    html: `
    <table align="center" style="border-collapse: collapse; margin-top: 20px; background-color: lightgreen; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid gray; font-family: system-ui; max-width: 600px">
      <tr>
        <td align="center" style="padding: 40px;">
          <div style="display: flex; width: 100%; max-width: 200px;">
            <img src='https://firebasestorage.googleapis.com/v0/b/greenland-396822.appspot.com/o/logo_greenland.png?alt=media&token=28c5c9fd-ba22-4876-a126-551b70a8efab' alt="GreenLand Logo" width=100% height=100% />
          </div>
          <p style="margin-top: 10px; color: ;">Thank you for your purchase, WilSotoA. We hope you enjoy your products.</p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 40px; background-color: #f2f2f2;">
          <p style="font-size: 16px; margin: 0; font-weight: bold;">Order Details:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="font-size: 14px; margin-bottom: 5px;">Order Number: <strong>${order}</strong></li>
            <li style="font-size: 14px; margin-bottom: 5px;">Date: <strong>${date}</strong></li>
            <li style="font-size: 14px; margin-bottom: 5px;">Total Amount: <strong>$${total}</strong></li>
          </ul>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px; background-color: #ffffff;">
          <p style="font-size: 14px; font-style: italic">We value your feedback! Please consider leaving a review for the products you've purchased. Your opinion matters to us and helps us improve our products and services. <a href="${CLIENT_URL}/shop" style="color: #3498db; text-decoration: none;">Leave a Review</a></p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px; background-color: #ffffff;">
          <p style="font-size: 14px; font-style: italic">For any inquiries, please contact our <a href="mailto:greenlandgrupo7@gmail.com" style="color: #3498db; text-decoration: none;">support team</a>.</p>
        </td>
      </tr>
  </table>`
  })
  console.log('Message sent: %s', message.messageId)
}

const declinedPayment = async (name, email) => {
  await transporterGmail.sendMail({
    from: '"Greenland" <$greenlandgrupo7@gmail.com>',
    to: email,
    subject: 'Purchase rejected ❌ ',
    text: `Ops! 😓, ${name}. It occurred failed to purchase`,
    html: `
    <table align="center" style="border-collapse: collapse; margin-top: 20px; background-color: #ffb3b3; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid gray; font-family: system-ui">
      <tr>
        <td align="center" style="padding: 40px;">
          <div style="display: flex; width: 100%; max-width: 200px;">
            <img src='https://firebasestorage.googleapis.com/v0/b/greenland-396822.appspot.com/o/logo_greenland.png?alt=media&token=28c5c9fd-ba22-4876-a126-551b70a8efab' alt="GreenLand Logo" width=100% height=100% />
          </div>
          <p style="margin-top: 10px; color: ;">We're sorry, ${name}. Your purchase has been rejected.</p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px; background-color: #ffffff;">
          <p style="font-size: 14px; font-style: italic">If you have any questions or concerns, please contact our <a href="mailto:greenlandgrupo7@gmail.com" style="color: #3498db; text-decoration: none;">support team</a>.</p>
        </td>
      </tr>
    </table>`
  })
}

const undoPurchaseMail = async (order, userMessage) => {
  const message = await transporterGmail.sendMail({
    from: `"${order.user?.name}" <greenlandgrupo7@gmail.com>`,
    to: 'greenlandgrupo7@gmail.com',
    subject: `Return Request for Order #${order.id}`,
    text: `Hello Admin,\n\nA return request has been received for order #${order.id}.\n\nUser ID: ${order.user?.id}\n\nMessage from User: ${userMessage}`,
    html: `
    <table align="center" style="border-collapse: collapse; margin-top: 20px; background-color: lightgreen; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid gray; font-family: system-ui; max-width: 600px">
      <tr>
        <td align="center" style="padding: 40px;">
          <div style="display: flex; width: 100%; max-width: 200px;">
            <img src='https://firebasestorage.googleapis.com/v0/b/greenland-396822.appspot.com/o/logo_greenland.png?alt=media&token=28c5c9fd-ba22-4876-a126-551b70a8efab' alt="GreenLand Logo" width=100% height=100% />
          </div>
          <p style="margin-top: 10px; color: ;">Hello Admin,</p>
          <p style="color: ;">A return request has been received for order #${order.id}.</p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 40px; background-color: #f2f2f2;">
          <p style="font-size: 16px; margin: 0; font-weight: bold;">Return Request Details:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="font-size: 14px; margin-bottom: 5px;">Order Number: <strong>${order.id}</strong></li>
            <li style="font-size: 14px; margin-bottom: 5px;">User ID: <strong>${order.user?.id}</strong></li>
            <li style="font-size: 14px; margin-bottom: 5px;">Name: <strong>${order.user?.name}</strong></li>
            <li style="font-size: 14px; margin-bottom: 5px; text-decoration: none;">Email: <strong>${order.user?.email}</strong></li>
          </ul>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px; background-color: #ffffff;">
          <p style="font-size: 14px; font-style: italic">Message from User:</p>
          <p style="font-size: 14px;">${userMessage}</p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px; background-color: #ffffff;">
          <p style="font-size: 14px; font-style: italic">Please review the request and take necessary actions.</p>
        </td>
      </tr>
    </table>`
  })
  console.log('Message sent: %s', message.messageId)
}

const newUserEmail = async (name, email, token) => {
  const activationLink = `https://greenland.onrender.com/users/verify?token=${token}`
  const htmlContent = `<table align="center" style="border-collapse: collapse; margin-top: 20px; background-color: lightgreen; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid gray; font-family: system-ui">
       <tr>
           <td align="center" style="padding: 40px;">
               <div style="display: flex; width: 100%; max-width: 200px;">
                   <img src='https://firebasestorage.googleapis.com/v0/b/greenland-396822.appspot.com/o/logo_greenland.png?alt=media&token=28c5c9fd-ba22-4876-a126-551b70a8efab' alt=" GreenLand Logo" width=100% height=100% />
               </div>
               <p style="margin-top: 10px; font-size: 44px; color: ;">Welcome to our platform, ${name}!</p>
           </td>
       </tr>
       <tr>
           <td align="center" style="padding: 20px; background-color: #ffffff;">
               <p style="font-size: 14px; font-style: italic">To activate your account, please click the following link:</p>
               <p style="font-size: 14px; font-style: italic">
                   <a href="${activationLink}" style="color: #3498db; text-decoration: none;">Activate my account</a>
               </p>
               <p style="font-size: 14px; font-style: italic">If you have any questions or concerns, please contact our <a href="mailto:greenlandgrupo7@gmail.com" style="color: #3498db ; text-decoration: none;">support team</a>.</p>
           </td>
       </tr>
   </table>
   `

  try {
    await transporterGmail.sendMail({
      from: '"Greenland" <$greenlandgrupo7@gmail.com>',
      to: email,
      subject: 'Welcome to Our Platform',
      html: htmlContent
    })
    return { success: true, message: 'Welcome email sent successfully' }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { success: false, message: 'Welcome email could not be sent' }
  }
}

const loginUserSuccess = async (name, email) => {
  const loginTime = new Date().toLocaleTimeString()
  const htmlContent = `
  <table align="center" style="border-collapse: collapse; margin-top: 20px; background-color: lightgreen; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid gray; font-family: system-ui">
    <tr>
      <td align="center" style="padding: 40px;">
        <div style="display: flex; width: 100%; max-width: 200px;">
          <img src='https://firebasestorage.googleapis.com/v0/b/greenland-396822.appspot.com/o/logo_greenland.png?alt=media&token=28c5c9fd-ba22-4876-a126-551b70a8efab' alt="GreenLand Logo" width=100% height=100% />
        </div>
        <p style="margin-top: 10px; color: ;">¡Welcome back, ${name}!</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 40px; background-color: #f2f2f2;">
        <p style="font-size: 16px; margin: 0; font-weight: bold;">Details of your login:</p>
        <ul style="list-style: none; padding: 0;">
          <li style="font-size: 14px; margin-bottom: 5px;">Date and time: <strong>${loginTime}</strong></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px; background-color: #ffffff;">
        <p style="font-size: 14px; font-style: italic">If you have any questions or concerns, please contact our <a href="mailto:greenlandgrupo7@gmail.com" style="color: #3498db; text-decoration: none;">support team</a>.</p>
      </td>
    </tr>
  </table>`

  try {
    await transporterGmail.sendMail({
      from: '"Greenland Group"',
      to: email,
      subject: 'Successful Login to Our Platform',
      text: `¡Hola, ${name}!\n\nHas iniciado sesión correctamente en tu cuenta de GreenLand. ¡Bienvenido de nuevo!`,
      html: htmlContent
    })
    return { success: true, message: '' }
  } catch (error) {
    console.error('Error sending login success email:', error)
    return { success: false, message: 'login success email could not be sent' }
  }
}

const sendPasswordResetPassword = async (name, email, resetLink) => {
  const url = 'https://greenland.onrender.com/user/verify?token=' + resetLink
  const htmlContent = `
   <table align="center" style="border-collapse: collapse; margin-top: 20px; background-color: #ffcccb; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid gray; font-family: system-ui">
     <tr>
       <td align="center" style="padding: 40px;">
         <div style="display: flex; width: 100%; max-width: 200px;">
           <img src='https://firebasestorage.googleapis.com/v0/b/greenland-396822.appspot.com/o/logo_greenland.png?alt=media&token=28c5c9fd-ba22-4876-a126-551b70a8efab' alt=" GreenLand Logo" width=100% height=100% />
         </div>
         <p style="margin-top: 10px; color: #d9534f;">Hello ${name}!</p>
       </td>
     </tr>
     <tr>
       <td align="center" style="padding: 40px; background-color: #f2f2f2;">
         <p style="font-size: 16px; margin: 0; font-weight: bold;">Password reset:</p>
         <p style="font-size: 14px;">We have received a request to reset your password. If you did not make this request, you can ignore this message.</p>
         <p style="font-size: 14px;">If you wish to reset your password, please click the following link:</p>
         <a href="${url}" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #d9534f; color: #fff; text-decoration: none; border- radius: 5px;">Reset Password</a>
        
         </td>
     </tr>
     <tr>
       <td align="center" style="padding: 20px; background-color: #ffffff;">
         <p style="font-size: 14px; font-style: italic">If you have any questions or need assistance, please <a href="mailto:your-email@example.com" style="color: #3498db ; text-decoration: none;">contact us</a>.</p>
       </td>
     </tr>
   </table>`
  try {
    await transporterGmail.sendMail({
      from: '"GreenLand"',
      to: email,
      subject: 'Password Reset',
      text: `Hello ${name}!\n\nWe have received a request to reset your password. If you did not make this request, you can ignore this message.\n\nIf you wish to reset your password, please click the following link: ${resetLink}`,
      html: htmlContent
    })
    return { success: true, message: '' }
  } catch (error) {
    console.error('Error sending password reset email:', error)
    return {
      success: false,
      message: 'Password reset email could not be sent'
    }
  }
}

module.exports = {
  approvedPayment,
  declinedPayment,
  undoPurchaseMail,
  newUserEmail,
  loginUserSuccess,
  sendPasswordResetPassword
}
