const API_URL = 'http://127.0.0.1:5000/v1/chat/completions';
const chatHistory = [];

function appendMessage(role, text) {
  const itemClass = role === 'user' ? 'list-group-item-light' : 'list-group-item-primary';
  const sender = role === 'user' ? 'You' : 'Assistant';
  const $item = $('<li>').addClass(`list-group-item ${itemClass}`).text(`${sender}: ${text}`);
  $('#chatHistory').append($item);
  $('#chatHistory').scrollTop($('#chatHistory')[0].scrollHeight);
}

function getAIResponse(history) {
  const body = {
    messages: history,
    mode: 'instruct',
    instruction_template: 'Alpaca'
  };

  return $.ajax({
    url: API_URL,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(body)
  }).then(json => json.choices[0].message.content);
}

$(function() {
  $('#chatForm').on('submit', function(e) {
    e.preventDefault();
    const message = $('#usertext').val().trim();
    if (!message) return;
    appendMessage('user', message);
    chatHistory.push({ role: 'user', content: message });
    $('#usertext').val('');
    $('#loading').removeClass('d-none');

    getAIResponse(chatHistory).then(reply => {
      appendMessage('assistant', reply);
      chatHistory.push({ role: 'assistant', content: reply });
    }).catch(err => {
      appendMessage('assistant', 'Error contacting API.');
      console.error(err);
    }).always(() => {
      $('#loading').addClass('d-none');
    });
  });
});
