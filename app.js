$(function() {
  async function getAIResponse(message) {
    const body = {
      messages: [{ role: 'user', content: message }],
      mode: 'instruct',
      instruction_template: 'Alpaca'
    };

    const response = await fetch('http://127.0.0.1:5000/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const json = await response.json();
    return json.choices[0].message.content;
  }

  async function sendMessage(message) {
    appendMessage('You', message);
    $('#userText').val('');
    $('#submitButton').prop('disabled', true);
    try {
      const reply = await getAIResponse(message);
      appendMessage('Bot', reply);
    } catch (err) {
      appendMessage('Error', 'Failed to reach server.');
    } finally {
      $('#submitButton').prop('disabled', false);
    }
  }

  function appendMessage(sender, text) {
    const html = `<div class="mb-2"><strong>${sender}:</strong> ${marked.parse(text)}</div>`;
    $('#chatArea').append(html);
    $('#chatArea').scrollTop($('#chatArea')[0].scrollHeight);
  }

  $('#chatForm').on('submit', function(e) {
    e.preventDefault();
    const message = $('#userText').val().trim();
    if (message) {
      sendMessage(message);
    }
  });
});
