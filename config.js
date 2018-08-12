module.exports = {
    'facebookAuth' : {
        'clientID'      : '1088517751323158',
        'clientSecret'  : 'tVSQuFs0-SisYWHiaKvIDAlW',
        'callbackURL'     : 'http://localhost:4000/api/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:4000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '835486386196-ghrsa4m8q8nn2avpg8ui6gr2ttsl7f93.apps.googleusercontent.com\n',
        'clientSecret'     : 'tVSQuFs0-SisYWHiaKvIDAlW',
        'callbackURL'      : 'http://localhost:4000/auth/google/callback'
    }
};