# React Vite Project

This is a React project bootstrapped with [Vite](https://vitejs.dev/), a fast and modern build tool. The project serves as a template for building scalable and efficient React applications.

---

## Features

- ⚡ **Vite:** Super fast build and development environment.
- 🖼️ **React 18:** Modern React features with concurrent rendering.
- 🛠️ **ES Modules:** Native support for ES6+ modules.
- 🔥 **Hot Module Replacement (HMR):** Instant updates during development.
- 💅 **Customizable:** Add plugins and configurations as needed.

---

## Prerequisites

Make sure you have the following installed:

- **Node.js**: [Download here](https://nodejs.org/)
- **npm or yarn**: Comes with Node.js installation.

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abishake01/EventExplorer.AI.git
   cd EventExplorer.AI

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install

3. **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev

4. Open the app in your browser at http://localhost:5173

<a href="https://www.youtube.com/watch?v=EzzcEL_1o9o"> Video Tutorial</a>

## Key features and Functionalities

1. **3D Avatar Interaction:**

A 3D avatar is integrated using @react-three/fiber and @react-three/drei.
The avatar supports facial expressions, lip-syncing, and animations.
Facial expressions (e.g., smile, sad, angry) are dynamically applied based on the message context.

2. **Chat Functionality:**

A chat system is implemented using a custom useChat hook.
Messages are sent to a backend API (https://virtual-gf-py.vercel.app/chat) and responses are displayed.
Messages are processed in a queue, and the avatar speaks the responses using Speech Synthesis.

3. **Speech Synthesis:**

The avatar speaks messages using the Web Speech API.
Lip-syncing is implemented by randomly selecting visemes (mouth shapes) during speech.

4. **Voice Input:**

Users can input messages via voice using the Web Speech Recognition API.
The microphone button activates voice input, and the recognized text is sent as a message.

5. **Camera Controls:**

The camera can zoom in and out using a toggle button.
Camera positions are controlled using CameraControls from @react-three/drei.

6. **Green Screen Mode:**

A green screen mode can be toggled on/off, changing the background to green for chroma keying.

7. **Loading Indicators:**

A loading animation (dots) is displayed while waiting for a response from the backend.

## Technologies Used

1. **React:**

JavaScript library for building the user interface.
Version: React 18.

2. **Vite:**

Build tool for fast development and production builds.
Used for bundling and optimizing the project.

3. **Tailwind CSS:**

Utility-first CSS framework for styling the UI.
Provides responsive and modern design.

4. **React Three Fiber:**

React renderer for Three.js, used for 3D rendering.
Version: @react-three/fiber 8.13.3.

5. **React Three Drei:**

Helper library for React Three Fiber.
Provides components like CameraControls, Environment, and Text.
Version: @react-three/drei 9.75.0.

6. **Three.js:**

3D library for rendering and animating 3D objects.
Version: three 0.153.0.
 