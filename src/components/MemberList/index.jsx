import React from "react";
import { Avatar, Box, Chip, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

function MemberList({ members = [], teacher }) {
    return (
        <Box>
            <Typography className="bg-primary text-white p-2 rounded-md" variant="h6" gutterBottom>
                Danh sách thành viên
            </Typography>
            {members.length > 0 ? (
                <List>
                    <ListItem
                        key={'teacher'}
                        sx={{
                            borderBottom: "1px solid #ddd",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                        selected={true}
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ListItemAvatar>
                                <Avatar src={teacher.avatar} alt={teacher.name}>
                                    {teacher.name[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                        {teacher.name}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        {teacher.email || "Không có email"}
                                    </Typography>
                                }
                            />
                        </Box>
                        <Chip
                            label="Giáo viên"
                            color="success"
                            variant="contained"
                        />
                    </ListItem>
                    {members.map((member, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                borderBottom: "1px solid #ddd",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <ListItemAvatar>
                                    <Avatar src={member.avatar} alt={member.name}>
                                        {member.name[0]}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                            {member.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                            {member.email || "Không có email"}
                                        </Typography>
                                    }
                                />
                            </Box>
                            <Chip
                                label="Học  viên"
                                color="success"
                                variant="outlined"
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 2 }}>
                    Không có thành viên nào trong lớp học.
                </Typography>
            )}
        </Box>
    );
}

export default MemberList;
