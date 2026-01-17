import axios from "axios";
import { Modal } from "bootstrap";
import React, { useEffect, useRef, useState } from "react";

import type { productType } from "./types/productType";

import Login from "./components/Login";
import ProductModalComponent from "./components/ProductModalComponent";
import Table from "./components/Table";

const App = () => {
  // week1 - 產品列表
  const [productList, setProductList] = useState<productType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<productType | null>(
    null,
  );

  // week2 - .env 的資訊
  const API_BASE_URL = import.meta.env.VITE_API_BASE;
  const API_PATH = import.meta.env.VITE_API_PATH;

  // week2 - 設定全域baseURL
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  // week2 - 驗證登入狀態
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // week2 - 取得產品api
  const fetchProducts = async () => {
    try {
      const token = document.cookie
        .split(";")
        .find((txt) => txt.startsWith("someCookieName="))
        ?.split("=")[1];
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token;
        const response = await axiosInstance.get(
          `/v2/api/${API_PATH}/admin/products`,
        );
        setProductList(response.data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // week2 - 檢查登入狀態api
  const verifyAuthentication = async () => {
    try {
      const token = document.cookie
        .split(";")
        .find((txt) => txt.startsWith("someCookieName="))
        ?.split("=")[1];
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token;
        const response = await axiosInstance.post("/v2/api/user/check");
        if (response.data.success) {
          setIsAuthenticated(true);
          fetchProducts();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // week2 - 檢查token自動登入
  useEffect(() => {
    verifyAuthentication();
  }, []);

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

  // week3 - Modal控制相關狀態
  const productModalRef = useRef<HTMLDivElement | null>(null);
  const productModal = useRef<Modal | null>(null);
  const [modalType, setModalType] = useState(""); // "create", "edit", "delete"

  // week3 - 產品資料模板
  const [templateData, setTemplateData] = useState(INITIAL_TEMPLATE_DATA);

  // week3 - 初始化時綁定 Modal
  useEffect(() => {
    if (productModalRef.current) {
      productModal.current = new Modal(productModalRef.current, {
        keyboard: false,
      });
    }
  }, [isAuthenticated]);

  return (
    <React.Fragment>
      {!isAuthenticated ? (
        // 沒有登入的狀態
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-3">
              <Login
                axiosInstance={axiosInstance}
                fetchProducts={fetchProducts}
                setIsAuthenticated={setIsAuthenticated}
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
                API_PATH={API_PATH}
                productList={productList}
                productModal={productModal}
                setModalType={setModalType}
                axiosInstance={axiosInstance}
                fetchProducts={fetchProducts}
                setTemplateData={setTemplateData}
                setSelectedProduct={setSelectedProduct}
                INITIAL_TEMPLATE_DATA={INITIAL_TEMPLATE_DATA}
              />
              {/* Modal */}
              <ProductModalComponent
                API_PATH={API_PATH}
                modalType={modalType}
                productModal={productModal}
                templateData={templateData}
                axiosInstance={axiosInstance}
                fetchProducts={fetchProducts}
                productModalRef={productModalRef}
                selectedProduct={selectedProduct}
                setTemplateData={setTemplateData}
              />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default App;

// 358 > 161
