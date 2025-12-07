import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Play from './pages/Play';
import Learn from './pages/Learn';
import Puzzles from './pages/Puzzles';
import Tournaments from './pages/Tournaments';
import Rankings from './pages/Rankings';
import Community from './pages/Community';
import Profile from './pages/Profile';

const NotFound = () => <div className="text-center py-20"><h1 className="text-4xl font-bold text-red-500">404</h1><p>Checkmate! Page not found.</p></div>;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong.</h1>
          <p className="mb-4 text-gray-400">Please provide this error to the developer:</p>
          <pre className="bg-gray-900 p-4 rounded text-left overflow-auto max-w-full text-xs font-mono text-red-300">
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.error && this.state.error.stack}
          </pre>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-6 px-4 py-2 bg-neon-green text-black font-bold rounded hover:bg-green-400"
          >
            Go Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<Play />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/puzzles" element={<Puzzles />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
