# Campaign Management Web Application

This project is a Campaign Management Web Application built with React and TypeScript. It allows users to create, run, stop, and list campaigns with various attributes and functionalities.

## Features

- **Create Campaigns**: Users can create new campaigns by providing a title, landing page URL, and payouts.
- **List Campaigns**: The application displays a list of all campaigns with options to filter by title, landing page URL, and running status.
- **Run/Stop Campaigns**: Users can start or stop campaigns directly from the campaign list.
- **View Campaign Details**: Users can view detailed information about each campaign, including the ability to edit or delete campaigns.

## Project Structure

```
campaign-management-app
├── public
│   ├── index.html          # Main HTML file
├── src
│   ├── components          # Contains reusable components
│   │   ├── CampaignList.tsx
│   │   ├── CampaignForm.tsx
│   │   └── CampaignItem.tsx
│   ├── pages               # Contains page components
│   │   ├── HomePage.tsx
│   │   ├── CreateCampaignPage.tsx
│   │   └── CampaignDetailsPage.tsx
│   ├── services            # Contains API service functions
│   │   └── campaignService.ts
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Entry point of the application
│   ├── index.css           # Global styles
│   └── vite-env.d.ts       # TypeScript definitions for Vite
├── .gitignore              # Files to ignore in version control
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # TypeScript config for application code
├── tsconfig.node.json      # TypeScript config for Node.js
└── vite.config.ts          # Vite configuration
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd campaign-management-app
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the application.

5. **Run tests**:
   ```
   npm test
   ```

6. **Run linting**:
   ```
   npm run lint
   ```

## Usage

- Navigate to the home page to view the list of campaigns.
- Click on "Create Campaign" to add a new campaign.
- Use the search functionality to filter campaigns.
- Click on a campaign to view its details or to edit/delete it.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.