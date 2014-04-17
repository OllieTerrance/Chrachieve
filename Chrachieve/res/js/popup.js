$(document).ready(function() {
    chrome.runtime.sendMessage("getAchievements", function(achievements) {
        chrome.storage.local.get(function(store) {
            var count = 0, total = 0;
            $.each(achievements, function(id, ach) {
                $("#achievements").append($("<div/>").append($("<h3/>").text(ach.name))
                                             .append($("<p/>").text(ach.desc))
                                             .toggleClass("achieved", store.achievements[id]));
                total++;
                if (store.achievements[id]) count++;
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
                       .hide();
        });
    });
});
