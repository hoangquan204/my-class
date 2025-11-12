import { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Badge, Box, Chip, IconButton, Link, Paper, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getHelperSelector } from "../../redux/selector";
import ArticleIcon from '@mui/icons-material/Article';
import { Button } from "react-scroll";
import { useNavigate } from "react-router-dom";

const hintData = {
  'Cách tạo lớp học': {
    answer: 'Để tạo dự án, bạn cần đăng nhập tài khoản sau đó chọn mục "Lớp học của tôi", sau đó click vào nút có biểu tượng dấu + để thực hiện tạo lớp học. ',
    link: '/'
  },
  'Đăng ký tài khoản': {
    answer: 'Để đăng ký tài khoản, bạn click vào nút SIGN IN trên menu chính hoặc thực hiện ',
    link: '/'
  },
  'Tham gia lớp học': {
    answer: 'Để tham gia các cuộc thi, bạn chọn mục "Danh sách lớp học" tại menu chính, sau đó chọn lớp học mà mình muốn tham gia',
    link: '/'
  },
  'Làm bài tập': {
    answer: 'Để thực hiện các bài tập bạn cần chọn lớp học của mình, sau đó chọn tab "Bài tập" để lựa chọn bài tập mà mình muốn thực hiện ',
    link: '/'
  },
}

