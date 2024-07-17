import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import SignUp from './components/SignUp'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return <div><SignUp /></div>
}

export default App
