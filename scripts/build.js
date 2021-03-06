const fs = require("fs-extra");
const path = require("path");

function configure() {
  // default configuration
  let config = { spaceId: null, contentDeliveryAccessToken: null, contentPreviewAccessToken: null };
  
  // get configuration file
  const configurationFile = "../config/contentful.json";
  try {
    config = require(configurationFile);
  } catch (e) {
    console.log(`No configration file found at ${configurationFile}`);
  }

  // get environment variables
  if (process.env.CONTENTFUL_SPACE_ID) {
    config.spaceId = process.env.CONTENTFUL_SPACE_ID;
  }
  if (process.env.CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN) {
    config.contentDeliveryAccessToken = process.env.CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN;
  }
  if (process.env.CONTENTFUL_CONTENT_PREVIEW_ACCESS_TOKEN) {
    config.contentPreviewAccessToken = process.env.CONTENTFUL_CONTENT_PREVIEW_ACCESS_TOKEN;
  }

  // validate configuration
  if (
    config.spaceId === null || 
    config.contentDeliveryAccessToken === null || 
    config.contentPreviewAccessToken === null
  ) {
    throw new Error(
      `Could not find Contentful configuration values for 
      spaceId, contentDeliveryAccessToken, or contentPreviewAccessToken: 
      ${config}`
    );
  }

  return config;
}

function publicDirectory() {
  return path.join(path.resolve(path.dirname(".")), "public");
}

function clear() {
  fs.emptyDirSync(publicDirectory())
}

function write(filename, content) {
  fs.writeSync(fs.openSync(path.join(publicDirectory(), filename), "w"), content);
}

function mkdir(directory) {
  fs.ensureDirSync(path.join(publicDirectory(), directory));
}

