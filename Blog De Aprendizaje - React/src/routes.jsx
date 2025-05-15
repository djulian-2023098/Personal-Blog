import { HomePage } from "./pages/HomePage/HomePage";
import { PublicationPage } from "./pages/PublicationPage/PublicationPage";

export const routes = [
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/publication/:id',
        element: <PublicationPage />
    }
]