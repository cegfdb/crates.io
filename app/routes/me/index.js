import AuthenticatedRoute from '../-authenticated-route';

export default AuthenticatedRoute.extend({
  async model() {
    let { ownedCrates, currentUser: user } = this.session;

    if (!ownedCrates) {
      await this.session.fetchUser();
      ({ ownedCrates } = this.session);
    }

    let apiTokens = this.store.findAll('api-token');

    return { user, ownedCrates, api_tokens: apiTokens };
  },

  setupController(controller) {
    this._super(...arguments);

    controller.setProperties({
      emailNotificationsSuccess: false,
      emailNotificationsError: false,
    });
  },
});
