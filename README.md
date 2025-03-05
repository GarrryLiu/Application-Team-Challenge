## **Deployment**

- **Frontend**: [Deployed on Vercel](https://app-challenge-private.vercel.app/)
- **Backend**: [Deployed on Render](https://app-challenge-private.onrender.com/)
- **Note**: Please start the backend (usually takes a little time) before loading the frontend.

## **Challenge & User Needs**

The system helps medical professionals **track and manage patient data** by providing:

- A **comprehensive patient list** with associated ICD codes.
- **Sorting and filtering** to organize patient information.
- A **detailed patient view** displaying ICD codes in both numerical format and plain English.

### **Users**

- **Doctors & Nurses**: Need to quickly locate and prioritize patients based on conditions, severity, and demographics to make informed treatment decisions.
- **Healthcare Administrators**: Require tools to categorize and analyze patient data for effective resource allocation.

## **Features & How They Achieve the Goal**

### **Sorting: Prioritizing Patients Efficiently**

Sorting allows doctors and administrators to **quickly focus on the most relevant patients** without manually scanning through long lists.

- **Sort by Name (A-Z / Z-A)**: Helps quickly locate a specific patient when searching by name.
- **Sort by ICD Code Count (Ascending/Descending)**: Ensures that **patients with multiple diagnoses receive immediate attention**, which is critical for handling complex cases efficiently.

By providing structured views, sorting **reduces time spent searching** and helps medical professionals make faster decisions.

### **Advanced Search: Quickly Finding the Right Patient**

A robust search system **eliminates manual filtering**, ensuring **immediate access to critical patient information**.

- **Search by Name** (full/partial match): Enables quick lookup when only part of a name is remembered.
- **Search by ICD Code (Single & Multiple Codes)**: Retrieves **all patients with one or multiple ICD codes**, enabling **condition-based patient grouping**.
- **Search by Disease Category (Full ICD-10 Standard Classification)**: Supports filtering by **any official ICD-10 category**, making it easier to identify relevant cases even when exact codes are unknown.
- **Search by Gender**: Helps identify gender-specific conditions.
- **Search by Age Range**: Prioritizes elderly patients who require specialized care.
- **Multi-Filter Search**: Ensures **precise patient segmentation**, allowing doctors to combine different filters.
- **Search & View History Preservation**:
  - **Remembers previous searches** so users can return without re-entering queries.
  - **Preserves scroll position and view state**: If a doctor clicks into a patient's file, the list remains at the same position when they return, preventing disorientation and **saving time in navigation**.

These search capabilities **reduce time-consuming manual processes**, allowing doctors to **focus on patient care rather than administrative tasks**.

### **User Interface & Data Presentation: Ensuring Clarity & Accessibility**

A well-structured UI is essential for **reducing cognitive load** when interacting with large datasets.

- **Scrollable Patient List & Pagination**: Provides **smooth navigation**, ensuring that large datasets remain manageable.
- **Detailed Patient Cards** (gender, age displayed directly): Eliminates extra clicks, allowing **quick decision-making**.
- **Scrollable ICD Code View**: Ensures that **patients with multiple conditions remain easy to review** without cluttering the interface.
- **Responsive Design**: Enables seamless **use across different devices**, ensuring accessibility for healthcare professionals in different environments.

By making patient data **visually intuitive and well-organized**, the UI allows medical professionals to **process information faster and with less effort**.

### **Smart Data Management: Reducing Repetitive Work & Improving Workflow**

Healthcare professionals often navigate back and forth between different pages. Smart data management ensures that **sorting, search settings, and navigation remain consistent**, preventing repetitive work.

- **State Management with `ParticipantContext`**: Keeps search and sorting states intact, reducing unnecessary API calls and reloading delays.
- **Persistent Search, Sorting & View State**:
  - Saves search queries and sorting preferences to **prevent redundant filtering**.
  - **Remembers scroll position & page state**: Ensures users can pick up where they left off, improving efficiency when reviewing large datasets.

By eliminating unnecessary **re-filtering, re-sorting, and re-scrolling**, smart data management **enhances efficiency and usability**, ensuring that patient management workflows remain smooth and intuitive.

### **Data Export: Enabling Offline Analysis & Future Extensions**

The system provides robust data export capabilities to support **offline analysis** and **reporting requirements**, while also laying the foundation for **future platform extensions**.

- **Export All Participants**: Allows healthcare administrators to download a complete dataset of all patients with their diagnoses.
- **Export Individual Patient**: Enables doctors to download specific patient records for offline review or sharing with specialists.
- **Smart File Naming**: Automatically generates filenames with relevant information:
  - Date of export (YYYY-MM-DD format)
  - Patient identifiers (for individual exports)
  - Clear labeling to distinguish between export types
- **Comprehensive Data Format**: Exports include:
  - Patient demographics (name, age, gender)
  - Complete ICD code listings
  - Plain-language condition names for each ICD code
  - Diagnosis timestamps

This export functionality not only **streamlines documentation workflows** but also **enables future platform extensions**:

- **API-Ready Architecture**: The export APIs (`exportAll` and `exportById`) are designed to be easily integrated with future dashboard components and analytics modules.
- **Extensible Data Format**: The structured JSON output provides a consistent data model that can be consumed by visualization tools and reporting systems.
- **Workflow Integration**: As a workflow tool, the system's export capabilities allow for seamless integration with other healthcare systems and data analysis platforms.

By implementing these flexible data export capabilities, the platform is well-positioned for future growth beyond its current functionality, supporting advanced analytics, custom dashboards, and integration with broader healthcare information systems.

## **Tech Stack**

### **Frontend**

- **Next.js 14** – Supports **server-side rendering (SSR)** and **client-side navigation**.
- **TypeScript** – Ensures **type safety** and better developer experience.
- **Material-UI (MUI)** – Provides **consistent UI components** for tables, buttons, and cards.
- **React Context API** – Manages **global state efficiently**.

### **Backend**

- **tRPC** – Enables **type-safe API communication** between frontend and backend.
- **Zod** – Ensures **API input validation** and **data integrity**.
- **Express** – Handles **API requests and routing**.
- **Axios** – Fetches **ICD code details** from the **Clinical Table Search Service API**.

### **State Management & Data Handling**

- **URL Parameter Synchronization** – Maintains **filters, sorting, and pagination** in the URL.
- **State Persistence** – Preserves **user preferences** for filters and sorting.
- **Data Caching** – Uses **React Query** to **minimize redundant API calls**.
- **JSON Export** – Provides standardized data export in JSON format for offline analysis.

## Installation & Running Instructions

To install and run the project, follow these steps:

1. Set up environment variables:

   - For local development, create the following environment files:
   - In the `api` folder, create a `.env` file for local backend:

     ```
     # Environment
     NODE_ENV=development

     # Port for the server to listen on
     PORT=8080

     # Frontend URL for CORS (local frontend)
     FRONTEND_URL=http://localhost:3000
     ```

   - In the `frontend` folder, create a `.env.local` file:
     ```
     # API URL for tRPC (local backend)
     NEXT_PUBLIC_API_URL=http://localhost:8080/trpc
     ```

2. Install dependencies for all parts of the project:

   ```bash
   # Install root dependencies
   npm install

   # Install API dependencies
   cd api && npm install

   # Install frontend dependencies
   cd frontend && npm install

   # Install shared folder dependencies
   cd shared && npm install
   ```

3. Start the API server:

   ```bash
   cd api
   npm start
   ```

4. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

5. Open your browser and visit **http://localhost:3000**.

   - If port `3000` is occupied, Next.js will automatically suggest using another port.
   - You can manually set a different port by running: `npm run dev -- --port=3001`.

## Technical Notes

- The original JavaScript files (`data.js`, `index.js`, and `app.js`) were converted to TypeScript for better type safety and to fully leverage tRPC's end-to-end type checking capabilities.
- The implementation generally follows the provided Figma design, but some adjustments were made based on comprehensive judgment as features were added.
