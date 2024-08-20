import { FrappeProvider } from "frappe-react-sdk";
import Layout from "./component/Layout";
import { StoreProvider } from "./store";
import Grid from "./component/Grid";

export function sessionUser() {
  const cookies = new URLSearchParams(document.cookie.split("; ").join("&"));
  let _sessionUser = cookies.get("user_id");
  if (_sessionUser === "Guest") {
    _sessionUser = null;
  }
  return _sessionUser;
}

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <FrappeProvider>
          <Layout>
            <Grid />
          </Layout>
        </FrappeProvider>
      </StoreProvider>
    </div>
  );
}

export default App;
