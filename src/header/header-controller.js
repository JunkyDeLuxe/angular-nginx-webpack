class HeaderController {
	constructor($rootScope) {
		this.$rootScope = $rootScope;
		this.languages = [ 'fr-FR', 'en-US' ];
	}

	logout() {
		this.$rootScope.$emit('logged-out');
	};
}

export default /*@ngInject*/ HeaderController;