function buildLayout({ slug, title, body }) {
  const content = `<html>
  <head>
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      a {
        font-weight: 100;
      }
      a:link, a:visited {
        color: black;
      }
      a:hover {
        color: black;
      }
      a:active {
        color: black;
      }
      .nav-item {
        display: flex;
        align-items: center;
        height: 75px;
        box-sizing: border-box;
        cursor: pointer;
        padding-top: 3px;
        border-bottom: 3px solid transparent;
        padding-left: 10px;
        padding-right: 10px;
      }
      .nav-item:hover {
        border-bottom: 3px solid #ab61e5;
      }
      .share-feedback-item:hover {
        background-color: #fbf7fe;
      }
      .share-feedback-item-name {
        color: #59636e;
      }
      .share-feedback-item:hover .share-feedback-item-name {
        color: black;
      }
      input[type="radio"] + label {
        background-color: #f2f3f4;
        padding: 20px 30px;
        border-radius: 4px;
        box-sizing: border-box;
        cursor: pointer;
        font-weight: 100;
      }
      input[type="radio"]:checked + label {
        background-color: #59636d;
        color: #cbced2;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/contentful-management@5.3.2/dist/contentful-management.browser.min.js"></script>
  </head>
  <body style="margin:0;padding:0;font-family:helvetica,arial,sans-serif;">
    <div style="display:flex;height:75px;background-color:#f2f3f4;align-items:center;box-shadow:0 0 4px rgba(0,0,0,0.25);">
      <span style="flex-grow:1;"></span>
      <span style="flex-shrink:1;">
        <a href="/" style="text-decoration:none;">
          <h1 style="display:inline-block;font-size:24px;">Honesto</h1>
        </a>
      </span>
      <span style="flex-basis:80px;"></span>
      <nav style="flex-grow:1;">
        <span style="display:flex;align-items:center;">
          <span class="nav-item">
            <a href="/" style="flex-shrink:1;white-space:nowrap;text-decoration:none;color:black;font-weight:500;">Share Feedback</a>
          </span>
          <span style="flex-basis:50px;"></span>
          <span class="nav-item">
            <a href="/" style="flex-shrink:1;white-space:nowrap;text-decoration:none;color:black;font-weight:500;">My Feedback</a>
          </span>
          <span style="flex-basis:50px;"></span>
          <span class="nav-item">
            <a href="/" style="flex-shrink:1;white-space:nowrap;text-decoration:none;color:black;font-weight:500;">Team Feedback</a>
          </span>
          <span style="flex-basis:50px;"></span>
          <span class="nav-item">
            <a href="/" style="flex-shrink:1;white-space:nowrap;text-decoration:none;color:black;font-weight:500;">Teams</a>
          </span>
          <span style="flex-basis:50px;"></span>
          <span style="flex-shrink:1;">
            <span style="display:flex;flex-direction:column;align-items:flex-end;width:150px;">
              <span style="font-size:12px;color:#59636e;font-weight:500;padding-bottom:5px;">
                Next Feedback Cycle:
              </span>
              <span>
                <span style="font-weight:200;">Oct 2018</span>
                <span style="color:#d9dcde;">&mdash;</span>
                <span style="color:#1ddebb;font-weight:500;">5 days</span>
              </span>
            </span>
          </span>
          <span style="flex-basis:40px;"></span>
        </span>
      </nav>
      <span style="height:100%;border-left:1px solid #d9dcde;box-sizing:border-box;align-self:flex-end;flex-basis:235px;">
        <span style="display:flex;align-items:center;">
          <img
            style="border-radius:100%;padding:8px 24px;"
            src="https://images.ctfassets.net/hcthlz4vm6pt/6rIYjDhXSoUisEicqAYUG2/50f9919558791de9a75fddaed45c5f4d/sarah-kozlowski.jpg?h=58"
            alt="Jane Smith"
            width="58px"
            height="58px"
          />
          <span style="flex-basis:16px;"></span>
          <span style="display:flex;flex-direction:column;">
            <span style="font-weight:300;padding-bottom:5px;">Jane Smith</span>
            <span style="font-size:12px;font-weight:600;color:#59636d;letter-spacing:2px;">LOGOUT</span>
          </span>
          <span style="flex-basis:24px;"></span>
        </span>
      </span>
    </div>
    <main>
      <div style="background-color:white;color:black;">
        <div style="min-height:80%;max-width:788px;margin-left:auto;margin-right:auto;margin-bottom:40px;">
          ${body}
        </div>
      </div>
    </main>
    <footer>
      <div style="display:flex;align-items:center;height:55px;background-color:black;color:white;">
        <span style="flex-basis:120px;"></span>
        <span style="flex-grow:1;font-family:Georgia,serif;font-size:20px;">Theorem &#9633;</span>
        <span style="font-size:12px;color:#dfe1e3;font-weight:100;">Copyright &copy; 2018 <b style="font-family:Georgia,serif;">Theorem</b>, LLC. All rights reserved.</span>
        <span style="flex-basis:20px;"></span>
      </div>
    </footer>
  </body>
</html>`;
  write(`${slug}.html`, content);
}

function buildShareFeedbackListItem({ sys, fields }) {
  return `<div class="share-feedback-item" style="display:flex;align-items:center;border-bottom:1px solid #e4e5e7;height:96px;">
  <span style="flex-basis:24px;"></span>
  <img src="${fields.image.fields.file.url}" width="58px" height="58px" alt="${fields.image.fields.title}" style="border-radius:100%;flex-basis:58px;" />
  <span style="flex-basis:24px;"></span>
  <span class="share-feedback-item-name" style="flex-grow:1;height:58px;line-height:58px;font-size:22px;">${fields.name}</span>
  <span style="flex-basis:150px;height:58px;line-height:58px;">
    <a
      style="width:150px;height:58px;border:1px solid #e4e5e7;box-sizing:border-box;border-radius:4px;display:inline-flex;text-decoration:none;background-color:#aa62e0;color:white;"
      href="/detail.html?userId=${sys.id}"
    >
      <span style="width:150px;text-align:center;">Fill Out</span>
    </a>
  </span>
  <span style="flex-basis:24px;"></span>
</div>`;
}

