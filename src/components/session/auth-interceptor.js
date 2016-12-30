class authInterceptor {
	constructor($q, Session) {
		this.$q = $q;
		this.Session = Session;
	}

	request(config) {
		const session = this.Session.session;
		const token = _.get(session, 'token');

		if (!_.isEmpty(token)) config.headers.Authorization = 'Bearer ' + token;

		return config;
	}
}

export default /*@ngInject*/ authInterceptor