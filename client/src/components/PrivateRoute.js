
import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { UserContext } from '../App';

function PrivateRoute(){

    const [user, setUser] = React.useContext(UserContext);

  return user?.signIn? <Outlet/> : <Navigate to="/"/>
  
}

export default PrivateRoute;