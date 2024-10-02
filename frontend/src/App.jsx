import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Adminpanel/Pages/Dashboard'
import GuestUser from './Adminpanel/Pages/GuestUser/GuestUser'
import AddGuest from './Adminpanel/Pages/GuestUser/addGuest'
import EditGuest from './Adminpanel/Pages/GuestUser/editGuest'
import AdminUser from './Adminpanel/Pages/AdminUser/AdminUser'
import EditAdmin from './Adminpanel/Pages/AdminUser/EditAdmin'
import ManagerUser from './Adminpanel/Pages/ManagerUser/ManagerUser'
import EditManager from './Adminpanel/Pages/ManagerUser/EditManager'
import HousekeepingUser from './Adminpanel/Pages/HousekeepingUser/HousekeepingUser'
import EditHousekeeping from './Adminpanel/Pages/HousekeepingUser/EditHousekeeping'
import Rooms from './Adminpanel/Pages/rooms/Rooms'
import AddRoom from './Adminpanel/Pages/rooms/AddRoom'
import EditRoom from './Adminpanel/Pages/rooms/EditRoom'
import Booking from './Adminpanel/Pages/Booking/Booking'
import AddBooking from './Adminpanel/Pages/Booking/AddBooking'
import EditBooking from './Adminpanel/Pages/Booking/EditBooking'
import Payment from './Adminpanel/Pages/Payment/Payement'
import AddPayment from './Adminpanel/Pages/Payment/AddPayment'
import EditPayment from './Adminpanel/Pages/Payment/EditPayment'
import MaintenanceRequest from './Adminpanel/Pages/MaintainanceRequest/MaintainanceRequest'
import AddMaintainanceRequest from './Adminpanel/Pages/MaintainanceRequest/AddMaintainanceRequest'
import EditMaintainanceRequest from './Adminpanel/Pages/MaintainanceRequest/EditMaintainanceRequest'
import Housekeeping from './Adminpanel/Pages/HouseKeeping/Housekeeping'
import AddHousekeeping from './Adminpanel/Pages/HouseKeeping/AddHousekeeping'
import EditHousekeepingrec from './Adminpanel/Pages/HouseKeeping/EditHousekeepingrec'

// manager dashboard import
import ManagerDashboard from './Managerpanel/Pages/ManagerDashboard'
import MGuestUser from './Managerpanel/Pages/GuestUser/MGuestUser'
import MAddGuest from './Managerpanel/Pages/GuestUser/MAddGuest'
import MeditGuest from './Managerpanel/Pages/GuestUser/MeditGuest'
import MHousekeepingUser from './Managerpanel/Pages/HousekeepingUser/MHousekeepingUser'
import MEditHousekeeping from './Managerpanel/Pages/HousekeepingUser/MEditHousekeeping'
import MRooms from './Managerpanel/Pages/rooms/MRooms'
import MAddRoom from './Managerpanel/Pages/rooms/MAddRoom'
import MEditRoom from './Managerpanel/Pages/rooms/MEditRoom'
import MBooking from './Managerpanel/Pages/Booking/MBooking'
import MAddBooking from './Managerpanel/Pages/Booking/MAddBooking'
import MEditBooking from './Managerpanel/Pages/Booking/MEditBooking'
import MPayement from './Managerpanel/Pages/Payment/MPayement'
import MAddPayment from './Managerpanel/Pages/Payment/MAddPayment'
import MEditPayment from './Managerpanel/Pages/Payment/MEditPayment'
import MMaintainanceRequest from './Managerpanel/Pages/MaintainanceRequest/MMaintainanceRequest'
import MAddMaintainanceRequest from './Managerpanel/Pages/MaintainanceRequest/MAddMaintainanceRequest'
import MEditMaintainanceRequest from './Managerpanel/Pages/MaintainanceRequest/MEditMaintainanceRequest'
import MHousekeeping from './Managerpanel/Pages/HouseKeeping/MHousekeeping'
import MAddHousekeeping from './Managerpanel/Pages/HouseKeeping/MAddHousekeeping'
import MEditHousekeepingrec from './Managerpanel/Pages/HouseKeeping/MEditHousekeepingrec'


// Housekeeping imports
import HDashboard from './Housekeepingpanel/Pages/HDashboard'
import HRooms from './Housekeepingpanel/Pages/rooms/HRooms'
import HEditRoom from './Housekeepingpanel/Pages/rooms/HEditRoom'
import HMaintainanceRequest from './Housekeepingpanel/Pages/MaintainanceRequest/HMaintainanceRequest'
import HAddMaintainanceRequest from './Housekeepingpanel/Pages/MaintainanceRequest/HAddMaintainanceRequest'
import HEditMaintainanceRequest from './Housekeepingpanel/Pages/MaintainanceRequest/HEditMaintainanceRequest'
import HHousekeeping from './Housekeepingpanel/Pages/HouseKeeping/HHousekeeping'
import HAddHousekeeping from './Housekeepingpanel/Pages/HouseKeeping/HAddHousekeeping'
import HEditHousekeepingrec from './Housekeepingpanel/Pages/HouseKeeping/HEditHousekeepingrec'
import Login from './publicPage/Login'
import Profile from './publicPage/Profile'






