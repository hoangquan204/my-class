// components/CreateFlashcardTopicModal.jsx
import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { AddBox, Add, Close } from "@mui/icons-material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch } from "react-redux";
import { createFlashCard } from "./flashcardSlice";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

export default function FlashCardCreationModal({ classRoomId }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [cards, setCards] = useState([{ en: "", vi: "" }]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCardChange = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  const handleAddCard = () => setCards([...cards, { en: "", vi: "" }]);

  const handleRemoveCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const dispatch = useDispatch()

  const handleCreate = () => {
    const newTopic = {
      id: Date.now(), // tạo id tạm thời
      name,
      description,
      image,
      cards: cards.filter((c) => c.en && c.vi), // loại bỏ card trống
    };
    dispatch(createFlashCard({ name, description, cards, classRoomId }))
    console.log("data: ", { name, description, cards, classRoomId })
    handleOpen(newTopic);
    // Reset form
    setName("");
    setDescription("");
    setImage("");
    setCards([{ en: "", vi: "" }]);
    handleClose();
  };

  return (
    <div>

    <Button variant='outlined' onClick={handleOpen}>
                    <AddBoxIcon></AddBoxIcon>
                </Button>
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" fontWeight="bold">
            Tạo topic mới
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </div>

        <TextField
          label="Tên topic"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3"
        />
        <TextField
          label="Mô tả"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-3"
        />

        <Typography fontWeight="bold" mb={1}>
          Danh sách flashcard
        </Typography>

        {cards.map((card, index) => (
          <Box
            key={index}
            className="flex gap-2 mb-2 items-center"
          >
            <TextField
              label="Tiếng Anh"
              value={card.en}
              onChange={(e) => handleCardChange(index, "en", e.target.value)}
              fullWidth
            />
            <TextField
              label="Tiếng Việt"
              value={card.vi}
              onChange={(e) => handleCardChange(index, "vi", e.target.value)}
              fullWidth
            />
            {cards.length > 1 && (
              <IconButton onClick={() => handleRemoveCard(index)} color="error">
                <Close />
              </IconButton>
            )}
          </Box>
        ))}

        <Button
          startIcon={<Add />}
          onClick={handleAddCard}
          variant="outlined"
          className="mb-4"
        >
          Thêm flashcard
        </Button>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreate}
        >
          Tạo topic
        </Button>
      </Box>
    </Modal>
    </div>
  );
}
