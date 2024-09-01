import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // TODO: Enable on staging.
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);