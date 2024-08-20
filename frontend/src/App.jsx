import { FrappeProvider } from "frappe-react-sdk";
import { StoreProvider } from "./store";
import ListVarients from "./component/ListVarients";
import Sidebar from "./component/Sidebar";

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
        <FrappeProvider enableSocket={false}>
          <Sidebar />
        </FrappeProvider>
        <FrappeProvider enableSocket={false}>
          <ListVarients />
        </FrappeProvider>
      </StoreProvider>
    </div>
  );
}

export default App;
