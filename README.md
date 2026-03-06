# FloraID - AI Plant Identifier

An AI-powered web application that identifies plants from photos and provides detailed information including species, origin, and expert care instructions.

## Running Locally

### Prerequisites
- Node.js
- Git
- A Gemini API Key from Google AI Studio

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd floraid---ai-plant-identifier
   ```
   *(Note: Replace `<repository-url>` with the actual URL of this repository)*

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a file named `.env.local` in the root of the project and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Open your browser and navigate to the local URL provided in your terminal (usually `http://localhost:5173`).
