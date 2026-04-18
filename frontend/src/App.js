import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Auth from './pages/Auth';
import SearchResults from './pages/SearchResults';
import PropertyDetail from './pages/PropertyDetail';
import CreateProperty from './pages/CreateProperty';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<SearchResults />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route
                path="/create-property"
                element={
                  <ProtectedRoute>
                    <CreateProperty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;