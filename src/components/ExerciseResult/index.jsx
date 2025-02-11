import { useDispatch, useSelector } from "react-redux";
import { getExerciseResultSelector, getThemeSelector } from "../../redux/selector";
import { Avatar, Typography, Card, CardContent, Chip, Box } from "@mui/material";

function ExerciseResult() {
    const exerciseResult = useSelector(getExerciseResultSelector)

    const theme = useSelector(getThemeSelector)

    return <div className="flex flex-col gap-2">
        {Array.isArray(exerciseResult?.list) && exerciseResult?.list.length > 0 ? exerciseResult?.list?.map((item, index) => (
            <Card
                key={index}
                className={`shadow-lg border ${item.score > 80
                    ? "border-green-500"
                    : item.score > 50
                        ? "border-yellow-500"
                        : "border-red-500"
                    }`}
            >
                <CardContent className="flex items-center gap-4 p-4">
                    <Avatar
                        src={item.user?.avatar}
                        alt={item.user?.name}
                        className="w-16 h-16"
                    />
                    <div className="flex-1">
                        <Typography
                            variant="h6"
                            className="font-semibold text-gray-800"
                        >
                            {item.user?.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            className="text-gray-600"
                        >
                            {item.user?.email}
                        </Typography>
                        <Typography
                            variant="body2"
                            className="mt-1 text-gray-500"
                        >
                            Ngày làm: {item?.createAt}
                        </Typography>
                    </div>
                    <Typography
                        variant="h6"
                        className="font-bold text-primary"
                    >
                        Điểm: {item?.score}
                    </Typography>
                    <div className='flex flex-col gap-2'>
                        <Chip variant='contained' label={item?.status}>
                        </Chip>
                        <Chip variant='outlined' label={`Câu đúng: ${item?.countCorrect}`}>
                        </Chip>
                    </div>
                </CardContent>
            </Card>
        )) :
            <Box
                className="flex flex-col items-center justify-center"
                sx={{ textAlign: "center", color: theme.palette.textColor.main, py: 4 }}
            >
                <Typography variant="h6" gutterBottom>
                    Bạn chưa thực hiện bài tập này!
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    Thường xuyên theo dõi để cập nhật kết quả bài tập.
                </Typography>
            </Box>
        }
    </div>
}

export default ExerciseResult;