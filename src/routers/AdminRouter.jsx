import { Routes, Route } from "react-router-dom";
import HeaderAdmin from "../components/Header/HeaderAdmin";
import NotFound from "../components/NotFound.jsx/NotFound";
import MenuAdmin from "../components/Menu/MenuAdmin"
import { Box, Grid } from "@mui/material";
import Feedbacks from "../components/admin/Tables/Feedbacks"
import Users from "../components/admin/Tables/Users";
import ClassRooms from "../components/admin/Tables/ClassRooms";
import AnalyticsCards from "../components/Analytics";

function AdminRouter() {
    return <>
        <HeaderAdmin></HeaderAdmin>
        <Grid container>
            <Grid item xs={0} md={2}>
                <MenuAdmin></MenuAdmin>
            </Grid>
            <Grid item xs={12} md={10}>
                <Box className='p-2'>
                    <Routes>
                        <Route path='/' element={<AnalyticsCards></AnalyticsCards>}></Route>
                        <Route path='/user' element={<Users></Users>}></Route>
                        <Route path='/classroom' element={<ClassRooms></ClassRooms>}></Route>
                        <Route path='/feedback' element={<Feedbacks></Feedbacks>}></Route>
                        <Route path='/*' element={<NotFound></NotFound>}></Route>
                    </Routes>
                </Box>
            </Grid>
        </Grid>
    </>
}

export default AdminRouter; 