# AIProject

This project is a very small local web application that sends text to a chat completion API and displays the response.

## Usage

Open `index.html` in your browser. Enter a message and click **Send**. The client will send a POST request to `http://127.0.0.1:5000/v1/chat/completions` and display the conversation in the page.

The interface uses [Bootstrap 5](https://getbootstrap.com/) for styling and [jQuery](https://jquery.com/) for DOM helpers. Responses are rendered as HTML using the [Marked](https://marked.js.org/) library so that Markdown in replies is formatted correctly.

Make sure that an API compatible with the endpoint above is running on your machine.
