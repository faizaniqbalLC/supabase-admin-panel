# Supabase Admin Panel with React

This is an **Admin Panel** application built with **React** and **Supabase**. It allows administrators to manage content stored in a Supabase database. The app enables viewing, editing, and deleting content.

## Features

- **View Content**: Displays the current content stored in the Supabase database.
- **Edit Content**: Modify the title and description of the content.
- **Delete Content**: Remove the content from the database.
- **Real-time Updates**: The content automatically refreshes after any changes are made.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Supabase**: Backend-as-a-Service for managing the database.
- **Material UI**: UI component library for React.
- **Vite**: Build tool for fast development.
- **SUPABASE**: Database for storing content.

## Setup

Follow these steps to set up the project locally.

### 1. Clone the repository

Clone this repository to your local machine:

```bash
git clone https://github.com/faizaniqbalLC/supabase-admin-panel.git
cd supabase-admin-panel
```
## 2. Install dependencies
Install the required dependencies using npm:
```bash
npm install
```
## 3. Set up Supabase
Go to Supabase and create a new project.
Set up your database by creating a content table with the following columns:

id (Integer, Primary Key, Auto-increment)
title (Text)
description (Text)
titleUpdatedAt (Timestamp)
descriptionUpdatedAt (Timestamp)

Copy your Supabase URL and anon key from the project settings.

## 4. Configure Supabase Client
In your project folder, create a new file named src/supabase-client.js and paste the following configuration:

import { createClient } from '@supabase/supabase-js';
// Initialize Supabase client with your credentials
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-public-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

Replace your-project-id and your-public-anon-key with your actual Supabase credentials.

## 5. Run the Application
Start the development server with:
```bash
npm run dev
```
Visit http://localhost:5173 in your browser to see the Admin Panel in action.

### Usage

View Content: The current content stored in the Supabase database will be displayed in the right section of the panel.

Edit Content: Click the "Edit" button to edit the title and description of the current content.

Save Changes: After editing, click the "Save Changes" button to update the content in the database.

Delete Content: Click the "Delete" button to remove the content from the database. This will prompt a confirmation before deleting the content.

No Content Available: If no content exists in the database, a "No Content Available" message will be displayed in the panel.
