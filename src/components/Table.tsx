import type { Modal } from "bootstrap";
import { Fragment, type RefObject } from "react";

import type { productType } from "../types/productType";

// type TableProps = {
//   productList: Array<productType>;
//   setSelectedProduct: (p: productType) => void;
//   deleteProduct: (p: string) => void;
//   updateProduct: (p: string, data: any) => void;
//   productModalRef: RefObject<HTMLDivElement | null>;
//   productModal: RefObject<Modal | null>;
//   selectedProduct: productType | null;
//   openModal: () => void;
// };

const Table = ({
  productList,
  setSelectedProduct,
  deleteProduct,
  openModal,
}: any) => {
  return (
    <Fragment>
      <h2>產品列表</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">產品名稱</th>
            <th scope="col">原價</th>
            <th scope="col">售價</th>
            <th scope="col">是否啟用</th>
            {/* <th scope="col">查看細節</th> */}
            <th scope="col">編輯</th>
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
                <td className={product.is_enabled ? "text-success" : ""}>
                  {product.is_enabled ? "啟用" : "未啟用"}
                </td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        setSelectedProduct(product);
                        openModal(product, "edit");
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
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Table;
