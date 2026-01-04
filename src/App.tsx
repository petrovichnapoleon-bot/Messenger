import React from 'react';
import './App.css';

/**
 * App Component
 * 
 * Main application component for the Messenger application.
 * This component serves as the root of the application and orchestrates
 * the main layout and routing.
 */
const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Messenger</h1>
      </header>
      
      <main className="app-main">
        <section className="messenger-section">
          <p>Welcome to Messenger Application</p>
        </section>
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2026 Messenger App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
