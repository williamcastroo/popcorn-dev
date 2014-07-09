(function(App) {
    'use strict';

    var healthMap = {
        0: 'bad',
        1: 'medium',
        2: 'good',
        3: 'excellent'
    };

    var Movie = Backbone.Model.extend({
        events: {
            'change:torrents': 'updateHealth',
        },

        idAttribute: 'imdb',

        initialize: function() {
            this.updateHealth();
        },

        updateHealth: function() {
            var torrents = this.get('torrents');

            var calcHealth = function(torrent) {
                var seeds = torrent.seed;
                var peers = torrent.peer;

                // First calculate the seed/peer ratio
                var ratio = peers > 0 ? (seeds / peers) : seeds;

                // Normalize the data. Convert each to a percentage
                // Ratio: Anything above a ratio of 5 is good
                var normalizedRatio = Math.min(ratio / 5 * 100, 100);
                // Seeds: Anything above 30 seeds is good
                var normalizedSeeds = Math.min(seeds / 30 * 100, 100);

                // Weight the above metrics differently
                // Ratio is weighted 60% whilst seeders is 40%
                var weightedRatio = normalizedRatio * 0.6;
                var weightedSeeds = normalizedSeeds * 0.4;
                var weightedTotal = weightedRatio + weightedSeeds;

                // Scale from [0, 100] to [0, 3]. Drops the decimal places
                var scaledTotal = ((weightedTotal * 3) / 100) | 0;

                return scaledTotal;
            };

            _.each(torrents, function(torrent) {
                if (!torrent.url) {
                    _.each(torrent, function(episode, key) {
                        torrent[key].health = healthMap[calcHealth(episode)];
                    });
                } else {
                    torrent.health = healthMap[calcHealth(torrent)];
                }
            });

            this.set('torrents', torrents, {silent: true});
        }
    });

    App.Model.Movie = Movie;
})(window.App);