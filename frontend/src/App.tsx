import { FrappeProvider } from 'frappe-react-sdk'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import "cal-sans";
import { Toaster } from 'sonner'
import { useStickyState } from './hooks/useStickyState'
import { UserProvider } from './utils/auth/UserProvider';
import { ProtectedRoute } from './utils/auth/ProtectedRoute';
import { ThemeProvider } from './ThemeProvider';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<MainPage />}>
        </Route>
      </Route>
    </>
  ), {
  basename: `/pricelist`,
}
)
function App() {

  const [appearance, setAppearance] = useStickyState<'light' | 'dark'>('dark', 'appearance');

  const toggleTheme = () => {
    setAppearance(appearance === 'dark' ? 'light' : 'dark');
  };

  // We need to pass sitename only if the Frappe version is v15 or above.

  const getSiteName = () => {
    // @ts-ignore
    if (window.frappe?.boot?.versions?.frappe && (window.frappe.boot.versions.frappe.startsWith('15') || window.frappe.boot.versions.frappe.startsWith('16'))) {
      // @ts-ignore
      return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME
    }
    return import.meta.env.VITE_SITE_NAME

  }

  return (
    <FrappeProvider
      url={import.meta.env.VITE_FRAPPE_PATH ?? ''}
      socketPort={import.meta.env.VITE_SOCKET_PORT ? import.meta.env.VITE_SOCKET_PORT : 9000}
      //@ts-ignore
      swrConfig={{
        provider: localStorageProvider
      }}
      siteName={getSiteName()}
    >
      <UserProvider>
        <Toaster richColors />
        <ThemeProvider
          appearance={appearance}
          // grayColor='slate'
          accentColor='iris'
          panelBackground='translucent'
          toggleTheme={toggleTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </UserProvider>
    </FrappeProvider>
  )
}

function localStorageProvider() {
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map<string, any>(JSON.parse(localStorage.getItem('app-cache') || '[]'))

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })

  // We still use the map for write & read for performance.
  return map
}

export default App