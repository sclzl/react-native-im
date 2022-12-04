import { createContext } from "react";

interface ILoginContext {
    signIn: () => void;
}
export const LoginContext = createContext<ILoginContext | null>(null);