import { Routes, Route } from "react-router-dom";
import HomeAdmin from "../components/admin/HomeAdmin";
function AdminRouter() {
    return <Routes>
        <Route path='/' element={<HomeAdmin></HomeAdmin>}></Route>
        <Route path='/*' element={<HomeAdmin></HomeAdmin>}></Route>
    </Routes>
}

export default AdminRouter; 