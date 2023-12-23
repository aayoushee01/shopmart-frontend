import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDescriptionPage from './components/ProductDescriptionPage';
import CartView from './components/CartView';
import NavBar from './components/NavBar';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/product/:productId" element={<ProductDescriptionPage />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
