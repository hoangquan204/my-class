import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ReplyIcon from '@mui/icons-material/Reply';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import { createVideo } from './videoSlice';
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

export default function VideoCreationModal({ classRoomId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const dispatch = useDispatch();

  // ✅ Hàm validate dữ liệu nhập vào
  const validateFields = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Tiêu đề không được để trống';
    if (!description.trim()) newErrors.description = 'Mô tả không được để trống';
    if (!url.trim()) {
      newErrors.url = 'URL không được để trống';
    } else {
      // kiểm tra URL YouTube hợp lệ
      const youtubeRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(embed|watch\?v=)?([a-zA-Z0-9_-]{11})/;
      if (!youtubeRegex.test(url)) {
        newErrors.url = 'URL YouTube không hợp lệ';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateVideo = () => {
    if (!validateFields()) return;

    dispatch(createVideo({ title, description, url, classRoomId }));
    dispatch(
      notificationSlice.actions.showNotification({
        type: 'success',
        message: 'Tạo video thành công!',
      })
    );

    // reset form
    setTitle('');
    setDescription('');
    setUrl('');
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        <AddBoxIcon />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-x-2 w-full">
              <ReplyIcon />
              <div className="border border-primary rounded-md">
                <span className="text-primary font-semibold rounded-md p-2">
                  Tạo video cho lớp học
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-4 my-2">
              <TextField
                label="Tiêu đề"
                name="title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
              />
              <TextField
                label="Mô tả"
                name="description"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
              />
              <TextField
                label="URL"
                name="url"
                fullWidth
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                error={!!errors.url}
                helperText={errors.url}
              />

              <Button variant="contained" onClick={handleCreateVideo}>
                Tạo
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
