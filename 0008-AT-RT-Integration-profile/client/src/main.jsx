import { createRoot } from 'react-dom/client'
import './app/App.css'
import { RouterProvider } from "react-router/dom";
import router from './app/app.routes.jsx';
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
