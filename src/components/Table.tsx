import type { Modal } from "bootstrap";
import { Fragment, type RefObject } from "react";

import type { productType } from "../types/productType";
import EditProduct from "./EditProduct";

type TableProps = {
  productList: Array<productType>;
  setSelectedProduct: (p: productType) => void;
  deleteProduct: (p: string) => void;
  updateProduct: (p: string, data: any) => void;
  editProductModalRef: RefObject<HTMLDivElement | null>;
  editProductModal: RefObject<Modal | null>;
  selectedProduct: productType | null;
  openEditProductModal: () => void;
};

const Table = ({
  productList,
  setSelectedProduct,
  deleteProduct,
  updateProduct,
  editProductModalRef,
  editProductModal,
  selectedProduct,
  openEditProductModal,
}: TableProps) => {
  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">產品名稱</th>
            <th scope="col">原價</th>
            <th scope="col">售價</th>
            <th scope="col">是否啟用</th>
            <th scope="col">查看細節</th>
            <th scope="col">修改</th>
          </tr>
        </thead>

        <tbody>
          {productList.map((product: productType) => {
            return (
              <tr key={product.id}>
                <th scope="row">{product.category}</th>
                <th>{product.title}</th>
                <td>{product.origin_price}</td>
                <td>{product.price}</td>
                <td>{product.is_enabled ? "啟用" : "不啟用"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedProduct(product);
                    }}
                  >
                    查看
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      setSelectedProduct(product);
                      openEditProductModal();
                    }}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      deleteProduct(product.id);
                    }}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <EditProduct
        selectProduct={selectedProduct}
        editProductModalRef={editProductModalRef}
        editProductModal={editProductModal}
        editProduct={updateProduct}
      />
    </Fragment>
  );
};

export default Table;
