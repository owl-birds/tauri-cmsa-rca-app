import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Pages from "./components/pages/";
import Cmsa from "./components/cmsa/cmsa";
import OneLevel from "./components/one-level-decom/";
import TwoLevel from "./components/two-level-decom/";
import ThreeLevel from "./components/three-level-decom/";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Pages />}>
          <Route path="/cmsa" element={<Cmsa />} />
          <Route path="/cmsa/one-level" element={<OneLevel />} />
          <Route path="/cmsa/two-level" element={<TwoLevel />} />
          <Route path="/cmsa/three-level" element={<ThreeLevel />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
