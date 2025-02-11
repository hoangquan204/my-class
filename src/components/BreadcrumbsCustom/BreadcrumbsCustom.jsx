import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getThemeSelector } from "../../redux/selector";

const BreadcrumbsCustom = ({ secondary, primary }) => {
    const navigate = useNavigate();
    const theme = useSelector(getThemeSelector);

    return (
        <div className={`flex items-center space-x-2 py-3 px-4 my-2 rounded-lg shadow-sm text-[${theme.palette.textColor.main}]`}>
            {secondary.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <span
                        className="text-gray-600 cursor-pointer transition-colors"
                        onClick={() => navigate(item.path)}
                    >
                        {item.title}
                    </span>
                    <span className="text-gray-400">›</span> {/* Ký tự > thay cho icon */}
                </div>
            ))}
            <span className="font-semibold text-primary">{primary}</span>
        </div>
    );
};

export default BreadcrumbsCustom;
