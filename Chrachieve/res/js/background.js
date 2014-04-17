chrome.storage.local.get(function(store) {
    store = $.extend(true, {}, defaults, store);
    chrome.tabs.onCreated.addListener(function(tab) {
        console.log("tabs.opened: " + (++store.stats.tabs.opened));
        chrome.storage.local.set(store);
    });
    chrome.tabs.onRemoved.addListener(function(tab) {
        console.log("tabs.closed: " + (++store.stats.tabs.closed));
        chrome.storage.local.set(store);
    });
    chrome.tabs.onUpdated.addListener(function(id, change, tab) {
        if (change.status === "loading") {
            console.log(tab);
            console.log("tabs.navigated: " + (++store.stats.tabs.navigated));
            chrome.storage.local.set(store);
        }
    });
    chrome.storage.local.set(store);
});