const App = () => {
  return (
    <BrowserRouter>
      <Routes>



      <Route path='/' element={<Login />} />
      <Route path='/profile' element={<Profile />} />



        {/* Admin Panel */}

        {/* Dashboard Routing */}
        <Route path='/Dashboard' element={<Dashboard />} />

        {/* GuestUser Routing*/}
        <Route path='/GuestUser' element={<GuestUser />} />
        <Route path='/addGuest' element={<AddGuest />} />
        <Route path='/editGuest/:id' element={<EditGuest />} />
        {/* AdminUser Routing*/}
        <Route path='/AdminUser' element={<AdminUser />} />
        <Route path='/EditAdmin/:id' element={<EditAdmin />} />
        {/* ManagerUser Routing*/}
        <Route path='/ManagerUser' element={<ManagerUser />} />
        <Route path='/EditManager/:id' element={<EditManager />} />
        {/* HousekeepingUser Routing*/}
        <Route path='/HousekeepingUser' element={<HousekeepingUser />} />
        <Route path='/EditHousekeeping/:id' element={<EditHousekeeping />} />

        {/* Rooms Routing */}
        <Route path='/Room' element={<Rooms />} />
        <Route path='/addRoom' element={<AddRoom />} />
        <Route path='/EditRoom/:id' element={<EditRoom />} />

        {/* Booking Routing */}
        <Route path='/Booking' element={<Booking />} />
        <Route path='/AddBooking' element={<AddBooking />} />
        <Route path='/EditBooking/:id' element={<EditBooking />} />

        {/* Payment Routing */}
        <Route path='/Payment' element={<Payment />} />
        <Route path='/AddPayment' element={<AddPayment />} />
        <Route path='/EditPayment/:id' element={<EditPayment />} />

        {/* Maintanance Routing */}
        <Route path='/MaintainanceRequest' element={<MaintenanceRequest />} />
        <Route path='/AddMaintainanceRequest' element={<AddMaintainanceRequest />} />
        <Route path='/EditMaintainanceRequest/:id' element={<EditMaintainanceRequest />} />

        {/* Housekeeping Routing */}
        <Route path='/Housekeeping' element={<Housekeeping />} />
        <Route path='/AddHousekeeping' element={<AddHousekeeping />} />
        <Route path='/EditHousekeepingrec/:id' element={<EditHousekeepingrec />} />







        {/* Manager Panel */}
        {/* Dashboard Routing */}
        <Route path='/Managerdashboard' element={<ManagerDashboard />} />

        {/* GuestUser Routing*/}
        <Route path='/MGuestUser' element={<MGuestUser />} />
        <Route path='/MaddGuest' element={<MAddGuest />} />
        <Route path='/MeditGuest/:id' element={<MeditGuest />} />
    
        {/* HousekeepingUser Routing*/}
        <Route path='/MHousekeepingUser' element={<MHousekeepingUser />} />
        <Route path='/MEditHousekeeping/:id' element={<MEditHousekeeping />} />

        {/* Rooms Routing */}
        <Route path='/MRoom' element={<MRooms />} />
        <Route path='/MaddRoom' element={<MAddRoom />} />
        <Route path='/MEditRoom/:id' element={<MEditRoom />} />

        {/* Booking Routing */}
        <Route path='/MBooking' element={<MBooking />} />
        <Route path='/MAddBooking' element={<MAddBooking />} />
        <Route path='/MEditBooking/:id' element={<MEditBooking />} />

        {/* Payment Routing */}
        <Route path='/MPayment' element={<MPayement />} />
        <Route path='/MAddPayment' element={<MAddPayment />} />
        <Route path='/MEditPayment/:id' element={<MEditPayment />} />

        {/* Maintanance Routing */}
        <Route path='/MMaintainanceRequest' element={<MMaintainanceRequest />} />
        <Route path='/MAddMaintainanceRequest' element={<MAddMaintainanceRequest />} />
        <Route path='/MEditMaintainanceRequest/:id' element={<MEditMaintainanceRequest />} />

        {/* Housekeeping Routing */}
        <Route path='/MHousekeeping' element={<MHousekeeping />} />
        <Route path='/MAddHousekeeping' element={<MAddHousekeeping />} />
        <Route path='/MEditHousekeepingrec/:id' element={<MEditHousekeepingrec />} />





  {/* Housekeeping Panel */}
        {/* Dashboard Routing */}
        <Route path='/Housekeepingdashboard' element={<HDashboard />} />

        {/* Rooms Routing */}
        <Route path='/HRoom' element={<HRooms />} />
        <Route path='/HEditRoom/:id' element={<HEditRoom />} />

        {/* Maintanance Routing */}
        <Route path='/HMaintainanceRequest' element={<HMaintainanceRequest />} />
        <Route path='/HAddMaintainanceRequest' element={<HAddMaintainanceRequest />} />
        <Route path='/HEditMaintainanceRequest/:id' element={<HEditMaintainanceRequest />} />

        {/* Housekeeping Routing */}
        <Route path='/HHousekeeping' element={<HHousekeeping />} />
        <Route path='/HAddHousekeeping' element={<HAddHousekeeping />} />
        <Route path='/HEditHousekeepingrec/:id' element={<HEditHousekeepingrec />} />







      </Routes>
    </BrowserRouter>
  )
}

export default App