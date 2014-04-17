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
        max: 1
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
        max: 1
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
        max: 1
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
        }
    }
};
$.each(achievements, function(id, ach) {
    defaults.achievements[id] = false;
});
