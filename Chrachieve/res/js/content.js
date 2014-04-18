var achievements = {
    first_run: {
        name: "First steps",
        desc: "Install " + chrome.runtime.getManifest().name + ".",
        count: function(stats) {
            return true;
        }
    },
    tabs_opened_1: {
        name: "Tab opener",
        desc: "Open a tab.",
        count: function(stats) {
            return stats.tabs.opened;
        },
    },
    tabs_opened_50: {
        name: "Tab regular",
        desc: "Open 50 tabs.",
        count: function(stats) {
            return stats.tabs.opened;
        },
        max: 50
    },
    tabs_opened_1000: {
        name: "Tab leader",
        desc: "Open 1,000 tabs.",
        count: function(stats) {
            return stats.tabs.opened;
        },
        max: 1000
    },
    tabs_opened_20000: {
        name: "Tab monarchy",
        desc: "Open 20,000 tabs.",
        count: function(stats) {
            return stats.tabs.opened;
        },
        max: 20000
    },
    tabs_opened_500000: {
        name: "Tab overlord",
        desc: "Open 500,000 tabs.",
        count: function(stats) {
            return stats.tabs.opened;
        },
        max: 500000
    },
    tabs_closed_1: {
        name: "Tab closer",
        desc: "Close a tab.",
        count: function(stats) {
            return stats.tabs.closed;
        },
    },
    tabs_closed_50: {
        name: "Tab accomplisher",
        desc: "Close 50 tabs.",
        count: function(stats) {
            return stats.tabs.closed;
        },
        max: 50
    },
    tabs_closed_1000: {
        name: "Tab controller",
        desc: "Close 1,000 tabs.",
        count: function(stats) {
            return stats.tabs.closed;
        },
        max: 1000
    },
    tabs_closed_20000: {
        name: "Tab destroyer",
        desc: "Close 20,000 tabs.",
        count: function(stats) {
            return stats.tabs.closed;
        },
        max: 20000
    },
    tabs_closed_500000: {
        name: "Tab obliterator",
        desc: "Close 500,000 tabs.",
        count: function(stats) {
            return stats.tabs.closed;
        },
        max: 500000
    },
    history_visited_1: {
        name: "Web stepper",
        desc: "Visit a page.",
        count: function(stats) {
            return stats.history.visited;
        },
    },
    history_visited_100: {
        name: "Web walker",
        desc: "Visit 100 pages.",
        count: function(stats) {
            return stats.history.visited;
        },
        max: 100
    },
    history_visited_2500: {
        name: "Web runner",
        desc: "Visit 2,500 pages.",
        count: function(stats) {
            return stats.history.visited;
        },
        max: 2500
    },
    history_visited_100000: {
        name: "Web flier",
        desc: "Visit 100,000 pages.",
        count: function(stats) {
            return stats.history.visited;
        },
        max: 100000
    },
    history_visited_1000000: {
        name: "Web circumnavigator",
        desc: "Visit 1,000,000 pages.",
        count: function(stats) {
            return stats.history.visited;
        },
        max: 1000000
    },
    history_deleted: {
        name: "You saw nothing",
        desc: "Delete something from your history.",
        count: function(stats) {
            return stats.history.deleted;
        }
    },
    history_emptied: {
        name: "You were never here",
        desc: "Clear your entire history.",
        count: function(stats) {
            return stats.history.emptied;
        }
    },
    downloads_completed_1: {
        name: "File acquirer",
        desc: "Download a file.",
        count: function(stats) {
            return stats.downloads.completed;
        },
    },
    downloads_completed_20: {
        name: "File organizer",
        desc: "Download 10 files.",
        count: function(stats) {
            return stats.downloads.completed;
        },
        max: 20
    },
    downloads_completed_500: {
        name: "File collector",
        desc: "Download 200 files.",
        count: function(stats) {
            return stats.downloads.completed;
        },
        max: 500
    },
    downloads_completed_10000: {
        name: "File obsessor",
        desc: "Download 1,000 files.",
        count: function(stats) {
            return stats.downloads.completed;
        },
        max: 10000
    },
    downloads_audio_1: {
        name: "Audio newbie",
        desc: "Download an audio file.",
        count: function(stats) {
            return stats.downloads.audio;
        },
    },
    downloads_audio_10: {
        name: "Audio hobbyist",
        desc: "Download 10 audio files.",
        count: function(stats) {
            return stats.downloads.audio;
        },
        max: 10
    },
    downloads_audio_100: {
        name: "Audiophile",
        desc: "Download 100 audio files.",
        count: function(stats) {
            return stats.downloads.audio;
        },
        max: 100
    },
    downloads_images_1: {
        name: "Image liker",
        desc: "Download an image.",
        count: function(stats) {
            return stats.downloads.images;
        },
    },
    downloads_images_20: {
        name: "Image keeper",
        desc: "Download 20 images.",
        count: function(stats) {
            return stats.downloads.images;
        },
        max: 20
    },
    downloads_images_250: {
        name: "Image cataloguer",
        desc: "Download 250 images.",
        count: function(stats) {
            return stats.downloads.images;
        },
        max: 250
    },
    downloads_videos_1: {
        name: "Video watcher",
        desc: "Download a video.",
        count: function(stats) {
            return stats.downloads.videos;
        },
    },
    downloads_videos_10: {
        name: "Video capturer",
        desc: "Download 10 videos.",
        count: function(stats) {
            return stats.downloads.videos;
        },
        max: 10
    },
    downloads_videos_50: {
        name: "Video recorder",
        desc: "Download 100 videos.",
        count: function(stats) {
            return stats.downloads.videos;
        },
        max: 50
    },
    downloads_cancelled_1: {
        name: "File canceller",
        desc: "Cancel a file download.",
        count: function(stats) {
            return stats.downloads.cancelled;
        },
    },
    downloads_cancelled_20: {
        name: "File aborter",
        desc: "Cancel 20 file downloads.",
        count: function(stats) {
            return stats.downloads.cancelled;
        },
        max: 20
    },
    downloads_cancelled_500: {
        name: "File abandoner",
        desc: "Cancel 500 file downloads.",
        count: function(stats) {
            return stats.downloads.cancelled;
        },
        max: 500
    }
};
var defaults = {
    achievements: {},
    stats: {
        tabs: {
            opened: 0,
            closed: 0
        },
        history: {
            visited: 0
        },
        downloads: {
            completed: 0,
            cancelled: 0,
            audio: 0,
            images: 0,
            videos: 0
        }
    },
    options: {
        default_tab: 0,
        hide_completed: false,
        progress_bars: true,
        notifications: true,
        sounds: false,
        dark_theme: false
    }
};
$.each(achievements, function(id, ach) {
    defaults.achievements[id] = false;
});
