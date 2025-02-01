import './App.css';
import React from "react";
import {MainPage} from "./components/pages/MainPage";
import {SignUpPage} from "./components/pages/SignUpPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MyBagPage} from "./components/pages/MyBagPage";
import {CheckoutPage} from "./components/pages/CheckoutPage";
import {ProductPage} from "./components/pages/ProductPage";
import {PaymentPage} from "./components/pages/PaymentPage";
import {ForgotPassword} from "./components/login/ForgotPassword";
import {ResetPassword} from "./components/login/ResetPassword";
import {ThankYou} from "./components/checkout/ThankYou";

function App() {

    return (
      <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/product/:productId' element={<ProductPage/>}/>
            <Route path='/account/signup' element={<SignUpPage/>}/>
            <Route path='/account/forgot-password' element={<ForgotPassword/>}/>
            {/* pass the reset token into the params */}
            <Route path='/account/reset-password/:resetToken' element={<ResetPassword/>}/>
            <Route path='/shop/mybag' element={<MyBagPage/>}/>
            <Route path='/shop/checkout' element={<CheckoutPage/>}/>
            <Route path='/shop/checkout/payment' element={<PaymentPage/>}/>
            <Route path='/shop/checkout/thankyou' element={<ThankYou/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
