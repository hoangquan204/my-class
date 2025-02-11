import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getThemeSelector } from "../../redux/selector";

const Introduction = () => {
    const navigate = useNavigate()
    const theme = useSelector(getThemeSelector)

    const features = [
        {
            title: "Tạo Lớp Học",
            description: "Khởi tạo và quản lý lớp học của bạn một cách dễ dàng.",
            image: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1737363272/4_j84c3t.png",
            action: () => {
                navigate("/class")
            }
        },
        {
            title: "Tham Gia Lớp Học",
            description: "Đăng ký và tham gia các lớp học thú vị để tiếp thu các kiến thức hữu ích.",
            image: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1737363272/5_tcczuw.png",
            action: () => {
                navigate("/list-class")
            }
        },
        {
            title: "Hỗ trợ từ trợ lý ảo AI",
            description: "Trợ lý ảo AI - người bạn đồng hành trong quá trình học tập của bạn",
            image: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1737363272/6_lp4uxw.png",
            action: () => {
                navigate("/")
            }
        }
    ];

    return (
        <div className={`py-10 ${theme.palette.mode === 'light' ? 'bg-gray-100' : 'bg-inherit'} rounded-md flex items-center`}>
            <div>
                <h2 className="text-3xl font-bold text-center text-primary mb-6">TRẢI NGHIỆM TẠI MY CLASS</h2>
                <p className="text-center text-gray-600 mb-10">Khám phá các chức năng chính của hệ thống để bắt đầu quá trình học tập của bạn.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative group rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="w-full h-50 object-cover"
                            />
                            <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-white font-semibold ">{feature.description}</h3>
                                <button
                                    onClick={feature.action}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                >
                                    Bắt đầu ngay
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Introduction;
