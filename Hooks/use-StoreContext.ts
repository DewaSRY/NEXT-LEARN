import { useContext } from "react";
import { StoreContext } from "../Store";

export default function useStoreContext() {
  return useContext(StoreContext);
}