async function buildShareFeedbackList({ client }) {
  const users = await client.getEntries({ content_type: "user" });
  const body = `<div style="padding-top:30px;">
  <span style="display:flex;align-items:center;justify-content:space-between;">
    <h2 style="font-size:30px;font-weight:500;">Share Feedback</h2>
    <span style="display:flex;flex-direction:column;">
      <span style="font-size:12px;font-weight:600;color:#59636d;letter-spacing:2px;padding-bottom:5px;">FEEDBACK PERIOD</span>
      <span>
        <select style="width:345px;height:48px;background-color:white;border:1px solid #d9dcde;border-radius:4px;font-size:16px;text-indent:10px;">
          <option selected>September 2018</option>
        </select>
      </span>
    </span>
  </span>
  <div style="border:1px solid #e4e5e7;border-radius:2px;margin-top:10px;box-shadow:0 0 4px rgba(0,0,0,0.25);">
    ${users.items.map(buildShareFeedbackListItem).join("")}
  </div>
</div>`;
  buildLayout({
    slug: "index",
    title: "Share Feedback",
    body: body,
  });
}

function buildShareFeedbackDetailQuestionTitle({ title }) {
  return `<div style="display:flex;align-items:center;margin-bottom:35px;">
  <span style="flex-grow:1;">
    <h2 style="font-size:30px;font-weight:500;margin:0;padding-bottom:20px;">${title}</h2>
    <span style="font-size:12px;font-weight:600;letter-spacing:2px;color:#c1c4c8;text-transform:uppercase;">Share your feedback for <span class="userName"></span></span>
  </span>
  <span style="flex-basis:58px">
    <img class="userImage" width="58px" height="58px" style="border-radius:100%;" />
  </span>
</div>`;
}

function buildShareFeedbackDetailQuestionNavigation({ first, last }) {
  let previousStyle, previousOnClick, nextStyle, nextOnClick;
  if (first) {
    previousStyle = `style="width:150px;height:58px;border:1px solid #e4e5e7;box-sizing:border-box;border-radius:4px;display:inline-flex;color:black;cursor:not-allowed;opacity:0.5;"`
    previousOnClick = "";
  } else {
    previousStyle = `style="width:150px;height:58px;border:1px solid #e4e5e7;box-sizing:border-box;border-radius:4px;display:inline-flex;color:black;cursor:pointer;"`
    previousOnClick = `onclick="previousQuestion(event)"`;
  }
  if (last) {
    nextStyle = `style="width:150px;height:58px;border:1px solid #e4e5e7;box-sizing:border-box;border-radius:4px;display:inline-flex;color:white;background-color:#aa62e0;cursor:not-allowed;opacity:0.5;"`
    nextOnClick = "";
    submitButton = `<button type="submit" style="height:58px;width:150px;border-radius:4px;padding:10px;background-color:#1ddebb;color:white;font-size:16px;cursor:pointer;">Submit</button>`;
  } else {
    nextStyle = `style="width:150px;height:58px;border:1px solid #e4e5e7;box-sizing:border-box;border-radius:4px;display:inline-flex;color:white;background-color:#aa62e0;cursor:pointer;"`
    nextOnClick = `onclick="nextQuestion(event)"`;
    submitButton = "";
  }
  return `<div style="display:flex;margin-top:20px;margin-bottom:20px;">
  <span style="flex-basis:150px;height:58px;line-height:58px;">
    <span ${previousStyle} ${previousOnClick}>
      <span style="text-align:center;width:150px;">Previous</span>
    </span>
  </span>
  <span style="flex-grow:1;"></span>
  <span style="flex-shrink:1;">${submitButton}</span>
  <span style="flex-grow:1;"></span>
  <span style="flex-basis:150px;height:58px;line-height:58px;">
    <span ${nextStyle} ${nextOnClick}>
      <span style="text-align:center;width:150px;">Next</span>
    </span>
  </span>
</div>`;
}

