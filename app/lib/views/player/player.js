(function (App) {
    'use strict';

    var Player = Backbone.Marionette.ItemView.extend({
        template: '#player-tpl',
        className: 'player',

        ui: {
            eyeInfo: '.eye-info-player',
            downloadSpeed: '.download_speed_player',
            uploadSpeed: '.upload_speed_player',
            activePeers: '.active_peers_player'
        },

        events: {
            'click .close-info-player': 'closePlayer',
            'click .vjs-fullscreen-control': 'toggleFullscreen',
            'click .vjs-subtitles-button': 'toggleSubtitles'
        },

        isMovie: function () {
            return this.model.get('show_id') === undefined;
        },

        initialize: function () {
            this.listenTo(this.model, 'change:downloadSpeed', this.updateDownloadSpeed);
            this.listenTo(this.model, 'change:uploadSpeed', this.updateUploadSpeed);
            this.listenTo(this.model, 'change:active_peers', this.updateActivePeers);
            this.video = false;
            this.inFullscreen = win.isFullscreen;
        },

        updateDownloadSpeed: function () {
            this.ui.downloadSpeed.text(this.model.get('downloadSpeed'));
        },

        updateUploadSpeed: function () {
            this.ui.uploadSpeed.text(this.model.get('uploadSpeed'));
        },

        updateActivePeers: function () {
            this.ui.activePeers.text(this.model.get('active_peers'));
        },

        closePlayer: function () {
            win.info('Player closed');

            if (this._WatchingTimer) {
                clearInterval(this._WatchingTimer);
            }

            // Check if >80% is watched to mark as watched by user  (maybe add value to settings
            if (this.video.currentTime() / this.video.duration() >= 0.8 || true) {
                if (!this.isMovie()) {
                    win.debug('M ark TV Show as watched');
                    App.vent.trigger('shows:watched', this.model.attributes, false);
                    /*
                     DEV (100% episode watched, stream next one)
                     */
                    if (this.video.currentTime() / this.video.duration() == 1 || true) {
                        //Episode watched, stream next

                        if (this.model.get('episodes')) {
                            var episodes = this.model.get('episodes');


                            console.log(this.model.episode);
                            var index = episodes.indexOf(this.model.episode);
                            console.log('INDEX-->', index);
                            var nextEpisode = episodes[++index];
                            console.log(nextEpisode);

                            console.log('model -- >', this.model);


                            var that = this;
                            var show_id = this.model.get('show_id');
                            var atual_episode = this.model.get('episode');
                            var atual_season = this.model.get('season');
                            $.each(episodes, function (index, value) {
                                if (value.season == atual_season && value.episode == atual_episode) {
                                    //Actual episode
                                    var next = episodes[index + 1];
                                    if (next) {
                                        var url = next.torrents['480p'].url;

                                        var epInfo = {
                                            type: 'tvshow',
                                            imdbid: that.model.get('imdb_id'),
                                            tvdbid: that.model.get('tvdb_id'),
                                            season: next.season,
                                            episode: next.episode
                                        };

                                        var torrentStart = new Backbone.Model({
                                            torrent: url,
                                            episodes: episodes,
                                            type: 'episode',
                                            show_id: show_id,
                                            episode: next.episode,
                                            season: next.season,
                                            title: next.title,
                                            status: that.model.get('status'),
                                            extract_subtitle: epInfo,
                                            defaultSubtitle: Settings.subtitle_language
                                        });
                                        console.log(torrentStart);
                                        App.vent.trigger('player:close');
                                        App.vent.trigger('stream:start', torrentStart);
                                    }
                                }
                            });
                        }

                    } else {
                        App.Trakt
                            .show
                            .scrobble(this.model.get('show_id'), this.model.get('season'), this.model.get('episode'), this.video.currentTime() / this.video.duration() * 100 | 0, this.video.duration() / 60 | 0);
                    }
                } else if (this.model.get('imdb_id') != null) {
                    win.debug('Mark Movie as watched');
                    App.vent.trigger('movies:watched', this.model.attributes, false);

                    App.Trakt
                        .movie
                        .scrobble(this.model.get('imdb_id'), this.video.currentTime() / this.video.duration() * 100 | 0, this.video.duration() / 60 | 0);

                } // else, it's probably a stream or something we don't know of
            } else {
                if (this.isMovie()) {
                    App.Trakt.movie.cancelWatching();
                } else {
                    App.Trakt.show.cancelWatching();
                }
            }

            this.video.dispose();
            App.vent.trigger('player:close');
        },

        onShow: function () {
            // Test to make sure we have title
            win.info('Watching:', this.model.get('title'));
            var _this = this;

            $('.player-header-background').canDragWindow();
            $('#video_player').canDragWindow();
            // Double Click to toggle Fullscreen
            $('#video_player').dblclick(function (event) {
                _this.toggleFullscreen();
            });

            if (this.model.get('type') === 'video/youtube') {
                this.video = videojs('video_player', { techOrder: ['youtube'], forceSSL: true, ytcontrols: false, quality: '720p' }).ready(function () {
                    this.addClass('vjs-has-started');
                });
                this.ui.eyeInfo.hide();
            } else {
                this.video = videojs('video_player', { nativeControlsForTouch: false, trackTimeOffset: 0, plugins: { biggerSubtitle: {}, smallerSubtitle: {}, customSubtitles: {}, progressTips: {}, dropSubtitles: {} }});
            }

            var player = this.video.player();
            this.player = player;

            // Force custom controls
            player.usingNativeControls(false);

            player.on('ended', function () {
                // For now close player. In future we will check if auto-play etc and get next episode
                _this.closePlayer();
            });


            var sendToTrakt = function () {
                if (_this.isMovie()) {
                    win.debug('Reporting we are watching ' + _this.model.get('imdb_id') + ' ' + (_this.video.currentTime() / _this.video.duration() * 100 | 0) + '% ' + (_this.video.duration() / 60 | 0));
                    App.Trakt.movie.watching(_this.model.get('imdb_id'), _this.video.currentTime() / _this.video.duration() * 100 | 0, _this.video.duration() / 60 | 0);
                } else {
                    win.debug('Reporting we are watching ' + _this.model.get('show_id') + ' ' + (_this.video.currentTime() / _this.video.duration() * 100 | 0) + '%');
                    App.Trakt.show.watching(_this.model.get('show_id'), _this.model.get('season'), _this.model.get('episode'), _this.video.currentTime() / _this.video.duration() * 100 | 0, _this.video.duration() / 60 | 0);
                }
            };

            player.one('play', function () {
                player.one('durationchange', sendToTrakt);
                _this._WatchingTimer = setInterval(sendToTrakt, 10 * 60 * 1000); // 10 minutes
            });

            player.on('play', function () {
                // Trigger a resize so the subtitles are adjusted
                $(window).trigger('resize');

                if (_this.wasSeek) {
                    sendToTrakt();
                    _this.wasSeek = false;
                }
            });

            player.on('pause', function () {
                if (_this.player.scrubbing) {
                    _this.wasSeek = true;
                } else {
                    _this.wasSeek = false;
                }
            });

            // There was an issue with the video
            player.on('error', function (error) {
                if (_this.isMovie()) {
                    App.Trakt.movie.cancelWatching();
                } else {
                    App.Trakt.show.cancelWatching();
                }
                // TODO: user errors
                if (_this.model.get('type') === 'video/youtube') {
                    setTimeout(function () {
                        App.vent.trigger('player:close');
                    }, 2000);
                }
                win.error('video.js error code: ' + $('#video_player').get(0).player.error().code, $('#video_player').get(0).player.error());
            });

            // add ESC toggle when full screen
            Mousetrap.bind('esc', function (e) {
                _this.leaveFullscreen();
            });

            Mousetrap.bind(['f', 'F'], function (e) {
                _this.toggleFullscreen();
            });

            Mousetrap.bind('h', function (e) {
                _this.adjustSubtitleOffset(0.1);
            });

            Mousetrap.bind('g', function (e) {
                _this.adjustSubtitleOffset(-0.1);
            });

            Mousetrap.bind('shift+h', function (e) {
                _this.adjustSubtitleOffset(1);
            });

            Mousetrap.bind('shift+g', function (e) {
                _this.adjustSubtitleOffset(-1);
            });

            Mousetrap.bind('ctrl+h', function (e) {
                _this.adjustSubtitleOffset(5);
            });

            Mousetrap.bind('ctrl+g', function (e) {
                _this.adjustSubtitleOffset(-5);
            });

            Mousetrap.bind(['space', 'p'], function (e) {
                $('.vjs-play-control').click();
            });

            Mousetrap.bind('right', function (e) {
                _this.seek(10);
            });

            Mousetrap.bind('shift+right', function (e) {
                _this.seek(60);
            });

            Mousetrap.bind('ctrl+right', function (e) {
                _this.seek(600);
            });

            Mousetrap.bind('left', function (e) {
                _this.seek(-10);
            });

            Mousetrap.bind('shift+left', function (e) {
                _this.seek(-60);
            });

            Mousetrap.bind('ctrl+left', function (e) {
                _this.seek(-600);
            });

            Mousetrap.bind('up', function (e) {
                _this.adjustVolume(0.1);
            });

            Mousetrap.bind('shift+up', function (e) {
                _this.adjustVolume(0.5);
            });

            Mousetrap.bind('ctrl+up', function (e) {
                _this.adjustVolume(1);
            });

            Mousetrap.bind('down', function (e) {
                _this.adjustVolume(-0.1);
            });

            Mousetrap.bind('shift+down', function (e) {
                _this.adjustVolume(-0.5);
            });

            Mousetrap.bind(['ctrl+down'], function (e) {
                _this.adjustVolume(-1);
            });

            Mousetrap.bind(['m', 'M'], function (e) {
                _this.toggleMute();
            });

            Mousetrap.bind(['u', 'U'], function (e) {
                _this.displayStreamURL();
            });

            Mousetrap.bind(['ctrl+d'], function (e) {
                _this.toggleMouseDebug();
            });

            document.addEventListener('mousewheel', function (e) {
                _this.mouseScroll(e);
            });

            $('.player-header-background').appendTo('div#video_player');
        },

        toggleMouseDebug: function () {
            if (this.player.debugMouse_) {
                this.player.debugMouse_ = false;
                this.displayOverlayMsg('Mouse debug disabled');
            } else {
                this.player.debugMouse_ = true;
                this.displayOverlayMsg('Mouse debug enabled. Dont touch the mouse until disabled.');
            }
        },

        seek: function (s) {
            var t = this.player.currentTime();
            this.player.currentTime(t + s);
            this.player.trigger('mousemove'); //hack, make controls show
        },

        mouseScroll: function (e) {
            if ($(e.target).parents('.vjs-subtitles-button').length) {
                return;
            }
            if (event.wheelDelta > 0) { // Scroll up
                this.adjustVolume(0.1);
            }
            else { // Scroll down
                this.adjustVolume(-0.1);
            }
        },

        adjustVolume: function (i) {
            var v = this.player.volume();
            this.player.volume(v + i);
            this.displayOverlayMsg(i18n.__('Volume') + ': ' + this.player.volume().toFixed(1) * 100 + '%');
        },

        toggleMute: function () {
            this.player.muted(!this.player.muted());
        },

        toggleFullscreen: function () {

            this.nativeWindow = require('nw.gui').Window.get();

            if (this.nativeWindow.isFullscreen) {
                this.player.isFullscreen(false);
                this.player.trigger('fullscreenchange');
                this.nativeWindow.leaveFullscreen();
                this.nativeWindow.focus();
            } else {
                this.player.isFullscreen(true);
                this.player.trigger('fullscreenchange');
                this.nativeWindow.enterFullscreen();
                this.nativeWindow.focus();
            }
        },

        toggleSubtitles: function () {
        },

        leaveFullscreen: function () {
            this.nativeWindow = require('nw.gui').Window.get();

            if (this.nativeWindow.isFullscreen) {
                this.nativeWindow.leaveFullscreen();
                this.nativeWindow.focus();
            }
        },

        displayStreamURL: function () {
            var clipboard = require('nw.gui').Clipboard.get();
            clipboard.set($('#video_player video').attr('src'), 'text');
            this.displayOverlayMsg(i18n.__('URL of this stream was copied to the clipboard'));
        },

        adjustSubtitleOffset: function (s) {
            var o = this.player.options()['trackTimeOffset'];
            this.player.options()['trackTimeOffset'] = (o + s);
            this.displayOverlayMsg(i18n.__('Subtitles Offset') + ': ' + this.player.options()['trackTimeOffset'].toFixed(1) + ' ' + i18n.__('secs'));
        },

        displayOverlayMsg: function (message) {
            if ($('.vjs-overlay').length > 0) {
                $('.vjs-overlay').text(message);
                clearTimeout($.data(this, 'overlayTimer'));
                $.data(this, 'overlayTimer', setTimeout(function () {
                    $('.vjs-overlay').fadeOut('normal', function () {
                        $(this).remove();
                    });
                }, 3000));
            } else {
                $(this.player.el()).append('<div class =\'vjs-overlay vjs-overlay-top-left\'>' + message + '</div>');
                $.data(this, 'overlayTimer', setTimeout(function () {
                    $('.vjs-overlay').fadeOut('normal', function () {
                        $(this).remove();
                    });
                }, 3000));
            }
        },

        onClose: function () {
            if (!this.inFullscreen && win.isFullscreen) {
                win.leaveFullscreen();
            }
            App.vent.trigger('stream:stop');
            if (this._WatchingTimer) {
                clearInterval(this._WatchingTimer);
            }
        }

    });
    App.View.Player = Player;
})(window.App);
