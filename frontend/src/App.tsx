import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./layout/MainLayout";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";

import {Toaster} from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";
import RegisterPage from "@/pages/register/RegisterPage.tsx";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {useEffect} from "react";
import LoginPage from "@/pages/login/LoginPage.tsx";
import ProfilePage from "@/pages/profile/ProfilePage.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";

function App() {
    const { checkAdminStatus } = useAuthStore();
    useEffect(() => {
        checkAdminStatus();
    }, []);

    return (
        <>
            <Routes>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/admin' element={<AdminPage/>}/>

                <Route element={<MainLayout/>}>
                    <Route
                        path='/'
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/profile'
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/albums/:albumId'
                        element={
                            <ProtectedRoute>
                                <AlbumPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path='*' element={<NotFoundPage/>}/>
                </Route>
            </Routes>
            <Toaster/>
        </>
    );
}

export default App;