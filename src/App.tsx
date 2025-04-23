import { ThemeProvider } from '@/components/theme-provider';
import Layout from '@/components/Layout';
import '@/App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="emir-portfolio-theme">
      <Layout />
    </ThemeProvider>
  );
}

export default App;