# Clear Draft

<img src="./assets/Clear Draft.png">

## Summary

To streamline the writing of technical articles, this app integrates AI-generated improvements and advice, a Markdown editor, and direct posting to Qiita.
USAGE

## USAGE
1.Clone the project
```
git clone https://github.com/Kei-dev-1213/Clear-Draft-App.git
```
2.Move to the project directory
```
cd Clear-Draft-App
```
3.Execute the following code to create an .env file.
```
cp .env.example .env
```
4.Set the secrets in the .env file.

5.Install dependencies.
```
npm i
```
5.Launch the application
```
npm run dev
```
## Specification
### Using Clear Draft App

#### Introduction
Clear Draft is an app designed to streamline the process of creating and posting technical articles. This app leverages AI to improve and advise on article content, integrates a Markdown editor, and allows direct posting to Qiita.

#### Features of Clear Draft

1. **Article Editing Screen**
   - **Markdown Editor and Preview**: The left side of the screen is a Markdown editor for inputting article content, while the right side is a preview area. Edits on the left side are reflected in real-time on the right side.

2. **AI Inquiry Function**
   - **Seeking Advice**: Click the "Ask AI" button to open a modal where you can select the type of inquiry. Choose "Seek Article Advice" and click "Send" to request advice on the article's title, tags, and content. The AI's response will be displayed at the bottom of the screen.
   - **Other Inquiries**: Select "Other Inquiries" in the AI inquiry modal to input a custom question. The AI's response will be displayed in Markdown format.

3. **Article Saving Function**
   - **Save**: Click the "Save" button to save the article to the app's database (supabase). Saved items include the title, tags, content, and AI responses.

4. **Article Posting Function**
   - **Post**: Click the "Post" button to open a modal where you can select the visibility (public or limited sharing). Once posted, the article will be published on Qiita.

5. **Article List Screen**
   - **Article Management**: This screen lists all saved articles. You can toggle between displaying only unpublished drafts or all articles using the switch at the top right. From this screen, you can create new articles, edit existing ones, or delete them.

6. **New Article Creation**
   - **New Registration**: Click the "New Registration" button at the top right of the list screen to open the article editing screen with all fields blank.

7. **Article Editing**
   - **Edit**: Click the "Edit" button next to an article in the list to open the editing screen with the previously saved content.

8. **Article Deletion**
   - **Delete**: Click the "Delete" button next to an article in the list to open a confirmation dialog. Confirming will delete the article from the database and the list screen.

9. **Qiita API Key Management**
   - **API Key Registration**: This screen allows you to register your Qiita API key, which is encrypted with Bcrypt before being stored in the database.

### Step-by-Step Guide

1. **Creating an Article**
   - Open Clear Draft and navigate to the article editing screen.
   - Input your article content in the Markdown editor on the left and preview it on the right.

2. **Seeking AI Advice**
   - Click the "Ask AI" button and select "Seek Article Advice" from the modal.
   - Click "Send" to request advice and view the AI's response at the bottom of the screen.

3. **Saving an Article**
   - Click the "Save" button to save the article to the app's database.

4. **Posting an Article**
   - Click the "Post" button and select the visibility.
   - Once posted, the article will be published on Qiita.

5. **Managing Articles**
   - Use the article list screen to view, edit, or delete saved articles.

6. **Creating a New Article**
   - Click the "New Registration" button at the top right of the list screen to create a new article.

7. **Editing and Deleting Articles**
   - Click the "Edit" button next to an article to edit it.
   - Click the "Delete" button next to an article to delete it.

8. **Registering Qiita API Key**
   - Use the Qiita API key management screen to register your API key.

By following these steps, you can effectively use Clear Draft to streamline the process of creating and posting technical articles.
