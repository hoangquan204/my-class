import React from 'react';
import { Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';

function generateAdvice(scheduleList) {
    if (!Array.isArray(scheduleList) || scheduleList.length === 0) {
        return ["⚠️ Không có dữ liệu lịch học để phân tích. Hãy bắt đầu lên kế hoạch học tập ngay hôm nay!"];
    }

    const studyByDate = scheduleList.map(schedule => {
        const date = new Date(schedule.start).toLocaleDateString('vi-VN');
        const totalStudyMinutes = schedule.scheduleItemResponseList?.reduce(
            (sum, item) => sum + item.duration,
            0
        ) || 0;
        return { date, totalStudyMinutes };
    });

    let minDay = studyByDate[0];
    let maxDay = studyByDate[0];
    let totalMinutes = 0;

    studyByDate.forEach(({ date, totalStudyMinutes }) => {
        if (totalStudyMinutes < minDay.totalStudyMinutes) {
            minDay = { date, totalStudyMinutes };
        }
        if (totalStudyMinutes > maxDay.totalStudyMinutes) {
            maxDay = { date, totalStudyMinutes };
        }
        totalMinutes += totalStudyMinutes;
    });

    const average = totalMinutes / studyByDate.length;
    const totalDays = studyByDate.length;
    const gap = maxDay.totalStudyMinutes - minDay.totalStudyMinutes;

    const advices = [];

    advices.push(`📊 Bạn đã học tổng cộng trong ${totalDays} ngày, trung bình khoảng ${average.toFixed(1)} phút mỗi ngày.`);

    if (average < 30) {
        advices.push("⚠️ Thời gian học trung bình mỗi ngày còn khá thấp. Việc học ít có thể khiến bạn tiếp thu chậm và khó nhớ bài lâu dài.");
        advices.push("💡 Gợi ý: Cố gắng dành ít nhất 45-60 phút mỗi ngày để tăng hiệu quả học tập.");
    } else if (average >= 30 && average < 90) {
        advices.push("👍 Thời gian học trung bình của bạn khá hợp lý. Tuy nhiên, nếu có thể, hãy tăng dần để đạt hiệu quả tốt hơn.");
        advices.push("💡 Gợi ý: Chia nhỏ thời gian học thành các phiên 25-30 phút, nghỉ ngắn giữa giờ để giữ tập trung.");
    } else if (average >= 90 && average < 180) {
        advices.push("🌟 Bạn đang duy trì một thời lượng học tập khá lớn mỗi ngày, điều này rất tốt để nâng cao kiến thức.");
        advices.push("💡 Gợi ý: Đừng quên nghỉ ngơi hợp lý để tránh kiệt sức và duy trì sự hứng thú lâu dài.");
    } else {
        advices.push("⚠️ Bạn đang học rất nhiều mỗi ngày. Cẩn thận đừng để quá tải gây mệt mỏi và giảm hiệu quả.");
        advices.push("💡 Gợi ý: Hãy bổ sung các khoảng nghỉ dài hơn, dành thời gian cho vận động và thư giãn.");
    }

    if (gap > 120) {
        advices.push("⚠️ Có sự chênh lệch lớn giữa ngày học nhiều nhất và ít nhất (hơn 2 giờ). Điều này có thể ảnh hưởng tới nhịp độ học tập và gây khó khăn khi ôn tập.");
        advices.push("💡 Gợi ý: Cố gắng phân bổ thời gian học đều hơn giữa các ngày để đạt kết quả bền vững.");
    } else if (gap > 60) {
        advices.push("🔄 Thời gian học giữa các ngày có sự dao động vừa phải, đây là điều bình thường khi lịch học có thể thay đổi.");
        advices.push("💡 Gợi ý: Bạn có thể cân nhắc cố định khung thời gian học để giúp duy trì thói quen.");
    } else {
        advices.push("✅ Bạn có thói quen học khá đều đặn giữa các ngày, rất tốt cho việc duy trì kiến thức ổn định.");
    }

    if (totalDays < 3) {
        advices.push("⚠️ Bạn mới học ít ngày trong khoảng thời gian này. Việc học không đều có thể khiến hiệu quả bị giảm.");
        advices.push("💡 Gợi ý: Lên kế hoạch học tập đều đặn, cố gắng học ít nhất 4-5 ngày mỗi tuần.");
    } else if (totalDays <= 7) {
        advices.push("👍 Bạn đã học đều trong tuần, đây là tiền đề tốt để phát triển thói quen học tập lâu dài.");
    } else {
        advices.push("🌟 Bạn đang duy trì lịch học đều và bền bỉ, rất tốt cho việc ghi nhớ và nâng cao kỹ năng.");
    }

    if (average >= 60 && gap <= 60 && totalDays >= 5) {
        advices.push("🎉 Tuyệt vời! Bạn đang có một thói quen học tập rất tích cực và ổn định.");
        advices.push("🎯 Hãy duy trì và tiếp tục phát huy để đạt được mục tiêu học tập nhé!");
    }

    return advices;
}

function ScheduleAdvice() {
    // Lấy scheduleList từ redux store
    const scheduleList = useSelector(state => state.schedule.list);

    const advices = React.useMemo(() => generateAdvice(scheduleList), [scheduleList]);

    return (
        <Box className="mt-6 p-4 border rounded-md bg-gray-50">
            <Typography variant="h6" gutterBottom>
                💡 Lời khuyên dựa trên lịch học
            </Typography>
            {advices.map((advice, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                    {advice}
                </Typography>
            ))}
        </Box>
    );
}

export default ScheduleAdvice;
