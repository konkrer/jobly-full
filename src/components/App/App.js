import TokenContext from '../../utils/tokenContext';
import Navbar from '../Navbar/Navbar';
import Routes from '../../Routes';
import useLocalStorageState from '../../hooks/useLocalStorage';

import './App.css';

function App() {
  const [userData, setUserData] = useLocalStorageState('userData', {
    token: null,
    user: null,
  });

  return (
    <div className="App bg-light">
      <TokenContext.Provider value={{ userData, setUserData }}>
        <Navbar />
        <div className="container">
          <Routes />
        </div>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
