import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { UploadForm } from './components/UploadForm';
import { HelpPage } from './pages/HelpPage';

export default function App() {
  const API_URL = import.meta.env.VITE_BACKEND_URI + '/api/v1/document-generator';

  return (
      <BrowserRouter>
        <div style={styles.appContainer}>
          <nav style={styles.navbar}>
            <div style={styles.navBrand}>Document AI</div>
            <div style={styles.navLinks}>
              <Link to="/" style={styles.link}>Digitalizar</Link>
              <Link to="/help" style={styles.link}>Ayuda</Link>
            </div>
          </nav>

          <main style={styles.mainContent}>
            <Routes>
              <Route path="/" element={<UploadForm apiBaseUrl={API_URL} />} />
              <Route path="/help" element={<HelpPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#f8fafc',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    width: '100%',
  },
  navBrand: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
  },
  link: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '15px',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px 16px',
    width: '100%',
  },
};