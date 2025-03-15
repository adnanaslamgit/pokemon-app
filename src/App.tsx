import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import PokemonDetails from "./pages/details/PokemonDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./components/notfound/NotFound";

const queryClient = new QueryClient();

type AppProps = {
  router?: React.ReactNode; // Allow custom router for tests
};

const App = ({ router }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {router || (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:name" element={<PokemonDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </QueryClientProvider>
  );
};

export default App;

