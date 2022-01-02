import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Account from "./Components/Account";
import Dash from "./Components/Dash";

function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>Website Up Checker</h1>

          <section id="navigation">
            <a href="/">Home</a>
            <a href="/dash">Dashboard</a>
          </section>
          <Account />
        </Col>
      </Row>

      {/* create routes here */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" component={Account} />
          <Route path="/dash" component={Dash} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
