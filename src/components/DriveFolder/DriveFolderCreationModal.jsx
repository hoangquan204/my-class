import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { border } from '@cloudinary/url-gen/qualifiers/background';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createFolder } from '../ClassRoom/classRoomSlice';
import noteSlice from '../Note/noteSlice';
import notificationSlice from '../Notification/notificationSlice';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
 borderRadius: '8px',
  p: 4,
};

function extractFolderId(url) {
  if (!url) return null;

  let match = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];

  match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match) return match[1];

  match = url.match(/\/drive\/u\/\d\/folders\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];

  return null;
}

export default function DriveFolderCreationModal({classRoomId}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [folderUrl, setFolderUrl] = React.useState('');

  const dispatch = useDispatch()

  const handleSubmit = () => {
    const folderId = extractFolderId(folderUrl);
    if (folderId) {
      console.log("Extracted folder:", { classRoomId,  folder: {id : folderId} });
      // Xử lý folderId ở đây, ví dụ: gửi nó đến server hoặc lưu vào state
      dispatch(createFolder({ classRoomId,  folderId }))
      dispatch(notificationSlice.actions.showNotification({
           type: 'success',
           message: 'Tạo thư mục thành công!'
       }))
      handleClose();
    } else {
      // Xử lý lỗi nếu không thể trích xuất được folderId
      console.error('Invalid Google Drive folder URL');
    }   
  }


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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tạo thư mục mới
          </Typography>
          <div className="flex flex-col mt-2 gap-y-2">
            <TextField id="filled-basic" value={folderUrl} label="URL thư mục Google Drive:" variant="filled" onChange={(e)=>{
                setFolderUrl(e.target.value)
            }}/>
            <Button sx={{marginTop: '16px'}} variant='contained' onClick={handleSubmit}>Lưu</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}