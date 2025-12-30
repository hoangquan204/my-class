import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { Volume2, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function FlashCardTopic({cards}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState([]);
  const [reviewed, setReviewed] = useState([]);

//   const cards = [
//   { en: "apple", vi: "quả táo" },
//   { en: "banana", vi: "quả chuối" },
//   { en: "book", vi: "quyển sách" },
//   { en: "friend", vi: "bạn bè" },
// ];


  const currentCard = cards[currentIndex];
  const progress = (learned.length / cards.length) * 100;

  // Phát âm tiếng Anh
  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
  };

  const handleFlip = () => setFlipped(!flipped);

  const handleRemember = (remembered) => {
    if (!reviewed.includes(currentIndex)) {
      setReviewed([...reviewed, currentIndex]);
      if (remembered) setLearned([...learned, currentIndex]);
    }
    if (currentIndex < cards.length - 1) {
      setFlipped(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setLearned([]);
    setReviewed([]);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-semibold text-primary">
        Flashcard
      </h2>

      <div className="w-full flex justify-center">
        <motion.div
          className="relative w-80 h-48 cursor-pointer"
          onClick={handleFlip}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Mặt trước */}
          <Card className="absolute w-full h-full flex items-center justify-center text-2xl font-bold shadow-md bg-blue-50 backface-hidden">
            <CardContent className="flex flex-col items-center gap-2">
              <span>{currentCard.en}</span>
              <Button size="icon" onClick={(e) => { e.stopPropagation(); speak(currentCard.en); }}>
                <Volume2 size={18} />
              </Button>
            </CardContent>
          </Card>

          {/* Mặt sau */}
          <Card className="absolute w-full h-full flex items-center justify-center text-xl font-medium shadow-md bg-green-50 rotate-y-180 backface-hidden">
            <CardContent>
              <span>{currentCard.vi}</span>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => handleRemember(false)}
          disabled={reviewed.includes(currentIndex)}
        >
          Chưa nhớ
        </Button>
        <Button
          variant="default"
          onClick={() => handleRemember(true)}
          disabled={reviewed.includes(currentIndex)}
        >
          Đã nhớ
        </Button>
      </div>

      <div className="w-64 bg-gray-200 rounded-full h-2 mt-4">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-sm text-gray-600">
        {learned.length}/{cards.length} đã nhớ
      </div>

      {reviewed.length === cards.length && (
        <Button onClick={handleRestart} className="flex items-center gap-2">
          <RotateCcw size={16} /> Học lại
        </Button>
      )}
    </div>
  );
}