// Khởi tạo AI
function Helper() {
  const [messages, setMessages] = useState([]);
  const [messageWikis, setMessageWikis] = useState([]);
  const [input, setInput] = useState("");
  const [inputWiki, setInputWiki] = useState("")

  const genAI = new GoogleGenerativeAI("AIzaSyBgRUI7djZi3G76J2eOqLas4wRAr-pthwA");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [open, setOpen] = useState(false)
  const [isOpenWiki, setOpenWiki] = useState(false)

  const helper = useSelector(getHelperSelector)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const bottomRef = useRef(null);
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `
            You are a helpful assistant. Here is some background information:
            1. Aways speak VietNamese
            2. Bạn sẽ là người hướng dẫn người sử dụng thực hiện các chức năng của trang website "My class"
            3. Lưu ý nói vừa đủ.
            4. Chức năng đăng ký web my class không có gửi mã OTP.
            5. Chức năng phản hồi của my class nằm ở mục kết nối trên thanh điều hướng; nhập thông tin vào form và nhấn gửi.
            6. Không có chức năng kết nối với admin chỉ có chức năng chat với bạn thôi.
            7. Lưu ý bạn chỉ cần nói cách thực hiện các chức năng thôi không hỏi thêm
            n. Dưới đây là thông tin trang web:
			${helper.data}
            """
            `,
          },
        ],
      },
    ],
  });

  useEffect(() => {
    const welcomeMessage = { role: "bot", text: "Chào mừng bạn đến với My class! Tôi là Chatbot, bạn có cần tôi giúp gì không?" };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await chat.sendMessage(userMessage.text);
      const botMessage = { role: "bot", text: response.response.text() };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = { role: "bot", text: "Xin lỗi, hệ thống AI đang quá tải. Vui lòng thử lại sau vài phút." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchWikipedia = async () => {
    try {
      const apiUrl = `https://vi.wikipedia.org/api/rest_v1/page/summary/${inputWiki.replaceAll(" ", "_")}`;
      const response = await fetch(
        apiUrl
      );
      console.log(apiUrl);


      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setMessageWikis(prevMessageWikis => [...prevMessageWikis, { text: `${data.extract}`, sender: 'admin', link: data?.content_urls?.desktop.page, img: data?.thumbnail?.source ? data.thumbnail.source : '' }]);
    } catch (error) {
      console.error(error);
      setMessageWikis(prevMessageWikis => [...prevMessageWikis, { text: 'Không thể lấy thông tin.', sender: 'admin', link: '' }]);
    } finally {

    }
  };

  const sendMessageWiki = () => {
    if (inputWiki.trim()) {
      setMessageWikis([...messageWikis, { text: inputWiki, sender: 'user' }]);
      setInputWiki('');
      // Giả lập phản hồi từ admin
      setTimeout(() => {
        console.log(inputWiki)
        fetchWikipedia()
      }, 2000);
    }

  }

  return (
    <Box sx={{ zIndex: 100 }}>
      <IconButton
        onClick={handleOpen}
        sx={{
          zIndex: 49,
          position: 'fixed',
          bottom: 80,
          right: 20,
          width: 50,
          height: 50,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        <SmartToyIcon ></SmartToyIcon>
      </IconButton>
      {
        open &&
        <Paper
          sx={{
            zIndex: 50,
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 450,
            height: 600,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 2,
          }}

        >
          {isOpenWiki ?
            <>
              <Typography variant="h6" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "primary.main", color: "white", padding: 2, borderRadius: 1 }}>
                <div className='flex items-center gap-x-2'>
                  <ArticleIcon sx={{ fontSize: '60' }}></ArticleIcon>
                  <div className='flex flex-col'>
                    <Typography variant='subtitle1'>Wikipedia</Typography>
                    <Typography variant='caption'>Nội dung bài viết được tìm kiếm tại Wikipedia</Typography>
                  </div>
                </div>
                <IconButton sx={{ color: 'white' }} onClick={handleClose}><RemoveIcon /></IconButton>
              </Typography>
              <Box sx={{ overflowY: "auto", flexGrow: 1, padding: 1 }}>
                {messageWikis.map((message, index) => (
                  <Box key={index} sx={{ marginBottom: 1, display: 'flex', justifyContent: message.sender === "user" ? "flex-end" : "flex-start" }}>
                    <Box sx={{
                      backgroundColor: message.sender === "user" ? "primary.light" : "#E5E5EA",
                      padding: 1,
                      borderRadius: 2,
                      maxWidth: "70%",
                      wordWrap: "break-word",
                      color: message.sender === "user" ? "white" : "black",
                    }}>
                      <div>
                        {message.img &&
                          <img className='w-[200px] object-cover rounded-md' src={message.img}>
                          </img>
                        }
                        <span>
                          {message.text}
                        </span>
                        {message.link &&
                          <>
                            <br />
                            <Link href={message.link} target='_blank'>Xem chi tiết</Link >
                          </>
                        }
                      </div>
                    </Box>
                  </Box>

                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  value={inputWiki}
                  placeholder="Nhập nội dung tìm kiếm..."
                  onChange={(e) => setInputWiki(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessageWiki()}
                  sx={{ flex: 1, mr: 1 }}
                />
                <IconButton className="my-2" onClick={sendMessageWiki} color={inputWiki.length > 0 ? "primary" : "default"}>
                  <SendIcon />
                </IconButton>
              </Box>
              <Button onClick={() => {
                setOpenWiki(false)
              }}>Chatbot</Button>
            </> :
            <>
              <Typography variant="h6" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "primary.main", color: "white", padding: 2, borderRadius: 1 }}>
                <div className='flex items-center gap-x-2'>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <SmartToyIcon sx={{ fontSize: '60' }}></SmartToyIcon>
                  </StyledBadge>
                  <div className='flex flex-col'>
                    <Typography variant='subtitle1'>Nhắn tin với Chatbot</Typography>
                    <Typography variant='caption'>Thường trả lời sau vài giây</Typography>
                  </div>
                </div>
                <IconButton sx={{ color: 'white' }} onClick={handleClose}><RemoveIcon /></IconButton>
              </Typography>

              <Box sx={{ overflowY: "auto", flexGrow: 1, padding: 1 }}>
                {messages.map((msg, index) => (
                  <Box key={index} sx={{ marginBottom: 1, display: 'flex', justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                    <Box sx={{
                      backgroundColor: msg.role === "user" ? "primary.light" : "#E5E5EA",
                      padding: 1,
                      borderRadius: 2,
                      maxWidth: "70%",
                      wordWrap: "break-word",
                      color: msg.role === "user" ? "white" : "black",
                    }}>
                      {msg.text}
                    </Box>
                  </Box>
                ))}
                <div ref={bottomRef}></div>
              </Box>
              <Box className='flex flex-wrap gap-x-1 gap-y-1 py-2'>
                {Object.keys(hintData).map((item) => {
                  return <Chip color='primary' key={item} onClick={() => {
                    setInput(item)
                  }} label={item} variant="outlined" />
                })}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  variant="outlined"
                  size="small"
                  value={input}
                  placeholder="Nhập tin nhắn..."
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  sx={{ flex: 1, mr: 1 }}
                />
                <IconButton className="my-2" onClick={sendMessage} color={input.length > 0 ? "primary" : "default"}>
                  <SendIcon />
                </IconButton>
              </Box>
              <Button onClick={() => {
                setOpenWiki(true)
              }}>
                Wikipedia
              </Button>
            </>
          }
        </Paper>
      }
    </Box>
  );
}

export default Helper;
