import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ModelIntegrations from './components/ModelIntegrations';
import ModelDetail from './pages/ModelDetail';
import ComponentLibrary from './pages/ComponentLibrary';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <ModelIntegrations />
            </>
          } />
          <Route path="/model/:modelId" element={<ModelDetail />} />
          <Route path="/components" element={<ComponentLibrary />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
