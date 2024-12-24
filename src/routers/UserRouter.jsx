import { Route, Routes } from "react-router-dom";
import MyAccount from "../components/MyAccount"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, Grid } from "@mui/material";
import ClassRoomSearch from "../components/ClassRoom/ClassRoomSearch";
import ClassRoom from "../components/ClassRoom";
import Menu from "../components/MenuLeft/Menu";
import ClassRoomDetail from "../components/ClassRoom/ClassRoomDetail";
import Home from "../components/Home";
import ExcerciseDetail from "../components/Exercise/ExerciseDetail";
import ExcerciseCreation from "../components/Exercise/ExerciseCreation";
import ExerciseCreation from "../components/Exercise/ExerciseCreation";


function UserRouter() {
    return <>
        <Header ></Header>
        <Box className='min-h-[800px] py-2'>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Menu></Menu>
                </Grid>
                <Grid item xs={10}>
                    <Routes>
                        <Route path='/*' element={<ClassRoom></ClassRoom>}></Route>
                        <Route path='/class' element={<ClassRoomSearch></ClassRoomSearch>}></Route>
                        <Route path='/my-account' element={<MyAccount></MyAccount>}></Route>
                        <Route path='/class/:id' element={<ClassRoomDetail></ClassRoomDetail>}></Route>
                        <Route path='/exercise/:id' element={<ExcerciseDetail></ExcerciseDetail>}></Route>
                        <Route path='/exercise/create' element={<ExerciseCreation></ExerciseCreation>}></Route>
                    </Routes>
                </Grid>
            </Grid>
        </Box>
        <Footer></Footer>
    </>
}

export default UserRouter;