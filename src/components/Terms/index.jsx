import { Box } from "@mui/material"
import BreadcrumbsCustom from "../BreadcrumbsCustom/BreadcrumbsCustom"
import { useSelector } from "react-redux"
import { getThemeSelector } from "../../redux/selector"

function Terms() {
    const terms = [
        {
            title: 'Giới thiệu',
            content: 'Chào mừng bạn đến với [Tên website]! Khi truy cập và sử dụng dịch vụ của chúng tôi, bạn đã đồng ý tuân thủ các điều khoản sử dụng sau đây. Vui lòng đọc kỹ trước khi tiến hành.',
        },
        {
            title: 'Quyền Và Nghĩa Vụ Của Người Dùng',
            content: [
                'Cung cấp thông tin chính xác: Bạn có trách nhiệm cung cấp thông tin chính xác, đầy đủ khi đăng ký tài khoản.',
                'Bảo vệ tài khoản: Bạn phải giữ bí mật thông tin đăng nhập và chịu trách nhiệm với mọi hoạt động phát sinh từ tài khoản của mình.',
                'Tôn trọng quy định: Bạn cam kết không sử dụng dịch vụ vào các mục đích bất hợp pháp hoặc để vi phạm quyền lợi của bên thứ ba.'
            ]
        },
        {
            title: 'Quyền Và Nghĩa Vụ Của My class',
            content: [
                'Cập nhật dịch vụ: Chúng tôi có quyền thay đổi, cải tiến hoặc ngừng cung cấp một phần hoặc toàn bộ dịch vụ bất kỳ lúc nào mà không cần thông báo trước.',
                'Bảo vệ dữ liệu: Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn theo chính sách bảo mật.',
                'Chịu trách nhiệm: Chúng tôi không chịu trách nhiệm với những thiệt hại trực tiếp hoặc gián tiếp do việc bạn sử dụng dịch vụ.'
            ]
        },
        {
            title: 'Quyền Sở Hữu Trí Tuệ',
            content: 'Mọi nội dung, hình ảnh, logo, và các tài liệu khác trên [Tên website] đều thuộc quyền sở hữu của chúng tôi hoặc bên liên kết. Mọi hành vi sao chép, phân phối, hoặc sử dụng khi chưa được sự cho phép đều bị nghiêm cấm.'
        },
        {
            title: 'Giới Hạn Trách Nhiệm',
            content: [
                'My class không chịu trách nhiệm với bất kỳ hư hỏng nào gây ra bởi sự gian đoạn, lỗi kỹ thuật hoặc ngừng cung cấp dịch vụ',
                'My class không chịu trách nhiệm với bất kỳ hư hỏng nào gây ra bởi việc bạn truy cập vào các trang web bên ngoài',
            ]
        },
        {
            title: 'Chính Sách Bảo Mật',
            content: 'Chúng tôi cam kết tuân thủ chính sách bảo mật để bảo vệ quyền lợi của bạn. Chi tiết các quy định bảo mật được đề cập trong trang "Chính Sách Bảo Mật".'
        },
        {
            title: 'Thay Đổi Điều Khoản',
            content: 'Tất cả nội dung và tài nguyên trên website, bao gồm nhưng không giới hạn ở văn bản, hình ảnh, video, đồ đồ họa và logo đều được bảo vệ bởi luật sở hữu trí tuệ. Người dùng không được sao chép, chỉnh sửa, phân phối hoặc sử dụng bất cứ nội dung nào mà không có sự cho phép chính thức từ chúng tôi.Chúng tôi có quyền thay đổi nội dung điều khoản bất kỳ lúc nào. Các thay đổi sẽ có hiệu lực ngay khi được cập nhật trên trang web.'
        },
        {
            title: 'Liên hệ',
            content: 'Nếu bạn có bất kỳ câu hỏi nào về điều khoản sử dụng này, xin vui lòng liên hệ với chúng tôi qua địa chỉ email [citaa.hello@gmail.com] hoặc số điện thoại [0946299342].'
        },
    ]
    const breadcumbs = [
        {
            title: 'Trang chủ',
            path: '/'
        }
    ]

    const theme = useSelector(getThemeSelector)

    return <div className='py-4 px-4'>
        <BreadcrumbsCustom secondary={breadcumbs} primary={'Điều khoản dịch vụ'} />
        <div className='mx-10  pb-5 shadow-lg'>
            <p className='p-6 text-3xl font-bold text-center bg-primary text-white'>
                Điều khoản My class
            </p>
            {terms.map((item, index) => {
                return <Box className='flex flex-col gap-y-4 py-6'>
                    <span className='text-xl font-semibold border-l-[4px] border-primary'>
                        <span className={`px-2 text-[${theme.palette.textColor.main}]`}>{`${index + 1}. ${item.title}`}</span>
                    </span>
                    <div className='p-4 border border-[#333] rounded-md'>
                        {Array.isArray(item.content) ?
                            <ul className='list-disc px-6'>
                                {
                                    item.content.map((content_item) => {
                                        return <li className={`mb-2 text-[${theme.palette.textColor.main}]`} key={content_item} >{content_item}</li>
                                    })
                                }
                            </ul>
                            :
                            <span className={`text-[${theme.palette.textColor.main}]`}>{item.content}</span>
                        }
                        {index === 7 ? <>
                            <br></br>
                            <a className='underline text-primary' href='/contact'>Chi tiết</a>
                        </> : ''}
                    </div>
                </Box>
            })}
        </div>
    </div>
}

export default Terms