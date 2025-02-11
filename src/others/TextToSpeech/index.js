export const textToSpeech = (text) => {
    // Kiểm tra nếu trình duyệt hỗ trợ SpeechSynthesis
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis; // Truy cập SpeechSynthesis API
        const utterance = new SpeechSynthesisUtterance(text); // Tạo đối tượng giọng nói

        // Lắng nghe sự thay đổi giọng nói
        synth.onvoiceschanged = () => {
            // Lấy danh sách giọng nói sau khi chúng đã được tải
            const voices = synth.getVoices();
            console.log(voices)
            const vietnameseVoice = voices.find(voice => voice.lang === 'vi-VN');

            // Nếu có giọng nói tiếng Việt, sử dụng nó
            if (vietnameseVoice) {
                utterance.voice = vietnameseVoice;
            }

            // Thiết lập cấu hình cho giọng nói
            utterance.lang = 'vi-VN'; // Chọn ngôn ngữ (tiếng Việt, Việt Nam)
            utterance.pitch = 1; // Độ cao giọng nói (0 đến 2)
            utterance.rate = 1; // Tốc độ nói (0.1 đến 10)
            utterance.volume = 1; // Âm lượng (0 đến 1)

            // Thực hiện nói
            synth.speak(utterance);
        };
    } else {
        console.error('Trình duyệt của bạn không hỗ trợ SpeechSynthesis.');
    }
}
