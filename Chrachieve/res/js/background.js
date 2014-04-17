var achievements = {
    first_run: {
        name: "First steps",
        desc: "Install " + chrome.runtime.getManifest().name + ".",
        test: function(stats) {
            return true;
        }
    },
    tabs_opened_1: {
        name: "Tab opener",
        desc: "Open a tab.",
        test: function(stats) {
            return stats.tabs.opened >= 1;
        }
    },
    tabs_opened_50: {
        name: "Tab regular",
        desc: "Open 50 tabs.",
        test: function(stats) {
            return stats.tabs.opened >= 50;
        }
    },
    tabs_opened_1000: {
        name: "Tab leader",
        desc: "Open 1,000 tabs.",
        test: function(stats) {
            return stats.tabs.opened >= 1000;
        }
    },
    tabs_opened_20000: {
        name: "Tab monarchy",
        desc: "Open 20,000 tabs.",
        test: function(stats) {
            return stats.tabs.opened >= 20000;
        }
    },
    tabs_opened_500000: {
        name: "Tab overlord",
        desc: "Open 500,000 tabs.",
        test: function(stats) {
            return stats.tabs.opened >= 500000;
        }
    },
    tabs_closed_1: {
        name: "Tab closer",
        desc: "Close a tab.",
        test: function(stats) {
            return stats.tabs.closed >= 1;
        }
    },
    tabs_closed_50: {
        name: "Tab accomplisher",
        desc: "Close 50 tabs.",
        test: function(stats) {
            return stats.tabs.closed >= 50;
        }
    },
    tabs_closed_1000: {
        name: "Tab controller",
        desc: "Close 1,000 tabs.",
        test: function(stats) {
            return stats.tabs.closed >= 1000;
        }
    },
    tabs_closed_20000: {
        name: "Tab destroyer",
        desc: "Close 20,000 tabs.",
        test: function(stats) {
            return stats.tabs.closed >= 20000;
        }
    },
    tabs_closed_500000: {
        name: "Tab obliterator",
        desc: "Close 500,000 tabs.",
        test: function(stats) {
            return stats.tabs.closed >= 500000;
        }
    }
};
var defaults = {
    stats: {
        tabs: {
            opened: 0,
            closed: 0
        }
    },
    achievements: {}
};
$.each(achievements, function(id, ach) {
    defaults.achievements[id] = false;
});
chrome.storage.local.get(function(store) {
    store = $.extend(true, {}, defaults, store);
    function test() {
        var change = false;
        $.each(achievements, function(id, ach) {
            if (!store.achievements[id] && ach.test(store.stats)) {
                change = true;
                store.achievements[id] = true;
                chrome.notifications.create("", {
                    type: "basic",
                    title: ach.name,
                    message: ach.desc
                }, function(notif) {
                    console.log(notif, ach);
                });
            }
        });
        chrome.storage.local.set(store);
    }
    chrome.tabs.onCreated.addListener(function(tab) {
        console.log("tabs.opened: " + (++store.stats.tabs.opened));
        test();
    });
    chrome.tabs.onRemoved.addListener(function(tab) {
        console.log("tabs.closed: " + (++store.stats.tabs.closed));
        test();
    });
    test();
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        switch (request) {
            case "getAchievements":
                sendResponse(achievements);
                break;
        }
    });
    // debug
    window.s = store;
    window.r = function() {
        store = defaults;
        chrome.storage.local.set(store);
        return true;
    };
});
