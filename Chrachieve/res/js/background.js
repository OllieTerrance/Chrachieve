chrome.storage.local.get(function(store) {
    store = $.extend(true, {}, defaults, store);
    var watch = true;
    function save() {
        watch = false;
        chrome.storage.local.set(store, function() {
            watch = true;
        });
    }
    chrome.storage.onChanged.addListener(function(changes, area) {
        if (!watch) return;
        chrome.storage.local.get(function(newStore) {
            store = newStore;
            test(["first_run"]);
        });
    });
    function test(ids) {
        $.each(ids, function(i, id) {
            var ach = achievements[id];
            if (!store.achievements[id] && ach.count(store.stats) >= (ach.max ? ach.max : 1)) {
                store.achievements[id] = true;
                if (store.options.notifications) {
                    chrome.notifications.create("", {
                        type: "basic",
                        iconUrl: "/res/img/logo-128.png",
                        title: "Achievement unlocked!",
                        message: ach.name,
                        contextMessage: ach.desc
                    }, function(id) {});
                }
                if (store.options.sounds) {
                    new Audio("/res/mp3/achieve.mp3").play();
                }
            }
        })
    }
    chrome.tabs.onCreated.addListener(function(tab) {
        console.log("tabs.opened: " + (++store.stats.tabs.opened));
        test(["tabs_opened_1", "tabs_opened_50", "tabs_opened_1000", "tabs_opened_20000", "tabs_opened_500000"]);
        save();
    });
    chrome.tabs.onRemoved.addListener(function(tab) {
        console.log("tabs.closed: " + (++store.stats.tabs.closed));
        test(["tabs_closed_1", "tabs_closed_50", "tabs_closed_1000", "tabs_closed_20000", "tabs_closed_500000"]);
        save();
    });
    chrome.history.onVisited.addListener(function(result) {
        console.log("history.visited: " + (++store.stats.history.visited));
        test(["history_visited_1", "history_visited_100", "history_visited_2500", "history_visited_100000", "history_visited_1000000"]);
        save();
    });
    chrome.history.onVisitRemoved.addListener(function(removed) {
        console.log("history.deleted: " + (store.stats.history.deleted = true));
        if (removed.allHistory) console.log("history.emptied: " + (store.stats.history.emptied = true));
        test(["history_deleted", "history_emptied"]);
        save();
    });
    test(["first_run"]);
    save();
});
