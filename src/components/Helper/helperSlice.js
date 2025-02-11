import { createSlice } from "@reduxjs/toolkit";

const initialData = `
    Giới thiệu: My class là nền tảng học trực tuyến giúp bạn tạo, quản lý và tham gia lớp học dễ dàng. Với giao diện đơn giản, bạn có thể kết nối, học tập và theo dõi tiến độ mọi lúc, mọi nơi. Tham gia ngay để trải nghiệm học tập hiệu quả và linh hoạt.
    Cách tạo lớp học: Để tạo dự án, bạn cần đăng nhập tài khoản sau đó chọn mục "Lớp học của tôi", sau đó click vào nút có biểu tượng dấu + để thực hiện tạo lớp học. 
    Cách đăng ký tài khoản: Để đăng ký tài khoản, bạn click vào nút "Đăng nhập" trên menu chính sau đó chọn "Đăng ký tài khoản".
    Cách tham gia lớp học: Để tham gia các cuộc thi, bạn chọn mục "Danh sách lớp học" tại menu chính, sau đó chọn lớp học mà mình muốn tham gia.
    Cách làm bài tập Để thực hiện các bài tập bạn cần chọn lớp học của mình, sau đó chọn tab "Bài tập" để lựa chọn bài tập mà mình muốn thực hiện .
`
export default createSlice({
    name: 'helper',
    initialState: {
        data: initialData,
        error: false,
        loading: false,
        success: false,
        message: ''
    },
    reducers: {
        setData: (state, action) => {
            if (!state.data.includes(action.payload))
                state.data = `${state.data} ${action.payload}`
        }
    },

})