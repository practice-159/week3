import type { Modal } from "bootstrap";

import type { productType } from "./productType";

export type tableType = {
  productList: productType[];
  INITIAL_TEMPLATE_DATA: Omit<productType, "id" | "num">;
  productModal: React.RefObject<Modal | null>;
  setTemplateData: React.Dispatch<React.SetStateAction<productType>>;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
};
