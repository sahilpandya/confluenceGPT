var readline = require("readline");
var openAiB =  require("./index");

var cnfl = require("./cnfl");

function getUserInputs() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question("Enter the page title: ", (pageTitle) => {
            rl.question("Enter the space name for the page: ", (pageSpace) => {
                rl.question(
                    "Enter the parent page id for the page, leave empty if you want to put the page in the root space: ",
                    (pageParent) => {
                        rl.question("Write the main topic of the page: ", (pageTopic) => {
                            rl.question(
                                "Write a list of the paragraphs you want in the page: ",
                                (pageStructure) => {
                                    rl.question(
                                        "Write any additional requirements for the page: ",
                                        (pageRequirements) => {
                                            rl.close();
                                            pageParent =
                                                pageParent.trim() === "" ? null : pageParent;
                                            resolve([
                                                pageTitle,
                                                pageSpace,
                                                pageParent,
                                                pageTopic,
                                                pageStructure,
                                                pageRequirements,
                                            ]);
                                        },
                                    );
                                },
                            );
                        });
                    },
                );
            });
        });
    });
}

async function createConfluence() {
    console.info("Initializing Confluence client");

    console.info("Initializing OpenAI client");

    console.info("Getting page constraints from user");
    const [pageTitle, pageSpace, pageParent, pageTopic, pageStructure, pageRequirements] =
        await getUserInputs();

    console.info("Generating page content with GPT-3");
    const chatMessageContent = `Write a well formatted Confluence page using the markdown syntax.
The main topic of the page is ${pageTopic}.
These are the paragraphs that have to be in the page:
${pageStructure}

In addition, I want you to apply these constraints for writing the page:
'${pageRequirements}'`;

    let chatResponse = "";

    try {
        const response = await openAiB.fetchChatCompletion(chatMessageContent);
        console.log("ChatGPT reply:", response);
        chatResponse = response;
    } catch (error) {
        console.error("Error:", error);
    }

    console.info("Creating page in Confluence", JSON.stringify(chatResponse[0].message.content));

    // create a confluence page with the title and content
    cnfl.createConfluencePage(pageTitle, chatResponse[0].message.content, pageParent, pageSpace)

    console.info(`Page created successfully in space: ${pageSpace}, with title: ${pageTitle}`);
}

createConfluence().catch((error) => {
    console.error(error);
    process.exit(1);
});
