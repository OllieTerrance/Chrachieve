$(document).ready(function() {
    chrome.storage.local.get(function(store) {
        var count = 0, total = 0;
        $.each(achievements, function(id, ach) {
            var done = ach.count(store.stats) >= (ach.max ? ach.max : 1);
            $("#achievements").append($("<div/>").append($("<h3/>").text(ach.name))
                                                 .append($("<p/>").text(ach.desc))
                                                 .toggleClass("achieved", done));
            total++;
            if (done) count++;
        });
        $("#count").text(count + " of " + total + " achieved");
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
