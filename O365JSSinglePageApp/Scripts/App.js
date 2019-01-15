// Set up ADAL (Config is from secret.ks File)
var authContext = new AuthenticationContext(MyAdalConfig);


if (authContext.isCallback(window.location.hash)) {
    // Handle redirect after token requests
    authContext.handleWindowCallback();
    var err = authContext.getLoginError();
    if (err) {
        // TODO: Handle errors signing in and getting tokens
        document.getElementById('logmessage').textContent =
            'ERROR:\n\n' + err;
    }
} else {
    // If logged in, get access token and make an API request
    var user = authContext.getCachedUser();
    if (user) {
        document.getElementById('username').textContent = 'Signed in as: ' + user.userName;
        document.getElementById('logmessage').textContent = 'Getting access token...';

        // Get an access token to the Microsoft Graph API
        authContext.acquireToken(
            'https://graph.microsoft.com',
            function (error, token) {
                if (error || !token) {
                    // TODO: Handle error obtaining access token
                    document.getElementById('logmessage').textContent =
                        'ERROR:\n\n' + error;
                    return;
                }
                // Use the access token
                getCurrentUser(token);
            }
        );
    } else {
        document.getElementById('username').textContent = 'Not signed in.';
    }
}
