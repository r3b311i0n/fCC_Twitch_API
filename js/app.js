const users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
const api = "https://crossorigin.me/https://wind-bow.gomix.me/twitch-api/";

//noinspection JSUnusedLocalSymbols
function main(e) {
    $(".online").css("opacity", 0.4);
    $(".offline").css("opacity", 0.4);
    all();
}

//noinspection JSUnusedLocalSymbols
function all(e) {
    $(".streamerList").children().remove();

    $(".online").css("opacity", 0.4);
    $(".offline").css("opacity", 0.4);
    $(".all").css("opacity", 1);

    users.forEach(function (element, index, users) {
        $.getJSON(
            api + "users/" + element,
            function (data) {
                if (data.hasOwnProperty("error")) {
                    $(".streamerList").append("<li class='streamerUnavailable'>" + element + " is unavailable!" + "</li>");
                }
                else {
                    $(".streamerList").append("<li class='streamerResponse'>" + "<a target='_blank' href='" + "https://www.twitch.tv/" + element + "'>" + element + "</a></li>");
                }
            }
        );
    });
}

//noinspection JSUnusedLocalSymbols
function online(e) {
    $(".streamerList").children().remove();

    $(".all").css("opacity", 0.4);
    $(".offline").css("opacity", 0.4);
    $(".online").css("opacity", 1);

    users.forEach(function (element, index, users) {
        $.getJSON(
            api + "streams/" + element,
            function (data) {
                if (data["stream"] !== null) {
                    $(".streamerList").append("<li class='streamerResponse'>" + "<a target='_blank' href='" + "https://www.twitch.tv/" + element + "'>" + element + " - " + data["stream"]["game"] + "</a></li>");
                }
            }
        );
    });
}

//noinspection JSUnusedLocalSymbols
function offline(e) {
    /*
     if user status is offline, fill stream list with offline users.
     */
    $(".streamerList").children().remove();

    $(".all").css("opacity", 0.4);
    $(".online").css("opacity", 0.4);
    $(".offline").css("opacity", 1);

    users.forEach(function (element, index, users) {
        $.getJSON(
            api + "streams/" + element,
            function (data) {
                if (data["stream"] == null) {
                    $(".streamerList").append("<li class='streamerResponse'>" + "<a target='_blank' href='" + "https://www.twitch.tv/" + element + "'>" + element + "</a></li>");
                }
            }
        );
    });
}

$(".all").on("click", all);
$(".online").on("click", online);
$(".offline").on("click", offline);

$(document).ready(main());