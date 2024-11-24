## PDF text extractor

### BLUF

    This is a simple fullstack app, build as a toy to cover basic web interface interaction for a user that want's to extract and persist the data from pdf files.

### Setup

All of the files for local envirionment stored in a github repo available at the following link: [Pdf Extractor](https://github.com/AndriyPolukhin/pdf_extractor_prod) The deployed app is placed on [Render](https://render.com/) and can be accessed via the following link [ live website](https://pdf-extractor-prod.onrender.com/)

There should be an .env file with the following variables populated:

```js
ACCESS_TOKEN_SECRET=""
REFRESH_TOKEN_SECRET=""
PORT=5000
MONGO_URI=YOUR_MONGO_URI
NODE_ENV=development

Token can be generated with the following command in plain node.js REPL :
require('crypto').randomBytes(64).toString('hex')
```

### Run

```bash
Use the following comamnds to run the envirionment on a local machine:
npm run start - for node server
npm run server - for  nodemon server
npm run client - to run the client side
npm run dev - to concurrently run client and the server
npm run install:dep - to install dependencies for client and the server
```

### Basic UI onboarding

1. User Authentication Registration form with email and password validation.

    - Login form with session handling.
    - Logout functionality to securely end the user session.
    - User Profile Management

2. Profile page displaying user details (name, email).

    - Editable form for updating profile information (name, email, password).
    - Delete account button to remove the user profile from the system.
    - File Upload and Display

3. Upload form to select and upload PDF files.

    - Display a list of uploaded files in an accordion-style component for easy navigation.
    - Each accordion item shows the filename and expands to display the file content.
    - File Viewing

4. File content view displaying extracted text from the PDF in a clean, readable format.

    - Content split into paragraphs using custom delimiters for better formatting.
    - Inline File Actions

5. Buttons within the file header for actions such as:
    - Delete: Remove the file from the user's list.
    - Rate: Assign a rating to the file.
    - Copy: Copy file content to the clipboard for easy pasting.

### User Stories covered

1. User Profile Management As a user, I want to be able to view my profile details so that I can verify my personal information. As a user, I want to update my profile details (name, email, and password) so that my account reflects current information. As a user, I want to delete my account so that my data is removed from the system.

2. User Authentication As a user, I want to register an account with a secure and validated email and password so that I can log in later. As a user, I want to log in to my account so that I can access protected areas of the application. As a user, I want the application to securely store cookies containing session tokens so that I can stay logged in.

3. File Upload and Management As a user, I want to upload PDF files so that I can store and manage my documents. As a user, I want to view a list of all the PDF files I have uploaded so that I can access them easily. As a user, I want to delete a specific file so that I can manage my document storage.

4. File Viewing and Content Extraction As a user, I want to view the content of a specific file so that I can read its details. As a user, I want the text of a file to be formatted properly with paragraphs split based on various delimiters such as periods, special characters, and list patterns. As a user, I want to handle text that may include repeating characters or special formats without disruptions. As a user, I want to make sure my profile and files are updated in real-time after an action like upload or delete so that I always see the most current information.

5. Accordion-Based File Navigation As a user, I want to see an accordion-based interface listing all my files so that I can expand and view the content of each file in a structured manner. As a user, I want a smooth animation when I expand or collapse the file content so that the interface feels seamless.

6. Inline File Actions As a user, I want to see action buttons (delete, rate, copy content) inline with the file header so that I can manage and use the file without scrolling away. As a user, I want to copy the content of a file to the clipboard so that I can paste it anywhere as needed.

7. Security and Privacy As a user, I want my profile and document actions to be secure so that my data is protected. As a developer, I want the application to handle cookies securely using HTTPS and the appropriate flags (Secure, SameSite, etc.) so that the user sessions are protected.

8. Error Handling and Feedback As a user, I want to see meaningful error messages when a process fails so that I understand what went wrong. As a user, I want to see a loading spinner or message when data is being fetched so that I know the process is in progress.

9. Deployment and Environment Configuration As a developer, I want the app to be easily deployable on platforms like Render or Netlify so that it can be hosted with minimal configuration. As a developer, I want to configure environment variables properly to ensure secure access to services in production and development.

10. Client-Server Communication As a developer, I want the client to properly fetch and receive responses from the server, including cookies, so that user sessions work as expected.

---
