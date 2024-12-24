import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import slider1 from '../../images/slider1.png'
import slider2 from '../../images/slider2.png'

const items = [
    <Card sx={{ width: 500, height: 300 }}>
        <CardActionArea>
            <CardMedia
                sx={{ height: 200, objectFit: 'cover' }}
                component="img"
                height="140"
                image={slider1}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Khuyến mãi mùa tựu trường ☀️
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Giảm giá từ 10 - 20% cho học sinh, sinh viên toàn quốc khi mua Laptop!
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>,
    <Card sx={{ width: 500, height: 300 }}>
        <CardActionArea>
            <CardMedia
                sx={{ height: 200, objectFit: 'cover' }}
                component="img"
                image={slider2}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Mua laptop nhận quà ngay ☀️☀️
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Tặng ngay chuột không dây, balo, bình nước khi mua Laptop trong tháng 10!
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>,
    <Card sx={{ width: 500, height: 300 }}>
        <CardActionArea>
            <CardMedia
                sx={{ height: 200, objectFit: 'cover' }}
                component="img"
                image={slider1}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Siêu sale tháng 10 ☀️☀️☀️
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Giảm giá 5% tất cả các sản phẩm khi mua tại cửa hàng!
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>,
];

function Slider() {
    return <>
        <div className='w-full mx-auto py-4'>
            <Typography variant='h5' className='px-1  border-l-4 border-primary text-primary py-2' >
                Discount
            </Typography>
            <div className='py-2'>
                <AliceCarousel
                    paddingRight={660}
                    animationDuration={5000}
                    autoPlay
                    autoPlayStrategy="none"
                    infinite
                    touchTracking={false}
                    disableButtonsControls
                    items={items}
                />
            </div>
        </div>
    </>
};

export default Slider;