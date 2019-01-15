// Make an AJAX request to the Microsoft Graph API and print the response as JSON.
var getCurrentUser = function (access_token) {
    document.getElementById('logmessage').textContent = 'Calling API...';

    // Fetch Data from MS Graph
    fetch('https://graph.microsoft.com/v1.0/me', {
        headers: new Headers({
            'Authorization': 'Bearer ' + access_token,
        }),
    })
        .catch(function (e) {
            console.error(e);
        })
        // Convert Response to Json
        .then(function (response) { return response.json() })
        // Print response
        .then(function (json) {
            document.getElementById('logmessage').textContent = JSON.stringify(json, null, '\t');

        });

}
