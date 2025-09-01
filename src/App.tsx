import { BrowserRouter as Router } from "react-router-dom";
import { useDarkMode } from "./hooks/useDarkMode";
import { useInitialLoader } from "./hooks/useInitialLoader";
import { useAuth } from "./contexts/AuthContext";
import AppRouter from "./components/AppRouter";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  // Initialize dark mode
  useDarkMode();
  // Initialize loader
  useInitialLoader();
  // Get authentication state
  const { user } = useAuth();
  const currentUserRole = user?.role || "USER";

  return (
    <>
      <Router>
        <div className="min-h-screen bg-white dark:bg-primary-navy transition-colors duration-300">
          {/* <Navbar /> */}
          <main className="relative">
            <AppRouter currentUserRole={currentUserRole} />
          </main>
          {/* <Footer /> */}
        </div>
      </Router>
    </>
  );
}

export default App;
