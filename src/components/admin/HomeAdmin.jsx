// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import WarehouseIcon from '@mui/icons-material/Warehouse';
// import GroupIcon from '@mui/icons-material/Group';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import MessageIcon from '@mui/icons-material/Message';
// import SellIcon from '@mui/icons-material/Sell';
// import StoreIcon from '@mui/icons-material/Store';
// import { Avatar, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import React, { useState } from 'react';
// import WarehouseTable from './menu/Warehouse';
// import { Route, Routes, useNavigate } from 'react-router-dom'
// import HomeIcon from '@mui/icons-material/Home';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAuthSelector, getThemeSelector } from '../../redux/selector';
// import Mail from '@mui/icons-material/Mail';
// import Account from './menu/Accounts';
// import Charts from './menu/Charts';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import authSlice from '../User/authSlice';
// import Settings from '@mui/icons-material/Settings';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Logout from '@mui/icons-material/Logout';
// import UserMessages from './menu/UserMessages'
// import News from './menu/News';
// import NewspaperIcon from '@mui/icons-material/Newspaper';
// import TextEditor from '../TextEditor';


// function HomeAdmin() {
//     const [menu, setMenu] = useState('Charts')

//     const navigate = useNavigate()

//     const auth = useSelector(getAuthSelector)
//     const theme = useSelector(getThemeSelector)

//     const [open, setOpen] = React.useState(false);

//     const [openAccount, setOpenAccount] = useState(false)

//     const toggleOpenAccount = () => {
//         setOpenAccount(!openAccount)
//     }

//     const handleClose = () => {
//         setOpenAccount(false)
//     }

//     const dispatch = useDispatch()

//     const handleLogout = () => {
//         dispatch(authSlice.actions.logOut())
//     }

//     const toggleDrawer = () => {
//         setOpen(!open);
//     };

//     const DrawerList = (
//         <Box sx={{ width: 250, height: '1500px' }} role="presentation" onClick={toggleDrawer}>
//             <List>
//                 <ListItem key={'charts'} disablePadding onClick={() => {
//                     setMenu('Charts')
//                     navigate("/admin")
//                 }}>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <BarChartIcon></BarChartIcon>
//                         </ListItemIcon>
//                         <ListItemText primary={'Charts'} />
//                     </ListItemButton>
//                 </ListItem>
//                 <ListItem key={'accounts'} disablePadding onClick={() => {
//                     setMenu('Accounts')
//                     navigate("/admin/account")
//                 }}>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <AccountBoxIcon></AccountBoxIcon>
//                         </ListItemIcon>
//                         <ListItemText primary={'Accounts'} />
//                     </ListItemButton>
//                 </ListItem>
//                 <ListItem key={'message'} disablePadding onClick={() => {
//                     setMenu('Message')
//                     navigate('/admin/messages')
//                 }}>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <MessageIcon></MessageIcon>
//                         </ListItemIcon>
//                         <ListItemText primary={'Message'} />
//                     </ListItemButton>
//                 </ListItem>
//                 <Divider></Divider>
//                 <ListItem key={'warehouse'} disablePadding onClick={() => {
//                     setMenu('Warehouse')
//                     navigate('/admin/warehouse')
//                 }}>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <WarehouseIcon></WarehouseIcon>
//                         </ListItemIcon>
//                         <ListItemText primary={'Warehouse'} />
//                     </ListItemButton>
//                 </ListItem>
//                 <ListItem key={'news'} disablePadding onClick={() => {
//                     setMenu('News')
//                     navigate('/admin/news')
//                 }}>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <NewspaperIcon></NewspaperIcon>
//                         </ListItemIcon>
//                         <ListItemText primary={'News'} />
//                     </ListItemButton>
//                 </ListItem>
//                 <ListItem key={'Revenue'} disablePadding onClick={() => {
//                     setMenu('Revenue')
//                 }}>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <MonetizationOnIcon></MonetizationOnIcon>
//                         </ListItemIcon>
//                         <ListItemText primary={'Revenue'} />
//                     </ListItemButton>
//                 </ListItem>
//                 <ListItem key={'discount'} disablePadding onClick={() => {
//                     setMenu('Discount')
//                 }}>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <SellIcon></SellIcon>
//                         </ListItemIcon>
//                         <ListItemText primary={'Discount'} />
//                     </ListItemButton>
//                 </ListItem>
//                 <ListItem key={'sell'} disablePadding onClick={() => {
//                     setMenu('Sell')
//                 }}>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <StoreIcon></StoreIcon>
//                         </ListItemIcon>
//                         <ListItemText primary={'Sell'} />
//                     </ListItemButton>
//                 </ListItem>
//             </List>
//         </Box>
//     )

