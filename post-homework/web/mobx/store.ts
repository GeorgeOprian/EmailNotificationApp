import { createContext } from "react";
import { GlobalState } from "./globalState";

export const GlobalStateContext = createContext<GlobalState>(new GlobalState())
