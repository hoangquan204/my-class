import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import { useState } from "react";
import {
    TextField,
    Grid,
    IconButton,
    Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { createSchedule } from "./scheduleSlice";
import { useDispatch } from "react-redux";
import notificationSlice from "../Notification/notificationSlice";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    p: 4,
};

export default function ScheduleCreationModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [form, setForm] = useState({
        start: dayjs().format("YYYY-MM-DDTHH:mm"),
        description: "",
        breakAfterMinutes: 50,
        breakDuration: 15,
        scheduleItemCreationRequests: [{ name: "", duration: 30 }],
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleItemChange = (index, field, value) => {
        const updated = [...form.scheduleItemCreationRequests];
        updated[index][field] = value;
        setForm({ ...form, scheduleItemCreationRequests: updated });
    };

    const addItem = () => {
        setForm({
            ...form,
            scheduleItemCreationRequests: [
                ...form.scheduleItemCreationRequests,
                { name: "", duration: 30 },
            ],
        });
    };

    const removeItem = (index) => {
        const updated = form.scheduleItemCreationRequests.filter(
            (_, i) => i !== index
        );
        setForm({ ...form, scheduleItemCreationRequests: updated });
    };

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted schedule:", form);

        dispatch(createSchedule(form))
        dispatch(notificationSlice.actions.showNotification({
            type: 'success',
            message: 'Tạo lịch học thành công!'
        }))
        handleClose()
    };

    return (
        <div>
            <Tooltip title="Tạo lịch học">
                <Button variant='outlined' onClick={handleOpen}>
                    <AddBoxIcon></AddBoxIcon>
                </Button>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Typography className='text-center' variant="h6">Tạo lịch học mới</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Thời gian bắt đầu"
                                    type="datetime-local"
                                    name="start"
                                    fullWidth
                                    value={form.start}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Mô tả"
                                    name="description"
                                    fullWidth
                                    value={form.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Học liên tục (phút)"
                                    name="breakAfterMinutes"
                                    type="number"
                                    fullWidth
                                    value={form.breakAfterMinutes}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Thời gian nghỉ (phút)"
                                    name="breakDuration"
                                    type="number"
                                    fullWidth
                                    value={form.breakDuration}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Divider className="my-2" />

                        <Typography variant="subtitle1" className="font-semibold">
                            Danh sách bài học
                        </Typography>

                        <Box sx={{ maxHeight: 300, overflowY: "auto", pr: 1 }}>
                            {form.scheduleItemCreationRequests.map((item, index) => (
                                <Grid container spacing={2} key={index} alignItems="center" className="mb-2">
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Tên bài học"
                                            value={item.name}
                                            onChange={(e) =>
                                                handleItemChange(index, "name", e.target.value)
                                            }
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Thời lượng (phút)"
                                            type="number"
                                            value={item.duration}
                                            onChange={(e) =>
                                                handleItemChange(index, "duration", parseInt(e.target.value, 10))
                                            }
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton
                                            onClick={() => removeItem(index)}
                                            disabled={form.scheduleItemCreationRequests.length === 1}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}
                        </Box>

                        <Button variant="outlined" startIcon={<AddIcon />} onClick={addItem}>
                            Thêm bài học
                        </Button>

                        <div className="flex justify-end mt-4 gap-2">
                            <Button variant="contained" type="submit">
                                Lưu lịch học
                            </Button>
                            <Button variant="text" onClick={handleClose}>
                                Hủy
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}