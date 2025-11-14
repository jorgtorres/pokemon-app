import { useSelector } from "react-redux";
import { RootStoreType } from "./createStore";

const useTypedSelector = (): RootStoreType =>
  //@ts-ignore
  useSelector<RootStoreType>((state) => state);

export default useTypedSelector;
