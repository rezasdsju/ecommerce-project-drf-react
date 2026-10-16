import {Navigate,Outlet} from 'react-router-dom'

const isAuthenticated = ()=> !! localStorage.getItem("access_token")






const PrivateRouter = ({redirectTo='/login'}) => {
    return isAuthenticated()? <Outlet></Outlet>:<Navigate to={redirectTo} replace></Navigate>
};

export default PrivateRouter;