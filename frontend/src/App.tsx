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
import UserProfilePage from "./pages/UserProfilePage";
import CartPage from "./pages/CartPage";
import { PrivateRoutes, AdminPrivateRoutes } from "./components/PrivateRoutes";
import OrderDetailPage from "./pages/OrderDetailPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='login' element={<LoginPage />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='product/:slug' element={<DetailProductPage />} />
          <Route path='categories' element={<CategoryPage />} />
          <Route path='category/:category' element={<SearchByCategoryPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path='cart' element={<CartPage />} />
            <Route path='profile' element={<UserProfilePage />} />
            <Route path='order/:id' element={<OrderDetailPage />} />
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
