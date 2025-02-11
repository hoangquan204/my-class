import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ReactQuill from 'react-quill';
import ReplyIcon from '@mui/icons-material/Reply'
import { useDispatch } from 'react-redux';
import { createNote } from './noteSlice';
import notificationSlice from '../Notification/notificationSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

export default function NoteCreationModal({ classRoomId }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [content, setContent] = React.useState('')

    const dispatch = useDispatch()

    const handleCreateNote = () => {
        if (content) {
            dispatch(createNote({ content, classRoomId }))
            dispatch(notificationSlice.actions.showNotification({
                type: 'success',
                message: 'Gửi thông báo thành công!'
            }))
            setContent('')
            handleClose()
        }
        else
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Bạn chưa soạn nội dung thông báo!'
            }))
    }

    const modules = {
        toolbar: {
            container: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                ['link', 'image'], // Add image button in toolbar
                ['clean'],
                [{ 'font': [] }, { 'size': ['small', 'medium', 'large', 'huge'] }],
                [{ 'align': [] }],
                ['code-block']
            ],
        },
    };

    const formats = [
        'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'align', 'link', "image"
    ];

    return (
        <div>
            <Button variant='outlined' onClick={handleOpen}>
                <AddBoxIcon></AddBoxIcon>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='space-y-4'>
                        <div className='flex items-center justify-center gap-x-2 w-full'>
                            <ReplyIcon></ReplyIcon>
                            <div className='border border-primary rounded-md'>
                                <span className='text-primary font-semibold rounded-md p-2'>Gửi thông báo cho lớp</span>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-4 my-2'>
                            <div style={{ minHeight: '400px' }} className='scroll-hidden'>
                                <ReactQuill
                                    ref={(el) => {
                                        if (el) {
                                            window.quillEditorRef = el.getEditor();
                                        }
                                    }}
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    modules={modules}
                                    style={{ height: '100%' }}
                                    formats={formats}
                                />
                            </div>
                            <Button variant='contained' onClick={handleCreateNote}>Gửi</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}