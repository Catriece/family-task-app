export const ResetPasswordTemplate = (token, id) => {
  return `
    
        <div class="email">
            <div class="email-header> 
                <h1>Please reset your password!</h1>
            </div>
            <div class ="email-body">
                <p>Forgot your Family Task App password?</p>
                <p>Not a problem.</p> <a href="http://localhost:4487/reset-password/${token}/${id}" target="_blank">Click here to reset your password.</a>
                <p>This link can only be used once and will expire in 10 minutes.</p>
                <br />
                <p>Happy Tasking! :)</p>

            </div>
        </div>
    
    
    `;
};
