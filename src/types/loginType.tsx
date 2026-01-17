import type { AxiosInstance } from "axios";

export type loginType = {
  fetchProducts: () => Promise<void>;
  setIsAuthenticated: (value: React.SetStateAction<boolean>) => void;
  axiosInstance: AxiosInstance;
};
