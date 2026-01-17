import { Fragment } from "react";

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
  INITIAL_TEMPLATE_DATA,
  productModal,
  axiosInstance,
  setTemplateData,
  setModalType,
  API_PATH,
  fetchProducts,
}: any) => {
  // week3 - 移除產品api
  const deleteProduct = async (id: string) => {
    try {
      const token = document.cookie
        .split(";")
        .find((txt) => txt.startsWith("someCookieName="))
        ?.split("=")[1];
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token;
        const response = await axiosInstance.delete(
          `/v2/api/${API_PATH}/admin/product/${id}`,
        );
        // 移除產品後重新發送一次取得產品的request，讓畫面顯示最新的資料
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // week3 - 開啟 Modal
  const openModal = (product: any, type: any) => {
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
                    role="group"
                    className="btn-group"
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
