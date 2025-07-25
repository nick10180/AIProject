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
  const choice = json.choices[0];
  return choice.message.content;
}

document.getElementById('chatform').addEventListener('submit', async (e) => {
  e.preventDefault();
  const textarea = document.getElementById('usertext');
  const message = textarea.value.trim();
  if (!message) return;
  const reply = await getAIResponse(message);
  document.getElementById('chatbottext').textContent = reply;
});
