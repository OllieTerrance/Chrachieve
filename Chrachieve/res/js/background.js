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
        test(["history_deleted"]);
        if (removed.allHistory) {
            console.log("history.emptied: " + (store.stats.history.emptied = true));
            test(["history_emptied"]);
        }
        save();
    });
    chrome.downloads.onChanged.addListener(function(delta) {
        if (!delta.state) return;
        if (delta.state.current === "complete") {
            console.log("downloads.completed: " + (++store.stats.downloads.completed));
            test(["downloads_completed_1", "downloads_completed_20", "downloads_completed_500", "downloads_completed_10000"]);
            chrome.downloads.search({id: delta.id}, function(downloads) {
                var mime = downloads[0].mime.split("/");
                switch (mime[0]) {
                    case "audio":
                        console.log("downloads.audio: " + (++store.stats.downloads.audio));
                        test(["downloads_audio_1", "downloads_audio_10", "downloads_audio_100"]);
                        break;
                    case "image":
                        console.log("downloads.images: " + (++store.stats.downloads.images));
                        test(["downloads_images_1", "downloads_images_20", "downloads_images_250"]);
                        break;
                    case "video":
                        console.log("downloads.videos: " + (++store.stats.downloads.videos));
                        test(["downloads_videos_1", "downloads_videos_10", "downloads_videos_50"]);
                        break;
                }
                save();
            });
        } else if (delta.state.current === "interrupted" && delta.error.current === "USER_CANCELED") {
            console.log("downloads.cancelled: " + (++store.stats.downloads.cancelled));
            test(["downloads_cancelled_1", "downloads_cancelled_20", "downloads_cancelled_500"]);
        }
        save();
    });
    test(["first_run"]);
    save();
});
