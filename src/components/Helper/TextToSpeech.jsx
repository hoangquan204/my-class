import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";

function TextToSpeech({ text }) {
    const { speak, cancel, voices } = useSpeechSynthesis();

    // Tìm giọng tiếng Việt từ danh sách voices
    const vietnameseVoice = voices.find(
        (voice) => voice.lang === ""
    );

    const handleSpeak = () => {
        if (vietnameseVoice) {
            speak({
                text: text,
                voice: vietnameseVoice,
            });
        } else {
            alert("Trình duyệt không hỗ trợ tiếng Việt!");
        }
    };

    return (
        <div>
            <button onClick={handleSpeak}>🔊 Đọc</button>
            <button onClick={cancel}>⏹ Dừng</button>
        </div>
    );
}

export default TextToSpeech;
