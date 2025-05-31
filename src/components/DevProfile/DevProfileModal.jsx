import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from 'react-scroll';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    p: 4
};
const item = {
    avatar: 'http://res.cloudinary.com/dr9l1tvkn/image/upload/cda897ed-fb1c-49a8-a46f-92c96f1c58a7_z5990713626944_668b2cd80a0500952b12081c6b9ebde3.jpg',
    name: 'Lâm Hoàng Quân',
    major: 'Công nghệ thông tin',
    course: 'K48',
    role: 'Lập trình viên',
    gmail: 'quanb2205902@student.ctu.edu.vn',
    steps: [
        {
            title: 'Phát triển nguyên mẫu',
            content: 'Phát triển nguyên mẫu hệ thống: tạo ra các nguyên mẫu của ứng dụng web.'
        },
        {
            title: 'Thiết kế CSDL',
            content: 'Phát triển cơ sở dữ liệu: thiết kế và triển khai cơ sở dữ liệu để lưu trữ thông tin.'
        },
        {
            title: 'Xây dựng ứng dụng',
            content: 'Xây dựng ứng dụng web giúp kết nối giữa nhà đâu tư và sinh viên.'
        },
        {
            title: 'Thử nghiệm thực địa',
            content: 'Thử nghiệm tại thực địa: triển khai hệ thống tại Trường Đại học Cần Thơ.'
        }
    ]
}

export default function DevProfileModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Link onClick={handleOpen}>Xem chi tiết</Link>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={`flex flex-col md:flex-row items-center gap-x-1 w-full md:w-[50%]`}>
                        <img className='w-[250px] h-[300px] object-cover rounded-md' src={item.avatar} alt={item.name} />
                        <div className='flex flex-col h-full'>
                            <span className='text-xl text-center font-semibold bg-primary text-white rounded-md p-2'>{item.name}</span>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccountBoxIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={'Thành viên chính'} secondary={item.role} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <SchoolIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.major} secondary={item.course} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <EmailIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText className="text-primary underline" primary={<a target='_blank' rel='noopener noreferrer' href={`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${item.gmail}`}>{item.gmail}</a>} />
                                </ListItem>
                            </List>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}