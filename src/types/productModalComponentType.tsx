import type { AxiosInstance } from "axios";

import { Modal } from "bootstrap";

import type { productType } from "./productType";
export type productModalComponentType = {
  templateData: productType;
  productModalRef: React.RefObject<HTMLDivElement | null>;
  productModal: React.RefObject<Modal | null>;
  modalType: string;
  setTemplateData: React.Dispatch<React.SetStateAction<productType>>;
  fetchProducts: () => Promise<void>;
  axiosInstance: AxiosInstance;
  API_PATH: string;
};
