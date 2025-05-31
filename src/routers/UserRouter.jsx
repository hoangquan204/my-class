import { Route, Routes } from "react-router-dom";
import MyAccount from "../components/MyAccount"
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClassRoom from "../components/ClassRoom";
import ClassRoomDetail from "../components/ClassRoom/ClassRoomDetail";
import ExcerciseDetail from "../components/Exercise/ExerciseDetail";
import ExerciseCreation from "../components/Exercise/ExerciseCreation";
import NotFound from "../components/NotFound.jsx/NotFound";
import ListClassRoom from "../components/ListClassRoom";
import LessonCreation from "../components/Lesson/LessonCreation";
import LessonDetail from "../components/Lesson/LessonDetail";
import Home from "../components/Home";
import Terms from "../components/Terms";
import Contact from "../components/Contact";
import ExcerciseResultDetail from "../components/ExerciseResult/ExerciseResultDetail";
import Schedule from "../components/Schedule";
import { useSelector } from "react-redux";
import { getThemeSelector } from "../redux/selector";

function UserRouter() {
    const theme = useSelector(getThemeSelector)
    return <>
        <Header ></Header>
        <div className={`bg-[${theme.palette.mode === 'light' ? '#fff' : '#000'}] container min-h-[1000px] mx-auto py-10`}>
            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/class' element={<ClassRoom></ClassRoom>}></Route>
                <Route path='/lesson/:id' element={<LessonDetail></LessonDetail>}></Route>
                <Route path='/list-class' element={<ListClassRoom></ListClassRoom>}></Route>
                <Route path='/my-account' element={<MyAccount></MyAccount>}></Route>
                <Route path='/class/:id' element={<ClassRoomDetail></ClassRoomDetail>}></Route>
                <Route path='/exercise/:id' element={<ExcerciseDetail></ExcerciseDetail>}></Route>
                <Route path='/exercise/create' element={<ExerciseCreation></ExerciseCreation>}></Route>
                <Route path='/lesson/create' element={<LessonCreation></LessonCreation>}></Route>
                <Route path='/lesson/:id' element={<LessonDetail></LessonDetail>}></Route>
                <Route path='/terms' element={<Terms></Terms>}></Route>
                <Route path='/contact' element={<Contact></Contact>}></Route>
                <Route path='/exercise-result/:id' element={<ExcerciseResultDetail></ExcerciseResultDetail>}></Route>
                <Route path='/schedule' element={<Schedule></Schedule>}></Route>
                <Route path='/*' element={<NotFound></NotFound>}></Route>
            </Routes>
        </div>
        <Footer></Footer>
    </>
}

export default UserRouter;