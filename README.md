## BoxCar API
This is a node.js non-blocking API consumer for the BoxCar push notification service.  BoxCar Api is an EventEmitter that emits 'response' on completion.  You can push notifications as yourself (a user) or as a provider.

##Installation
npm

    $ npm install boxcar
  
github

    $ git clone git@github.com:devdazed/boxcar-api.git

##Basic Usage
The constructor takes 2 arguments, the fist is your Provider Key, the second is your secret key.  Your secret key is only required if using 'broadcast' or 'notifyService'

    var boxcar = require('boxcar');
    var provider = new boxcar.Provider('your_provider_key', 'your_provider_secret');

    //to brodcast a message to your all of the users in your service
    provider.broadcast('This is a test', 'FooBar');
    
    //send a message to a user directly
    provider.notify('foo@bar.com', 'Hi FooBar!');
    
    //subscribe a current boxcar user to your service
    provider.subscribe('foo@bar.com');
    
    //to send yourself messages you can use the user api
    var user = new boxcar.User('your@email.com', 'your_boxcar_password');
    user.notify('Hai Me!');
    
##Advanced Usage
When using notify and broadcast you can specify additional parameters, an explanation of parameters is below.
###Provider.subscribe(email)
Subscribes a boxcar user to your service
###Provider.notify(email, message, fromScreenName, fromRemoteServiceId, redirectPayload, sourceUrl, iconUrl)
Sends a notification to a specific user
###Provider.broadcast(message, fromScreenName, fromRemoteServiceId, redirectPayload, sourceUrl, iconUrl)
Sends a notification to all users in your service
###User.notify(message, fromScreenName, fromRemoteServiceId, sourceUrl, iconUrl)
To use the User API, you must first install the boxcar Growl service.

###Parameters
- **email**: The user's email address
- **message**: The message to display to the user. This message should be at a maximum somewhere around 140 characters in length. Longer messages will be truncated depending on the client receiving it.
- **fromScreenName**:  The user or application sending the notification. This is matched for the redirect performed by Boxcar (if set by the user).
- **fromRemoteServiceId**: An integer value that will uniquely identify the notification, and prevent duplicate notifications about the same event from being created.
- **redirectPayload**: The payload to be passed in as part of the redirection URL. Keep this as short as possible. If your redirection URL contains "::user::" in it, this will replace it in the URL. An example payload would be the users username, to take them to the appropriate page when redirecting.
- **sourceUrl**: This is a URL that may be used for future devices. It will replace the redirect payload.
- **iconUrl**: This is the URL of the icon that will be shown to the user. Standard size is 57x57.


