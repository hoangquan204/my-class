import logo from './logo.svg';
import './App.css';
import Router from './routers'
import Notification from './components/Notification'
// import customTheme from './theme/customTheme'
import { ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { getThemeSelector } from './redux/selector';
import { createTheme } from '@mui/material';

function App() {
  const theme = useSelector(getThemeSelector)
  return <div className={`bg-[${theme.palette.containerColor.main}]`}>
    <ThemeProvider theme={createTheme(theme)}>
      <Router>
      </Router>
    </ThemeProvider>
  </div>
}

export default App;
