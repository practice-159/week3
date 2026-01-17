import { Fragment } from "react";

import type { productType } from "../types/productType";
import type { tableType } from "../types/tableType";

const Table = ({
  productList,
  INITIAL_TEMPLATE_DATA,
  productModal,
  setTemplateData,
  setModalType,
}: tableType) => {
  // week3 - 開啟 Modal
  const openModal = (
    product: Omit<productType, "id" | "num">,
    type: string,
  ) => {
    if (productModal.current) {
      setTemplateData((prevData) => ({ ...prevData, ...product }));
      setModalType(type);
      productModal.current.show();
    }
  };
  return (
    <Fragment>
      <h2>產品列表</h2>
      {/* 新增產品的button */}
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            openModal(INITIAL_TEMPLATE_DATA, "create");
          }}
        >
          新增產品
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">產品名稱</th>
            <th scope="col">原價</th>
            <th scope="col">售價</th>
            <th scope="col">是否啟用</th>
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
                    role="group"
                    className="btn-group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        openModal(product, "edit");
                      }}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        openModal(product, "delete");
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
