var wsURI = "ws://localhost:9002/websocket";
var ws = new WebSocket(wsURI);

var $textarea = document.getElementById("textarea");

ws.onopen = function() {
    console.log("WebSocket opened: " + ws);
    console.log("URI: " + wsURI);
}

ws.onclose = function (evt) {
    console.log("WebSocket closed");
}

ws.onerror = function (err) {
    console.log("Error: " + err);
}

ws.onmessage = function (evt) {
   onMessage(evt);
}

function onMessage(evt) {
    console.log("Received: " + evt.data);
    var json = JSON.parse(evt.data);
    writeMessages(evt.data);
    var offers_array = json.offers;
    offers_array.forEach(function (element) {
         $("#grid").jsGrid("insertItem", element).done(function() {
                console.log("inserted");
                console.log(json.offers);
            });
    });

}

function writeMessages(message) {
    $textarea.value = $textarea.value + message + "\n";
}

function sendQuery() {
    var $query = document.getElementById("query");
    var json_query = JSON.stringify({
        type : "ru.erogov.watty.api.Message",
        query : $query.value
    });
    writeMessages(json_query);
    ws.send(json_query);
}