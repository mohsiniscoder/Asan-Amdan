import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavbarComponents/Navbar';
import HomePage from './Pages/HomePage';
import { links } from './data/links';
import { buttons } from './data/links';
import SignUp from './components/AuthenticationComponents/UserSignUp';
import SignIn from './components/AuthenticationComponents/UserSignIn';
// import CreateGig from './components/GigComponents/MakeGig';
// import GigDetail from './components/GigComponents/GigDetails';
import ServiceProviderForm from './components/AuthenticationComponents/ServiceProviderSignUp';
import AdminDashboard from './components/Dashboards/AdminDashboard';
import ServiceProviderDashboard from './components/Dashboards/ServiceProviderDashboard';
import CreateGig from './components/ServiceProvider/CreateGig';
import GigDetailPage from './components/GigComponents/GigDetailPage';
import UpdateGig from './components/ServiceProvider/UpdateGigComponent';
import PurchaseGigPage from './components/GigComponents/PurchaseGigPage';
import ClientDashboard from './components/Dashboards/ClientDashboard';
import { useServiceProviderAuth } from './Contexts/serviceProviderContexts';
import { useAuth } from './Contexts/userContexts';
const App = () => {

  const { userAuth, setUserAuth } = useAuth();
  const { serviceProviderAuth, setServiceProviderAuth } = useServiceProviderAuth();



  return (
    <>
      {/* Navbar */}
      <Navbar
        logoText="Asan Rozgar"
        logoHref="/"
        links={links}
        buttons={buttons}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        {/* <Route path="/gig/:id" element={<GigDetail />} /> */}
        <Route path="/provide-service" element={<ServiceProviderForm />} />
        <Route path="/gig/:gigId" element={<GigDetailPage />} />

        {/* authenticating service provider */}
        {serviceProviderAuth?.token ?
          <>
            <Route path="/service-provider-dashboard" element={<ServiceProviderDashboard />} />
            <Route path="/Gig/UpdateGig/:id" element={<UpdateGig />} />
            <Route path="/Gig/addGig" element={<CreateGig />} />

          </>
          : ''}

        {/* //authenticating user */}

        {userAuth?.token ?
          <>
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/purchase/:gigId" element={<PurchaseGigPage />} />
          </>
          : ""
        }

        {/* authenticating admin */}
        {userAuth?.user?.isAdmin === true ?
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

          </>
          : ""}
      </Routes>
    </>
  );
};

export default App;