//     return <Box className='min-h-[800px]'>
//         <Drawer open={open} onClose={toggleDrawer}>
//             {DrawerList}
//         </Drawer>
//         <Box className='w-full flex items-center justify-between bg-primary p-2'>
//             <div className='flex items-center gap-x-2 '>
//                 <Typography className='bg-[#000] px-2 rounded-md text-primary' variant='h5'>
//                     {menu}
//                 </Typography>
//                 <Button variant='contained' sx={{ bgcolor: 'primary' }} onClick={() => {
//                     toggleDrawer()
//                 }}>
//                     <ChevronRightIcon ></ChevronRightIcon>
//                 </Button>
//             </div>
//             <img className='w-[50px] h-[50px]' src={require('../../images/laptopstore_logo.png')} onClick={() => {
//                 navigate("/")
//             }}></img>
//             <div className='flex items-center gap-x-2'>
//                 <div className='relative'>
//                     <Avatar sx={{ width: 32, height: 32 }} onClick={toggleOpenAccount} src={auth?.userDetail?.avatar}></Avatar>
//                     {openAccount &&
//                         <div className={` bg-[${theme.palette.containerColor.main}] text-[${theme.palette.textColor.main}] transition-all min-w-[170px] absolute top-10 right-2 z-20 rounded-md`}>
//                             <div className={` flex cursor-pointer transition-all items-center gap-x-2 hover:bg-gray-400 p-2 rounded-md`} onClick={() => {
//                                 toggleOpenAccount()
//                                 navigate("/my-account")
//                             }}>
//                                 <AccountBoxIcon></AccountBoxIcon>
//                                 My account
//                             </div>
//                             <Divider />
//                             <div className='flex cursor-pointer transition-all items-center gap-x-2 hover:bg-gray-400 p-2 rounded-md' onClick={handleClose}>
//                                 <PersonAdd fontSize="small" />
//                                 Add another account
//                             </div>
//                             <div className='flex cursor-pointer transition-all items-center gap-x-2 hover:bg-gray-400 p-2 rounded-md' onClick={handleClose}>
//                                 <Settings fontSize="small" />
//                                 Settings
//                             </div>
//                             <div className='flex cursor-pointer transition-all items-center gap-x-2 hover:bg-gray-400 p-2 rounded-md' onClick={handleLogout}>
//                                 <Logout fontSize="small" />
//                                 Logout
//                             </div>
//                         </div>
//                     }
//                 </div>
//                 <IconButton>
//                     <Mail></Mail>
//                 </IconButton>
//             </div>
//         </Box>
//         <Box className='container mx-auto py-10'>
//             <Routes>
//                 <Route path='/' element={<Charts></Charts>}></Route>
//                 <Route path='/warehouse' element={<WarehouseTable></WarehouseTable>}></Route>
//                 <Route path='/account' element={<Account></Account>}></Route>
//                 <Route path='/messages' element={<UserMessages></UserMessages>}></Route>
//                 <Route path='/news' element={<News></News>}></Route>
//                 <Route path='/news/text-editor' element={<TextEditor></TextEditor>}></Route>
//             </Routes>
//         </Box>
//     </Box >
// }

// export default HomeAdmin;