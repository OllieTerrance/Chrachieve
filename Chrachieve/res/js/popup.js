$(document).ready(function() {
    $("h1").text(chrome.runtime.getManifest().name);
    chrome.storage.local.get(function(store) {
        var unlocked = 0, total = 0;
        $.each(achievements, function(id, ach) {
            var count = ach.count(store.stats);
            var prop = Math.min(count / (ach.max ? ach.max : 1), 1);
            var block = $("<div/>");
            if (ach.max) {
                var text = Math.min(count, ach.max) + " / " + ach.max + " (" + Math.round(prop * 100) + "%)";
                block.append($("<span>").text(text));
            }
            block.append($("<h3/>").text(ach.name))
                .append($("<p/>").text(ach.desc))
                .toggleClass("achieved", prop >= 1);
            if (ach.max) {
                var prog = $("<div>").addClass("progress");
                prog.append($("<div/>").css("width", "calc(" + (prop * 100) + "% - 16px)"));
                block.append(prog);
            }
            $("#achievements").append(block);
            total++;
            if (prop >= 1) unlocked++;
        });
        $("#count").text(unlocked + " of " + total + " (" + Math.round((unlocked / total) * 100) + "%)");
        $("#tabs li").click(function(e) {
            $("#tabs li").removeClass("select");
            $(this).addClass("select");
            $(".tab").hide();
            $($(this).data("tab")).show();
        });
        $("#stats").append("<li>Tabs opened: " + store.stats.tabs.opened + "</li>")
                   .append("<li>Tabs closed: " + store.stats.tabs.closed + "</li>")
                   .append("<li>Pages loaded: " + store.stats.tabs.navigated + "</li>")
                   .hide();
        var pending = false;
        $("#reset-btn").click(function(e) {
            var btn = $(this);
            if (pending) {
                chrome.storage.local.set(defaults);
                $("#reset-text").text("All statistics have been reset!");
                btn.hide();
                setTimeout(function() {
                    window.close();
                }, 1000);
            } else {
                pending = true;
                btn.text("Last chance!  Click again to reset...");
                setTimeout(function() {
                    pending = false;
                    btn.text("I'm sure, reset everything...");
                }, 2000);
            }
        });
    });
});
