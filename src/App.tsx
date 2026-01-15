import axios from "axios";
import { Modal } from "bootstrap";
import React, { useEffect, useRef, useState } from "react";

import Login from "./components/Login";
import ProductModalComponent from "./components/ProductModalComponent";
import Table from "./components/Table";
import type { productType } from "./types/productType";

const App = () => {
  // 位置不會變了-----------------------------------------------

  // week2 - .env 的資訊
  const API_BASE_URL = import.meta.env.VITE_API_BASE;
  const API_PATH = import.meta.env.VITE_API_PATH;

  // week2 - 設定全域baseURL
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  // week1 - 產品列表
  const [productList, setProductList] = useState<productType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<productType | null>(
    null,
  );

  // week2 - 驗證登入狀態
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // week2 - 檢查token自動登入
  useEffect(() => {
    verifyAuthentication();
  }, []);

  // week2 - 檢查登入狀態
  const verifyAuthentication = async () => {
    try {
      const token = document.cookie
        .split(";")
        .find((txt) => txt.startsWith("someCookieName="))
        ?.split("=")[1];
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token;
        let response = await axiosInstance.post("/v2/api/user/check");
        if (response.data.success) {
          setIsAuthenticated(true);
          fetchProducts();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // week2 - 取得產品api
  const fetchProducts = async () => {
    try {
      const token = document.cookie
        .split(";")
        .find((txt) => txt.startsWith("someCookieName="))
        ?.split("=")[1];
      console.log("這裡是fetch");
      console.log("token:" + token);
      if (token) {
        const response = await axiosInstance.get(
          `/v2/api/${API_PATH}/admin/products`,
        );
        setProductList(response.data.products);
        console.log(response);
      }
    } catch (error) {
      console.log("這裡是fetch錯誤");
      console.error(error);
      console.log("這裡是fetch錯誤");
    }
  };

  // 位置不會變了-----------------------------------------------

  // 要移動位置的 ++++++++++++++++++++++++++++++++++++++

  // week3 - 新增產品的api(後面要移到modal component)
  const createProduct = async (data: Omit<productType, "id" | "num">) => {
    try {
      const token = document.cookie
        .split(";")
        .find((txt) => txt.startsWith("someCookieName="))
        ?.split("=")[1];
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token;
        let response = await axiosInstance.post(
          `/v2/api/${API_PATH}/admin/product`,
          {
            data: data,
          },
        );
        console.log(response.data.message);
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // week3 - 編輯產品api(後面要移到modal component)
  const updateProduct = async (id: string, data: any) => {
    try {
      const token = document.cookie
        .split(";")
        .find((txt) => txt.startsWith("someCookieName="))
        ?.split("=")[1];
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token;
        const response = await axiosInstance.put(
          `/v2/api/${API_PATH}/admin/product/${id}`,
          { data: data },
        );
        fetchProducts();
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 要移動位置的 ++++++++++++++++++++++++++++++++++++++
  // /////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////

  // week3 - Modal控制相關狀態
  const productModalRef = useRef<HTMLDivElement | null>(null);
  const productModal = useRef<Modal | null>(null);
  const [modalType, setModalType] = useState(""); // "create", "edit", "delete"

  // week3 - 產品資料
  const INITIAL_TEMPLATE_DATA = {
    title: "",
    category: "",
    origin_price: "",
    price: "",
    unit: "",
    description: "",
    content: "",
    is_enabled: "",
    imageUrl: "",
    imagesUrl: [""],
  };

  // week3 - 初始化時綁定 Modal
  useEffect(() => {
    if (productModalRef.current) {
      productModal.current = new Modal(productModalRef.current, {
        keyboard: false,
      });
    }
  }, [isAuthenticated]);

  // week3 - 產品資料模板
  const [templateData, setTemplateData] = useState(INITIAL_TEMPLATE_DATA);

  return (
    <React.Fragment>
      {!isAuthenticated ? (
        // 沒有登入的狀態
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-3">
              <Login
                fetchProducts={fetchProducts}
                setIsAuthenticated={setIsAuthenticated}
                axiosInstance={axiosInstance}
              />
            </div>
          </div>
        </div>
      ) : (
        // 有登入的狀態
        <div className="container mt-5">
          <div className="row">
            <div className="col text-center">
              {/* 產品列表 */}
              <Table
                productList={productList}
                setSelectedProduct={setSelectedProduct}
                // deleteProduct={deleteProduct}
                INITIAL_TEMPLATE_DATA={INITIAL_TEMPLATE_DATA}
                productModal={productModal}
                setTemplateData={setTemplateData}
                setModalType={setModalType}
                axiosInstance={axiosInstance}
                API_PATH={API_PATH}
                fetchProducts={fetchProducts}
              />
              {/* Modal */}
              <ProductModalComponent
                templateData={templateData}
                selectedProduct={selectedProduct}
                productModalRef={productModalRef}
                productModal={productModal}
                updateProduct={updateProduct}
                modalType={modalType}
                setTemplateData={setTemplateData}
                fetchProducts={fetchProducts}
                createProduct={createProduct}
              />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default App;

// 358