function buildShareFeedbackDetailQuestionTextarea({ title }, index ) {
  return `<li>
  ${buildShareFeedbackDetailQuestionTitle({ title })}
  <div style="border:1px solid #e0e0e0;box-shadow:0 0 4px rgba(0,0,0,0.25);padding:20px;">
    <textarea name="${title}" rows="10" style="width:100%;font-size:16px;border:1px solid #d9dcde;box-sizing:border-box;border-radius:4px;padding:15px;" placeholder="Say something"></textarea>
    ${buildShareFeedbackDetailQuestionNavigation({ first: index === 0 })}
  </div>
</li>`;
}

function buildShareFeedbackDetailQuestionRange({ title }, index ) {
  return `<li>
  ${buildShareFeedbackDetailQuestionTitle({ title })}
  <div style="border:1px solid #e0e0e0;box-shadow:0 0 4px rgba(0,0,0,0.25);padding:20px;">
    <div style="font-weight:100;margin-bottom:40px;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <input name="${title}" type="range" min="1" max="10" style="width:100%;height:5em;" />
    ${buildShareFeedbackDetailQuestionNavigation({ first: index === 0 })}
  </div>
</li>`;
}

function buildShareFeedbackDetailQuestionRadioOption({ title, answer }) {
  return `<input id="${answer}" style="visibility:hidden;width:0;height:5px;" name="${title}" type="radio" value="${answer}" />
<label for="${answer}" style="display:block;">${answer}</label>`;
}

function buildShareFeedbackDetailQuestionRadio({ title, answers }, index ) {
  return `<li>
  ${buildShareFeedbackDetailQuestionTitle({ title })}
  <div style="border:1px solid #e0e0e0;box-shadow:0 0 4px rgba(0,0,0,0.25);padding:20px;">
    ${answers.options.map(({ answer }) => buildShareFeedbackDetailQuestionRadioOption({ title, answer })).join("")}
    ${buildShareFeedbackDetailQuestionNavigation({ first: index === 0 })}
  </div>
</li>`;
}

function buildShareFeedbackDetailQuestion({ fields, index }) {
  switch (fields.type) {
    case "textarea":
      return buildShareFeedbackDetailQuestionTextarea(fields, index);
    case "range":
      return buildShareFeedbackDetailQuestionRange(fields, index);
    case "radio":
      return buildShareFeedbackDetailQuestionRadio(fields, index);
  }
}

