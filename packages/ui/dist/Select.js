"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Select = ({ options, onSelect }) => {
    return (0, jsx_runtime_1.jsx)("select", { onChange: (e) => {
            onSelect(e.target.value);
        }, className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5", children: options.map(option => (0, jsx_runtime_1.jsx)("option", { value: option.key, children: option.value })) });
};
exports.Select = Select;
