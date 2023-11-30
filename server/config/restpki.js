const config = {
    accessToken: process.env.LACUNA_ACCESS_TOKEN,
    endpoint: 'https://pki.rest/',
    trustLacunaTestRoot: false,//process.env.LACUNA_TRUST_TEST? true:false,
    pkiExpress: {
		// List of custom trusted roots. In this sample, we will get the
		// certificate files on resources/ static folder.
		trustedRoots: [],

		// Offline mode. Set this, if you want PKI Express to run on offline mode.
		// This mode is useful when there is no network available.
		offline: true
	},
}

module.exports = config