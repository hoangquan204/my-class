import React, { useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stepper,
    Step,
    StepLabel,
    TextField,
    Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { getAuthSelector, getClassRoomSelector } from "../../redux/selector";
import { createPlan, getPlan } from "../ClassRoom/classRoomSlice";
import AddBoxIcon from '@mui/icons-material/AddBox';


export default function PlanStepper({ classRoomId }) {
    const [open, setOpen] = React.useState(false);
    const [plans, setPlans] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);

    const auth = useSelector(getAuthSelector);
    const classRoom = useSelector(getClassRoomSelector);

    const dispatch = useDispatch();
    const [selectedClassRoom, setSelectedClassRoom] = React.useState({});

    useEffect(() => {
        const result = classRoom?.listAll?.find((item) => {
            return item.id === parseInt(classRoomId);
        });
        setSelectedClassRoom(result);
    }, [classRoomId, classRoom]);

    useEffect(() => {
        dispatch(getPlan(classRoomId));
    }, [dispatch, classRoomId]);


    // Khi dữ liệu kế hoạch được cập nhật từ Redux, đồng bộ vào plans
    useEffect(() => {
        const fetchedPlans = classRoom?.plan?.planItemList || [];
        const mappedPlans = fetchedPlans.map((item) => ({
            name: item.name || "",
            description: item.description || "",
            start: item.start || "",
            end: item.end || "",
        }));
        setPlans(mappedPlans);
    }, [classRoom?.plan?.planItemList]);

    const handleInputChange = (index, field, value) => {
        setPlans((prev) => {
            const newPlans = [...prev];
            newPlans[index] = { ...newPlans[index], [field]: value };
            return newPlans;
        });
    };

    const handleAddPlan = () => {
        setPlans((prev) => [...prev, { name: "", description: "", start: "", end: "" }]);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = () => {
        setActiveStep(0);
        setOpen(false);
        dispatch(
            createPlan({
                classRoomId: selectedClassRoom?.id,
                planItemList: plans.map((plan) => ({
                    name: plan.name || '',
                    description: plan.description || '',
                    start: plan.start ? new Date(plan.start).toISOString() : null,
                    end: plan.end ? new Date(plan.end).toISOString() : null,
                })),
            })
        );
    };

    useEffect(() => {
        if (!plans || plans.length === 0) return;

        const now = new Date();

        const currentStep = plans.findIndex(({ start, end }) => {
            if (!start || !end) return false;

            const startDate = new Date(start);
            const endDate = new Date(end);

            // Đảm bảo ngày hợp lệ
            if (isNaN(startDate) || isNaN(endDate)) return false;

            return now >= startDate && now <= endDate;
        });

        // Nếu không có mốc phù hợp với thời gian hiện tại, vẫn đặt về mốc đầu tiên
        setActiveStep(currentStep !== -1 ? currentStep : 0);
    }, [plans]);



    return (
        <Box sx={{ mx: "auto", mt: 4 }}>
            {auth?.userDetail?.id === selectedClassRoom?.teacher?.id && (
                <div className='text-center py-2'>
                    <Button variant="outlined" onClick={handleOpen} sx={{ mb: 3 }}>
                        <AddBoxIcon></AddBoxIcon>
                    </Button>
                </div>
            )}

            {plans.length > 0 && (
                <Stepper activeStep={activeStep} alternativeLabel>
                    {plans.map(({ start, end, name }, i) => (
                        <Step key={i} onClick={() => setActiveStep(i)}>
                            <StepLabel>
                                {start && end
                                    ? name
                                    : `Mốc ${i + 1}`}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            )}

            {plans.length > 0 && (
                <Box
                    sx={{
                        mt: 4,
                        p: 2,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        minHeight: 150,
                        position: "relative",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        {plans[activeStep].name || "(Chưa nhập tên công việc)"}
                    </Typography>
                    <Typography>
                        <strong>Thời gian:</strong>{" "}
                        {plans[activeStep].start && plans[activeStep].end
                            ? `${new Date(plans[activeStep].start).toLocaleDateString('vi-VN')} - ${new Date(plans[activeStep].end).toLocaleDateString('vi-VN')}`
                            : "(Chưa chọn thời gian)"}
                    </Typography>
                    <Typography sx={{ whiteSpace: "pre-wrap", mt: 1 }}>
                        {plans[activeStep].description || "(Chưa nhập mô tả)"}
                    </Typography>

                    {(() => {
                        const now = new Date();
                        const { start, end } = plans[activeStep];
                        if (start && end) {
                            const startDate = new Date(start);
                            const endDate = new Date(end);
                            if (now >= startDate && now <= endDate) {
                                return (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            padding: 1,
                                            bgcolor: "success.main",
                                            color: "white",
                                            borderRadius: "0 4px 0 4px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Đang diễn ra
                                    </Box>
                                );
                            }
                        }
                        return null;
                    })()}
                </Box>
            )}

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle className="text-center">Nhập kế hoạch theo mốc thời gian</DialogTitle>
                <DialogContent dividers>
                    {plans.map((plan, index) => (
                        <Box key={index} sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Mốc {index + 1}
                            </Typography>
                            <TextField
                                label="Tên công việc"
                                variant="outlined"
                                fullWidth
                                value={plan?.name}
                                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Mô tả công việc"
                                variant="outlined"
                                multiline
                                rows={3}
                                fullWidth
                                value={plan?.description}
                                onChange={(e) => handleInputChange(index, "description", e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Ngày bắt đầu"
                                type="datetime-local"
                                fullWidth
                                value={plan?.start}
                                onChange={(e) => handleInputChange(index, "start", e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Ngày kết thúc"
                                type="datetime-local"
                                fullWidth
                                value={plan?.end}
                                onChange={(e) => handleInputChange(index, "end", e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                    ))}

                    <Button
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleAddPlan}
                        color="primary"
                    >
                        Thêm mốc thời gian
                    </Button>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button variant="contained" onClick={handleSave}>
                        Lưu kế hoạch
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
