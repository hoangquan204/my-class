import { Card, Grid } from "@mui/material";
import Introduction from "./Introduction";
import ListClassRoom from "../ListClassRoom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getListAllClassRoom } from "../ClassRoom/classRoomSlice";
import { getAnalyticsData } from "../Analytics/analyticsSlice";
import AnalyticsData from "../Analytics";
import ForgotPasswordModal from "../User/ForgotPasswordModal";

function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListAllClassRoom())
        dispatch(getAnalyticsData())
    }, [])

    return <>
        <Card className='lg:mx-8 p-2'>
            <Grid container className='flex justify-center  p-5' sx={{ display: 'flex' }} spacing={2}>
                <div className='flex flex-col lg:flex-row lg:space-x-4 lg:mx-8'>
                    <div className='bg-primary lg:w-[50%] w-full rounded-md text-white'>
                        <h1 className='text-3xl font-semibold mt-8 text-center' >LỜI MỞ ĐẦU</h1>
                        <p className='text-xl p-4 px-6 leading-10'>
                            My class là nền tảng học trực tuyến giúp bạn tạo, quản lý và tham gia lớp học dễ dàng. Với giao diện đơn giản, bạn có thể kết nối, học tập và theo dõi tiến độ mọi lúc, mọi nơi. Tham gia ngay để trải nghiệm học tập hiệu quả và linh hoạt!
                        </p>
                    </div>
                    <Introduction />
                </div>
            </Grid>
        </Card>
        <Card className='lg:mx-8 p-5 mt-10'>
            <ListClassRoom></ListClassRoom>
        </Card>
        {/* <Card className='lg:mx-8 p-5 mt-10'>
            <Grid container className='flex justify-center  p-5' sx={{ display: 'flex' }} spacing={2}>
                <AnalyticsData></AnalyticsData>
            </Grid>
        </Card> */}
        <ForgotPasswordModal ></ForgotPasswordModal>
    </>
}
export default Home;