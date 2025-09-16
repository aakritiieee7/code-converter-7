/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./lib/themeContext.tsx":
/*!******************************!*\
  !*** ./lib/themeContext.tsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider),\n/* harmony export */   useTheme: () => (/* binding */ useTheme)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({\n    theme: 'light',\n    toggleTheme: ()=>console.warn('no theme provider')\n});\nconst useTheme = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);\nconst ThemeProvider = ({ children })=>{\n    const [theme, setTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('light');\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"ThemeProvider.useEffect\": ()=>{\n            const savedTheme = localStorage.getItem('theme');\n            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;\n            const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');\n            setTheme(initialTheme);\n            if (initialTheme === 'dark') {\n                document.documentElement.classList.add('dark');\n            } else {\n                document.documentElement.classList.remove('dark');\n            }\n        }\n    }[\"ThemeProvider.useEffect\"], []);\n    const toggleTheme = ()=>{\n        setTheme((prevTheme)=>{\n            const newTheme = prevTheme === 'light' ? 'dark' : 'light';\n            localStorage.setItem('theme', newTheme);\n            if (newTheme === 'dark') {\n                document.documentElement.classList.add('dark');\n            } else {\n                document.documentElement.classList.remove('dark');\n            }\n            return newTheme;\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n        value: {\n            theme,\n            toggleTheme\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/aakritirajhans/Downloads/code-converter-main/client/lib/themeContext.tsx\",\n        lineNumber: 47,\n        columnNumber: 5\n    }, undefined);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2xpYi90aGVtZUNvbnRleHQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBeUY7QUFPekYsTUFBTUssNkJBQWVKLG9EQUFhQSxDQUFtQjtJQUNuREssT0FBTztJQUNQQyxhQUFhLElBQU1DLFFBQVFDLElBQUksQ0FBQztBQUNsQztBQUVPLE1BQU1DLFdBQVcsSUFBTVIsaURBQVVBLENBQUNHLGNBQWM7QUFFaEQsTUFBTU0sZ0JBQWdCLENBQUMsRUFBRUMsUUFBUSxFQUEyQjtJQUNqRSxNQUFNLENBQUNOLE9BQU9PLFNBQVMsR0FBR1QsK0NBQVFBLENBQUM7SUFFbkNELGdEQUFTQTttQ0FBQztZQUNSLE1BQU1XLGFBQWFDLGFBQWFDLE9BQU8sQ0FBQztZQUN4QyxNQUFNQyxjQUFjQyxPQUFPQyxVQUFVLElBQUlELE9BQU9DLFVBQVUsQ0FBQyxnQ0FBZ0NDLE9BQU87WUFDbEcsTUFBTUMsZUFBZVAsY0FBZUcsQ0FBQUEsY0FBYyxTQUFTLE9BQU07WUFFakVKLFNBQVNRO1lBQ1QsSUFBSUEsaUJBQWlCLFFBQVE7Z0JBQzNCQyxTQUFTQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDO1lBQ3pDLE9BQU87Z0JBQ0xILFNBQVNDLGVBQWUsQ0FBQ0MsU0FBUyxDQUFDRSxNQUFNLENBQUM7WUFDNUM7UUFDRjtrQ0FBRyxFQUFFO0lBRUwsTUFBTW5CLGNBQWM7UUFDbEJNLFNBQVMsQ0FBQ2M7WUFDUixNQUFNQyxXQUFXRCxjQUFjLFVBQVUsU0FBUztZQUNsRFosYUFBYWMsT0FBTyxDQUFDLFNBQVNEO1lBRTlCLElBQUlBLGFBQWEsUUFBUTtnQkFDdkJOLFNBQVNDLGVBQWUsQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUM7WUFDekMsT0FBTztnQkFDTEgsU0FBU0MsZUFBZSxDQUFDQyxTQUFTLENBQUNFLE1BQU0sQ0FBQztZQUM1QztZQUVBLE9BQU9FO1FBQ1Q7SUFDRjtJQUVBLHFCQUNFLDhEQUFDdkIsYUFBYXlCLFFBQVE7UUFBQ0MsT0FBTztZQUFFekI7WUFBT0M7UUFBWTtrQkFDaERLOzs7Ozs7QUFHUCxFQUFFIiwic291cmNlcyI6WyIvVXNlcnMvYWFrcml0aXJhamhhbnMvRG93bmxvYWRzL2NvZGUtY29udmVydGVyLW1haW4vY2xpZW50L2xpYi90aGVtZUNvbnRleHQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlLCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5cbmludGVyZmFjZSBUaGVtZUNvbnRleHRUeXBlIHtcbiAgdGhlbWU6IHN0cmluZztcbiAgdG9nZ2xlVGhlbWU6ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IFRoZW1lQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8VGhlbWVDb250ZXh0VHlwZT4oe1xuICB0aGVtZTogJ2xpZ2h0JyxcbiAgdG9nZ2xlVGhlbWU6ICgpID0+IGNvbnNvbGUud2Fybignbm8gdGhlbWUgcHJvdmlkZXInKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgdXNlVGhlbWUgPSAoKSA9PiB1c2VDb250ZXh0KFRoZW1lQ29udGV4dCk7XG5cbmV4cG9ydCBjb25zdCBUaGVtZVByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfTogeyBjaGlsZHJlbjogUmVhY3ROb2RlIH0pID0+IHtcbiAgY29uc3QgW3RoZW1lLCBzZXRUaGVtZV0gPSB1c2VTdGF0ZSgnbGlnaHQnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHNhdmVkVGhlbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGhlbWUnKTtcbiAgICBjb25zdCBwcmVmZXJzRGFyayA9IHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcbiAgICBjb25zdCBpbml0aWFsVGhlbWUgPSBzYXZlZFRoZW1lIHx8IChwcmVmZXJzRGFyayA/ICdkYXJrJyA6ICdsaWdodCcpO1xuICAgIFxuICAgIHNldFRoZW1lKGluaXRpYWxUaGVtZSk7XG4gICAgaWYgKGluaXRpYWxUaGVtZSA9PT0gJ2RhcmsnKSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGFyaycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGFyaycpO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IHRvZ2dsZVRoZW1lID0gKCkgPT4ge1xuICAgIHNldFRoZW1lKChwcmV2VGhlbWUpID0+IHtcbiAgICAgIGNvbnN0IG5ld1RoZW1lID0gcHJldlRoZW1lID09PSAnbGlnaHQnID8gJ2RhcmsnIDogJ2xpZ2h0JztcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aGVtZScsIG5ld1RoZW1lKTtcblxuICAgICAgaWYgKG5ld1RoZW1lID09PSAnZGFyaycpIHtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RhcmsnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrJyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiBuZXdUaGVtZTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxUaGVtZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgdGhlbWUsIHRvZ2dsZVRoZW1lIH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvVGhlbWVDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufTsiXSwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiVGhlbWVDb250ZXh0IiwidGhlbWUiLCJ0b2dnbGVUaGVtZSIsImNvbnNvbGUiLCJ3YXJuIiwidXNlVGhlbWUiLCJUaGVtZVByb3ZpZGVyIiwiY2hpbGRyZW4iLCJzZXRUaGVtZSIsInNhdmVkVGhlbWUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicHJlZmVyc0RhcmsiLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImluaXRpYWxUaGVtZSIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwicHJldlRoZW1lIiwibmV3VGhlbWUiLCJzZXRJdGVtIiwiUHJvdmlkZXIiLCJ2YWx1ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./lib/themeContext.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_themeContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/themeContext */ \"(pages-dir-node)/./lib/themeContext.tsx\");\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_lib_themeContext__WEBPACK_IMPORTED_MODULE_2__.ThemeProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/Users/aakritirajhans/Downloads/code-converter-main/client/pages/_app.tsx\",\n            lineNumber: 7,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/aakritirajhans/Downloads/code-converter-main/client/pages/_app.tsx\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBK0I7QUFFcUI7QUFDcEQsU0FBU0MsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUMvQyxxQkFDRSw4REFBQ0gsNERBQWFBO2tCQUNaLDRFQUFDRTtZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9hYWtyaXRpcmFqaGFucy9Eb3dubG9hZHMvY29kZS1jb252ZXJ0ZXItbWFpbi9jbGllbnQvcGFnZXMvX2FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnO1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICcuLi9saWIvdGhlbWVDb250ZXh0JztcbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8VGhlbWVQcm92aWRlcj5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L1RoZW1lUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE15QXBwOyJdLCJuYW1lcyI6WyJUaGVtZVByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();