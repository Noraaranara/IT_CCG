import { useEffect } from "react";
import Home from "./pages/home"

function App() {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW registered'))
        .catch((err) => console.log('SW error', err));
    }
  }, []);

  return <Home />;
}

export default App
