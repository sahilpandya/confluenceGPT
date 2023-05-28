const axios = require('axios');

const apiUrl = 'https://yourcompany.atlassian.net/wiki/rest/api/content';
const username = 'ADD_YOUR_CONFLUENCE_ID';
const password = 'ENTER_YOUR_CONFLUENCE_API_KEY';

async function createConfluencePage(pageTitle, chatResponse, pageParent, pageSpace) {
    try {
        // Create a Confluence page request body
        const pageData = {
            type: 'page',
            title: pageTitle,
            space: { key: pageSpace }, // Replace 'SPACE_KEY' with the key of the desired space
            body: {
                storage: {
                    value: chatResponse || '<p>This is the page content.</p>',
                    representation: 'storage',
                },
            },
            parent: pageParent,
        };

        // Make a POST request to create the page
        const response = await axios.post(apiUrl, pageData, {
            auth: { username, password },
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('Page created successfully:', response.data);
    } catch (error) {
        console.error('Error creating page:', error.response.data);
    }
}

module.exports = { createConfluencePage }
