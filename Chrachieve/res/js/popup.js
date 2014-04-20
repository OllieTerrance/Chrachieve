$(document).ready(function() {
    $("h1").text(chrome.runtime.getManifest().name);
    chrome.storage.local.get(function(store) {
        store = $.extend(true, {}, defaults, store);
        // write achievements out
        function writeAchievements() {
            $("#achievements").empty();
            var unlocked = 0, total = 0;
            $.each(achievements, function(id, ach) {
                var count = ach.count(store.stats);
                // proportion of completion
                var prop = Math.min(count / (ach.max ? ach.max : 1), 1);
                total++;
                // if achieved
                if (prop >= 1) {
                    unlocked++;
                    if (store.options.hide_completed) return;
                }
                var block = $("<div/>");
                // has progress
                if (ach.max) {
                    var text = Math.min(count, ach.max) + " / " + ach.max + " (" + Math.round(prop * 100) + "%)";
                    block.append($("<span>").text(text));
                }
                block.append($("<h3/>").text(ach.name))
                    .append($("<p/>").text(ach.desc))
                    .toggleClass("achieved", prop >= 1);
                // progress bar
                if (ach.max && store.options.progress_bars) {
                    var prog = $("<div>").addClass("progress");
                    prog.append($("<div/>").css("width", (prop * 100) + "%"));
                    block.append(prog);
                }
                $("#achievements").append(block);
            });
            // total count
            $("#count").text(unlocked + " of " + total + " (" + Math.round((unlocked / total) * 100) + "%)");
        };
        writeAchievements();
        // switch tabs on select
        $("#tabs li").click(function(e) {
            $("#tabs li").removeClass("select");
            $(this).addClass("select");
            $(".tab").hide();
            $($(this).data("tab")).show();
        });
        // write statistics out
        function writeStats() {
            $("#stats").empty()
                       .append("<li>Tabs opened: " + store.stats.tabs.opened + "</li>")
                       .append("<li>Tabs closed: " + store.stats.tabs.closed + "</li>")
                       .append("<li>Pages visited: " + store.stats.history.visited + "</li>")
                       .append("<li>Downloads completed: " + store.stats.downloads.completed + "</li>")
                       .append($("<ul/>").append("<li>Audio: " + store.stats.downloads.audio + "</li>")
                                         .append("<li>Images: " + store.stats.downloads.images + "</li>")
                                         .append("<li>Videos: " + store.stats.downloads.videos + "</li>"))
                       .append("<li>Downloads cancelled: " + store.stats.downloads.cancelled + "</li>");
        }
        writeStats();
        // prefill options
        switch (store.options.default_tab) {
            case 0:
                $("#default-tab-achievements").prop("checked", true);
                break;
            case 1:
                $("#default-tab-stats").prop("checked", true);
                break;
        }
        if (store.options.hide_completed) $("#hide-completed").prop("checked", true);
        if (store.options.progress_bars) $("#progress-bars").prop("checked", true);
        if (store.options.notifications) $("#notifications").prop("checked", true);
        if (store.options.sounds) $("#sounds").prop("checked", true);
        if (store.options.dark_theme) $("#dark-theme").prop("checked", true);
        // save settings
        $("#save").click(function(e) {
            if ($("#default-tab-achievements").prop("checked")) store.options.default_tab = 0;
            if ($("#default-tab-stats").prop("checked")) store.options.default_tab = 1;
            store.options.hide_completed = $("#hide-completed").prop("checked");
            store.options.progress_bars = $("#progress-bars").prop("checked");
            store.options.notifications = $("#notifications").prop("checked");
            store.options.sounds = $("#sounds").prop("checked");
            store.options.dark_theme = $("#dark-theme").prop("checked");
            $(document.body).toggleClass("dark", store.options.dark_theme);
            var btn = $(this);
            btn.text("Saving...");
            chrome.storage.local.set({options: store.options}, function() {
                btn.text("Saved!");
                setTimeout(function() {
                    pending = false;
                    btn.text("Save options?");
                }, 1000);
            });
            // rewrite content
            writeAchievements();
        });
        // reset everything
        var pending = 0;
        $("#reset").click(function(e) {
            var btn = $(this);
            if (pending) {
                clearTimeout(pending);
                $("#reset-text").text("Resetting...");
                $.extend(true, store.achievements, defaults.achievements);
                $.extend(true, store.stats, defaults.stats);
                chrome.storage.local.set(store, function() {
                    $("#reset-text").text("All statistics reset!");
                    setTimeout(function() {
                        btn.text("I'm sure, reset everything...");
                    }, 2000);
                });
                // rewrite content
                writeAchievements();
                writeStats();
            } else {
                btn.text("Last chance: click again to reset!");
                pending = setTimeout(function() {
                    pending = 0;
                    btn.text("I'm sure, reset everything...");
                }, 2000);
            }
        });
        // default tab
        $($("#tabs li")[store.options.default_tab]).click();
        // dark theme
        $(document.body).toggleClass("dark", store.options.dark_theme);
        // loading complete
        setTimeout(function() {
            $("#loading").fadeOut(250, function() {
                $("#loaded").fadeIn(250);
            });
        }, 250);
    });
});
