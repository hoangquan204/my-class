import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function CountdownTimer({ duration }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <CountdownCircleTimer
                isPlaying
                duration={duration} // Thời gian đếm ngược (giây)
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[300, 200, 100, 0]} // Đổi màu dựa vào thời gian còn lại
                onComplete={() => {
                    alert("Time's up!");
                    return { shouldRepeat: false }; // Không lặp lại
                }}
            >
                {({ remainingTime }) => {
                    const minutes = Math.floor(remainingTime / 60);
                    const seconds = remainingTime % 60;
                    return (
                        <div style={{ fontSize: '2rem', color: '#004777' }}>
                            {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
                        </div>
                    );
                }}
            </CountdownCircleTimer>
        </div>
    );
}

export default CountdownTimer;
