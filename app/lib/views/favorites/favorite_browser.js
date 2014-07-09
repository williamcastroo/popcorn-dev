(function(App) {
    'use strict';

    var FavoriteBrowser = Backbone.Marionette.Layout.extend({
        template: '#favorite-browser-tpl',
        className: 'favorite-browser',

        regions: {
            FilterBar: '.filter-bar-region',
            FavoriteList: '.favorite-list-region'
        },

        initialize: function() {
            this.filter = new App.Model.Filter();
            this.favoriteCollection = new App.Model.FavoriteCollection([], {
                filter: this.filter
            });
            this.favoriteCollection.fetch();
        },

        onShow: function() {
            this.FilterBar.show(new App.View.FilterBarFavorite({}));
            this.FavoriteList.show(new App.View.FavoriteList({
                collection: this.favoriteCollection
            }));
        },
    });

    App.View.FavoriteBrowser = FavoriteBrowser;
})(window.App);