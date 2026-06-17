$(document).ready(function() {
    $('.application-guide__video, .video-block__item').each(function() {
        const $videoBlock = $(this);
        const video = $videoBlock.find('.application-guide__video-media, .video-block__media').get(0);
        const $playButton = $videoBlock.find('.application-guide__video-play, .video-block__play');

        if (!video || !$playButton.length) {
            return;
        }

        const togglePlayButton = function() {
            $playButton.toggleClass('is-hidden', !video.paused && !video.ended);
        };

        $playButton.on('click', function(e) {
            e.stopPropagation();

            if (!video.paused && !video.ended) {
                video.pause();
                return;
            }

            const playPromise = video.play();

            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(function() {
                    togglePlayButton();
                });
            }
        });

        $(video).on('click', function() {
            if (video.paused || video.ended) {
                const playPromise = video.play();

                if (playPromise && typeof playPromise.catch === 'function') {
                    playPromise.catch(function() {
                        togglePlayButton();
                    });
                }
                return;
            }

            video.pause();
        });

        $(video).on('play pause ended', togglePlayButton);
        togglePlayButton();
    });
});
