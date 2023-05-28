Required below keys, update below two steps in the code:
- Add your confluence email, password and Api key in the cnfl.js file.
- Add your openAI Key in the index.js file.

1. npm install
2. To create confluence page, Please run below command in the terminal
    node confluence.js
3. Confluence is calling fetchChatCompletion with the message, if we want to send something else then please modify chatMessageContent content.
4. while running it will ask few question
    1. Enter the page title: Given confluence page title
    2. Enter the space name for the page: 
    3. Enter the parent page id for the page, leave empty if you want to put the page in the root space: Don't enter anything
    4. Write the main topic of the page: Tell about what content do we want from the chatGpt
    5. Write a list of the paragraphs you want in the page: how many paragraph we want the content, give any number
    6. Write any additional requirements for the page: if any additional requirement or comment for the document





