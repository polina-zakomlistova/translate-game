import { Routes, Route } from 'react-router-dom';

//components
import Page1 from 'pages/Page1';
import NotFound from 'pages/NotFound';

function RoutesApp() {
    return (
        <Routes>
            <Route index element={<Page1 />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
export default RoutesApp;
