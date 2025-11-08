import { MantineProvider, type MantineThemeOverride } from "@mantine/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./styles/site.css";
import ScrollToTop from "@/components/marketing/ScrollToTop";
import CookieBar from "@/components/shared/CookieBar";
import { Footer } from "@/components/shared/Footer";
import Routes from "@/routes";

const App = () => {
  const theme: MantineThemeOverride = {
    colors: {
      "velo-blue": [
        "#00a8ff",
        "#00a8ff",
        "#00a8ff",
        "#00a8ff",
        "#00a8ff",
        "#00a8ff",
        "#00a8ff",
        "#00a8ff",
        "#00a8ff",
        "#00a8ff",
      ],
      "velo-green": [
        "#86bb2f",
        "#86bb2f",
        "#86bb2f",
        "#86bb2f",
        "#86bb2f",
        "#86bb2f",
        "#86bb2f",
        "#86bb2f",
        "#86bb2f",
        "#86bb2f",
      ],
    },
  };

  return (
    <HelmetProvider>
      <MantineProvider theme={theme}>
        <Router>
          <div className="App">
            <div className="container-fluid">
              <ScrollToTop>
                <CookieBar />
                {/* <BootstrapBreakpointVisualiser isVisible={import.meta.env.VITE_SHOW_RESPONSIVE_TOOL === 'true'}> */}
                <Routes />
                {/* </BootstrapBreakpointVisualiser> */}
              </ScrollToTop>
            </div>
            <Footer />
          </div>
        </Router>
      </MantineProvider>
    </HelmetProvider>
  );
};

export default App;
