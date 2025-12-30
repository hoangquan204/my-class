// components/FlashcardTopics.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import FlashCardModal from "./FlashCardModal";
import { useDispatch, useSelector } from "react-redux";
import { get } from "react-scroll/modules/mixins/scroller";
import { getAuthSelector, getClassRoomSelector, getFlashCardSelector, getThemeSelector } from "../../redux/selector";
import { getListFlashCard } from "./flashcardSlice";
import FlashCardCreationModal from "./FlashCardCreationModal";

export default function FlashCards({ classRoomId }) {
  const flashcard = useSelector(getFlashCardSelector);

  const theme = useSelector(getThemeSelector)

  // const auth = useSelector(getAuthSelector)

  // const classRoom = useSelector(getClassRoomSelector)

  const dispatch = useDispatch()

  useEffect(() => {
  if (classRoomId) {
    dispatch(getListFlashCard(classRoomId));
  }
}, [classRoomId]);


  //  const [selectedClassRoom, setSelectedClassRoom] = useState({})
  
  //     useEffect(() => {
  //         const result = classRoom?.listAll?.find((item) => {
  //             console.log('item: ', item)
  //             return item.id === parseInt(classRoomId)
  //         })
  //         setSelectedClassRoom(result)
  //     }, [])

    // data/flashcardTopics.js
//  const flashcardTopics = [
//   {
//     id: 1,
//     name: "Trái cây",
//     description: "Các loại trái cây cơ bản",
//     image: "https://cdn.pixabay.com/photo/2025/11/06/10/17/flying-9940425_1280.jpg",
//     cards: [
//       { en: "apple", vi: "quả táo" },
//       { en: "banana", vi: "quả chuối" },
//       { en: "orange", vi: "quả cam" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Động vật",
//     description: "Các loài động vật phổ biến",
//     image: "https://cdn.pixabay.com/photo/2025/11/06/19/16/beach-9941440_1280.jpg",
//     cards: [
//       { en: "cat", vi: "con mèo" },
//       { en: "dog", vi: "con chó" },
//       { en: "bird", vi: "con chim" },
//     ],
//   },
//   {
//     id: 3,
//     name: "Đồ vật",
//     description: "Các đồ vật xung quanh",
//     image: "https://cdn.pixabay.com/photo/2025/10/16/08/18/shark-9897726_1280.jpg",
//     cards: [
//       { en: "book", vi: "quyển sách" },
//       { en: "pen", vi: "cái bút" },
//       { en: "chair", vi: "cái ghế" },
//     ],
//   },
// ];

  return (
    <Box>
       {
          // auth?.userDetail?.id === selectedClassRoom?.teacher?.id &&
            <div className="py-2 text-center">
              <FlashCardCreationModal classRoomId={classRoomId}></FlashCardCreationModal>
            </div>
      }
    <Box className='flex flex-col gap-y-2 py-4'>
      {Array.isArray(flashcard?.list) && flashcard.list.length > 0 ?
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {flashcard?.list.map((topic) => (
            <Card
              key={topic.id}
              className="relative overflow-hidden cursor-pointer rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Ảnh nền */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${'https://cdn.pixabay.com/photo/2025/11/06/10/17/flying-9940425_1280.jpg'})` }}
              />

              <CardContent className="relative flex flex-col justify-between h-64 p-6">
                <div>
                  <Typography variant="h5" fontWeight="bold" className="text-primary drop-shadow-lg">
                    {topic.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="mt-2 drop-shadow-sm"
                  >
                    {topic.description}
                  </Typography>
                </div>
                <FlashCardModal cards={topic.cards}></FlashCardModal>
              </CardContent>
            </Card>
          ))}
        </div> : (
        <Box
            className="flex flex-col items-center justify-center"
            sx={{ textAlign: "center", color: theme.palette.textColor.main, py: 4 }}
        >
            <Typography variant="h6" gutterBottom>
                Chưa có thẻ ghi nhớ nào!
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Hãy theo dõi thường xuyên để nhận được thẻ ghi nhớ mới nhé.
            </Typography>
        </Box>
       )}
    </Box>
    </Box>
  );
}