async function buildShareFeedbackDetail({ config, client }) {
  const questions = await client.getEntries({ content_type: "question" });
  const body = `<div style="padding-top:40px;">
  <div style="margin-bottom:30px;"><a href="/" style="font-size:12px;font-weight:600;color:#59636d;letter-spacing:2px;text-decoration:none;">&lt; BACK</a></div>
  <div id="loader">Loading...</div>
  <form id="form" onsubmit="saveFeedback(event)" style="display:none;">
    <ol id="questions" style="list-style-type:none;padding-inline-start:0;">
      ${questions.items.map((item, index) => buildShareFeedbackDetailQuestion({ fields: item.fields, index })).join("")}
      <li>
        <div id="review" style="margin-bottom:20px;"></div>
        ${buildShareFeedbackDetailQuestionNavigation({ last: true })}
      </li>
    </ol>
  </form>
  <script type="text/javascript">
    function reviewData() {
      const formElement = document.getElementById("form");
      const formData = new FormData(formElement);
      let feedback = [];
      formData.forEach((answer, question) => {
        feedback.push(
          '<div>' +
            '<h2 style="font-size:20px;font-weight:500;">' + question + '</h2>' +
            '<div style="font-weight:100;margin-bottom:30px;">' + answer + '</span>' +
          '</div>'
        );
      });
      console.log("reviewData", feedback);
      const reviewElement = document.getElementById("review");
      console.log("reviewData", reviewElement, reviewElement.innerHTML);
      reviewElement.innerHTML = feedback.join("");
      console.log("reviewData", reviewElement.innerHTML);
      console.log("/reviewData");
    }
    function previousQuestion(event) {
      const parentQuestionElement = event.target.closest("li");
      const previousQuestionElement = parentQuestionElement.previousElementSibling;
      parentQuestionElement.style.display = "none";
      previousQuestionElement.style.display = "block";
    }
    function nextQuestion(event) {
      const parentQuestionElement = event.target.closest("li");
      const nextQuestionElement = parentQuestionElement.nextElementSibling;
      reviewData();
      parentQuestionElement.style.display = "none";
      nextQuestionElement.style.display = "block";
    }
    </script>
  <script type="text/javascript">
   (function showQuestions() {
    const questionsContainerElement = document.getElementById("questions");
    const questionCollection = questionsContainerElement.getElementsByTagName("li");
    Array.prototype.forEach.call(
      questionCollection,
      (element, index) => {
        if (index !== 0) {
          element.style.display = "none";
        }
      }
    );
   })()
  </script>
  <script type="text/javascript">
    (async function getUser() {
      const userId = new URLSearchParams(window.location.search).get("userId");
      const client = contentfulManagement.createClient({
        accessToken: "CFPAT-b10c43cb0eca8d4c7f7fa92e8115119f6001abe028826b6fa859a907ebd31bba"
      });
      const space = await client.getSpace("${config.spaceId}");
      const environment = await space.getEnvironment("master");
      const userEntry = await environment.getEntry(userId);
      const userName = userEntry.fields.name["en-US"];
      const userNameCollection = document.getElementsByClassName("userName");
      Array.prototype.forEach.call(userNameCollection, (element) => { element.innerHTML = userName; });
      const imageId = userEntry.fields.image["en-US"].sys.id;
      const imageAsset = await environment.getAsset(imageId);
      const imageUrl = imageAsset.fields.file["en-US"].url;
      const userImageCollection = document.getElementsByClassName("userImage");
      Array.prototype.forEach.call(userImageCollection, (element) => { element.src = imageUrl; element.alt = userName; });
      const loader = document.getElementById("loader");
      loader.style.display = "none";
      const form = document.getElementById("form");
      form.style.display = "block";
    })()
  </script>
  <script type="text/javascript">
    async function saveFeedback(event) {
      event.preventDefault();
      const userId = new URLSearchParams(window.location.search).get("userId");
      const formData = new FormData(event.target);
      let feedback = [];
      formData.forEach((answer, question) => {
        feedback.push({ question, answer });
      });
      const client = contentfulManagement.createClient({
        accessToken: "CFPAT-b10c43cb0eca8d4c7f7fa92e8115119f6001abe028826b6fa859a907ebd31bba"
      });
      const space = await client.getSpace("${config.spaceId}");
      const environment = await space.getEnvironment("master");
      const feedbackEntry = await environment.createEntry(
        "feedback",
        {
          fields: {
            user: { "en-US": { sys: { type: "Link", linkType: "Entry", id: userId } } },
            complete: { "en-US": true },
            feedback: { "en-US": feedback }
          }
        }
      );
      await feedbackEntry.publish();
      window.location = "/";
    }
  </script>
</div>`;
  buildLayout({
    slug: "detail",
    title: "Share Feedback",
    body: body,
  });
}

async function main() {
  const contentful = require("contentful");
  fs.ensureDirSync(path.join("config"));
  const config = configure();
  const client = contentful.createClient({
    space: config.spaceId,
    accessToken: config.contentDeliveryAccessToken,
  });
  clear(); // clear the public directory
  await buildShareFeedbackList({ client });
  await buildShareFeedbackDetail({ config, client });
  console.log("OK");
  return true;
}

main();