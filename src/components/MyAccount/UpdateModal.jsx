import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { FormControlLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Tooltip, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../User/authSlice';
import { getAuthSelector, getThemeSelector } from '../../redux/selector';
import notificationSlice from '../Notification/notificationSlice';
import { provinces } from '../../others/Provinces';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    pt: 2,
    px: 4,
    pb: 3,
};

export default function NestedModal({ label, id, value }) {
    const auth = useSelector(getAuthSelector)
    const theme = useSelector(getThemeSelector)

    const [open, setOpen] = React.useState(false)
    const [newValue, setNewValue] = React.useState(value)
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        dispatch(notificationSlice.actions.showNotification({
            type: 'success',
            message: auth.message
        }))
        handleClose()
    }, [auth.message])

    const dispatch = useDispatch()

    const handleUpdateUser = () => {
        const data = {
            ...auth.userDetail,
            [id]: newValue,
        }
        console.log(data)
        dispatch(updateUser(data))
    }
    var input = <></>
    switch (id) {
        case 'gender':
            input = <>
                <InputLabel id="gender">Giới tính</InputLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    row
                    onChange={(e) => {
                        setNewValue(e.target.value)
                    }}
                >
                    <FormControlLabel value="female" control={<Radio value='female' />} label="Nữ" />
                    <FormControlLabel value="male" control={<Radio value='male' />} label="Nam" />
                    <FormControlLabel value="other" control={<Radio value='other' />} label="Khác" />
                </RadioGroup>
            </>
            break
        case 'address':
            input = <>
                <InputLabel id="address">Địa chỉ</InputLabel>
                <Select
                    className='w-full'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newValue}
                    label="Address"
                    onChange={(e) => {
                        setNewValue(e.target.value)
                    }}
                >
                    {provinces.map((province, index) => {
                        return <MenuItem key={`province_${index}`} value={province}>{province}</MenuItem>
                    })}
                </Select>
            </>
            break
        default:
            input = <>
                <TextField defaultValue={value} value={newValue} className='w-full' id="filled-basic" label={label} variant="filled" onChange={(e) => {
                    setNewValue(e.target.value)
                }} />
            </>
    }

    return (
        <div >
            <Button onClick={handleOpen}>
                <Tooltip title='Cập nhật ngay'>
                    <IconButton>
                        <CreateIcon></CreateIcon>
                    </IconButton>
                </Tooltip>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                className={`text-[${theme.palette.textColor.main}]`}
            >
                <Box className='flex flex-col items-center gap-y-2' sx={{ ...style, width: 400 }}>
                    <Typography sx={{ color: theme.palette.textColor.main }} variant='h5'>Cập nhật thông tin</Typography>
                    {input}
                    <Button variant='contained' onClick={() => {
                        if (window.confirm('Thông tin của bạn sẽ được cập nhật!'))
                            handleUpdateUser()
                    }}>Cập nhật</Button>
                </Box>
            </Modal>
        </div>
    );
}