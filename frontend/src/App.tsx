import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import DetailProductPage from "./pages/DetailProductPage";
import CategoryPage from "./pages/CategoryPage";
import SearchByCategoryPage from "./pages/SearchByCategoryPage";
import CartPage from "./pages/CartPage";
import { PrivateRoutes, AdminPrivateRoutes } from "./components/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='product/:slug' element={<DetailProductPage />} />
          <Route path='categories' element={<CategoryPage />} />
          <Route path='category/:category' element={<SearchByCategoryPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path='cart' element={<CartPage />} />
          </Route>
          <Route path='admin' element={<AdminPrivateRoutes />}>
            <Route index element={<AdminPage />} />
            <Route path='new' element={<AddProductPage />} />
            <Route path='edit/:id' element={<EditProductPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
