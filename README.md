# BC Laws Search Tool - Backend

This is the backend API for the BC Laws Search Tool, which interacts with the CiviX API to search documents and uses OpenAI to summarize document content.

## Deployed at

The backend is deployed on Vercel:  
`https://bc-laws-search-tool-backend.vercel.app`

## Features

- **Search Documents**: Provides a search endpoint to query BC laws.
- **Summarize Documents**: Extracts text from the document using cheerio and summarizes it using OpenAI.

## Endpoints

### `/search`

Performs a search on the BC Laws website using the provided query and returns XML data.

- **Method**: `GET`
- **Parameters**:
  - `query`: The search term (required)
  - `start`: Start index for the search results (optional, default is 0)
  - `end`: End index for the search results (optional, default is 20)
  - `nFrag`: Number of fragments to retrieve (optional, default is 5)
  - `lFrag`: Length of fragments (optional, default is 100)

### `/summarize`

Summarizes a document by Civix ID and Document ID.

- **Method**: `GET`
- **Parameters**:
  - `civix_id`: The Civix ID of the document (required)
  - `doc_id`: The Document ID (required)

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/pratikmaniya/BCLawsSearchTool-Backend.git
   cd BCLawsSearchTool-Backend
   ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a .env file in the root directory and add your OpenAI API key:

    ```bash
    OPEN_API_KEY=your_openai_api_key
    ```

4. Install dependencies:

    ```bash
    npm install
    ```

## Technologies Used

- **Node.js**: Backend server
- **Express.js**: API routing
- **Axios**: For making HTTP requests
- **Cheerio**: For extracting text from HTML/XML
- **OpenAI API**: For generating summaries
- **Vercel**: Deployment platform

## Owner

Pratik Maniya (https://pratikmaniya.github.io/)