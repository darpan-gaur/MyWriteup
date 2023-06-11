import axios from "axios";
import { createContext } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(locslStorage.getItem("user") || null))

    const login = async(inputs)=>{
        const res = await axios .post("/api/auth/login", inputs);
        setCurrentUser(res.data);
    };
    const logout = async(inputs)=>{
        const res = await axios .post("/api/auth/logout");
        setCurrentUser(null);
    };

    useEffect(()=>{
        locslStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser])
    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}