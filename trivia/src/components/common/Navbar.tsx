import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AuthService from '../../services/AuthService';

const Navbar = () => {
    const [user, setUser] = useState<any>(null); 

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); 
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); 
    }, []);

    const handleLogout = async () => {
        try {
            await AuthService.signOut(); 
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="nav-left">
                    <Link to="/home">
                        <img src="logo.svg" alt="Icon" className="nav-icon" />
                    </Link>
                </div>
                <div className="nav-right">
                    {user ? (
                        <button onClick={handleLogout} className="nav-link">Logout</button>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
