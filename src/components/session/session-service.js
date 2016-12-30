class Session {
	constructor($rootScope, Store) {
		this.$rootScope = $rootScope;
		this.Store = Store;
		this.session = null;
	}

	hasPerm(allowed, perm) {
		let match = function (model, x) {
			for (let k in model) {
				let v = x[k];

				if (angular.isObject(v)) {
					if (!_.intersection(v, model[k]).length) return false;
				}
				else {
					if (v !== null && v !== model[k]) return false;
				}
			}

			return true;
		};

		for (let i = 0; i < allowed.length; ++i) {
			if (match(perm, allowed[i])) return true;
		}

		return false;
	}

	load() {
		return this.Store.get('session').then((session) => {
			this.$rootScope.session = this.session = session;

			return this.session;
		});
	}

	open(session) {
		this.session = session;

		Store.del('session');
		Store.set('session', session);

		$rootScope.session = this.session;
	}

	get() {
		return this.session;
	}

	can(perm) {
		if (this.session) return this.hasPerm(this.session.perms, perm);
	}

	close() {
		this.session = null;
		this.Store.del('session');
		this.$rootScope.session = null;
	}
}

export default /*@ngInject*/ Session;