export const ResetPasswordTemplate = (token, id) => {
  return `
    <DOCTYPE html>
    <html> 
    <head>
        <meta charset="utf-8">
        <title>Password Reset Email</title>
        <style>
        .container{
            width: 100%;
            height: 100%;
            padding: 20px;
            background-color: #f4f4f4;
        }
        </style>
    </head>
    <body>
    <div class="container">
        <div class="email">
            <div class="email-header> 
                <h1>Please reset your password!</h1>
            </div>
            <div class ="email-body">
                <p>Forgot your Family Task App password?</p>
                <p>Not a problem.</p> <a href="http://localhost:2883/reset-password/${token}/${id}" target="_blank">Click here to reset your password.</a>
                <p>This link can only be used once and will expire in 10 minutes.</p>
                <br />
                <p>Happy Tasking! :)</p>

            </div>
        </div>
    </div>
    
    </body>
    
    </html>`;
};
