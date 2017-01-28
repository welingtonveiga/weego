
const messagesURL = 'http://service-api.herokuapp.com/messages';


function getMessages() {
    return $.getJSON(messagesURL);
}
