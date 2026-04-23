"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
const jsx_runtime_1 = require("react/jsx-runtime");
function Card({ title, children, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "border p-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-xl border-b pb-2", children: title }), (0, jsx_runtime_1.jsx)("p", { children: children })] }));
}
