import axios from "axios";
import { Modal } from "bootstrap";
import React, { useEffect, useRef, useState } from "react";

import type { productType } from "../types/productType";
import ProductModalComponent from "./ProductModalComponent";
import Table from "./Table";

const Login = () => {
  // .env 的資訊
  const API_BASE_URL = import.meta.env.VITE_API_BASE;
  const API_PATH = import.meta.env.VITE_API_PATH;
  const DEFAULT_EMAIL = import.meta.env.VITE_EMAIL;
  const DEFAULT_PASSWORD = import.meta.env.VITE_PASSWORD;

  // * 設定全域baseURL
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [account, setAccount] = useState<{
    username: string;
    password: string;
  }>({
    username: DEFAULT_EMAIL,
    password: DEFAULT_PASSWORD,
  });

  // week3
  // 產品資料
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

  // week3
  // Modal控制相關狀態
  const productModalRef = useRef<HTMLDivElement | null>(null);
  const productModal = useRef<Modal | null>(null);
  const [modalType, setModalType] = useState(""); // "create", "edit", "delete"

  // week2
  useEffect(() => {
    verifyAuthentication();
  }, []);

  // week3 - 初始化時綁定 Modal
  // * 使用JS 操作 Modal
  useEffect(() => {
    if (productModalRef.current) {
      productModal.current = new Modal(productModalRef.current, {
        keyboard: false,
      });
    }
  }, [isAuthenticated]);

  // week3
  // 產品資料模板
  const [templateData, setTemplateData] = useState(INITIAL_TEMPLATE_DATA);

  // week3
  // 開啟 Modal
  const openModal = (product: any, type: any) => {
    if (productModal.current) {
      // console.log(product);
      setTemplateData((prevData) => ({ ...prevData, ...product }));
      setModalType(type);
      productModal.current.show();
    }
  };

  // week3 - 移除產品 - 成功加入
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
        console.log(response);
        // 移除產品後重新發送一次取得產品的request，讓畫面顯示最新的資料
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // week3 - 編輯產品
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

  // week1
  const [selectedProduct, setSelectedProduct] = useState<productType | null>(
    null,
  );
  const [productList, setProductList] = useState<productType[]>([]);

  // week1
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount((preData) => {
      const { name, value } = e.target;
      return { ...preData, [name]: value };
    });
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      let res = await axiosInstance.post(`/v2/admin/signin`, account);
      const { token, expired } = res.data;
      document.cookie = `someCookieName=${token}; expires=${new Date(expired)}`;
      axiosInstance.defaults.headers.common["Authorization"] = token;
      fetchProducts();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.log(error);
    }
  };

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

  // week2 - 取得產品
  const fetchProducts = async () => {
    try {
      const token = document.cookie
        .split(";")
        .find((txt) => txt.startsWith("someCookieName="))
        ?.split("=")[1];
      console.log("token:" + token);
      if (token) {
        const response = await axiosInstance.get(
          `/v2/api/${API_PATH}/admin/products`,
        );
        setProductList(response.data.products);
        console.log(response);
      }
    } catch (error) {
      console.log("又該是這裡");
      console.error(error);
      console.log("又該是這裡");
    }
  };

  return (
    <React.Fragment>
      {!isAuthenticated ? (
        // 沒有登入的狀態
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-3">
              <form
                onSubmit={(e) => {
                  handleLoginSubmit(e);
                }}
              >
                <div className="form-group">
                  <label htmlFor="username">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    id="username"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={account.username}
                    onChange={(e) => handleLoginInputChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={account.password}
                    onChange={(e) => handleLoginInputChange(e)}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  登入
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        // 有登入的狀態
        <div className="container mt-5">
          <div className="row">
            <div className="col text-center">
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
              {/* 產品列表 */}
              <Table
                productList={productList}
                setSelectedProduct={setSelectedProduct}
                deleteProduct={deleteProduct}
                updateProduct={updateProduct}
                productModalRef={productModalRef}
                productModal={productModal}
                selectedProduct={selectedProduct}
                openModal={openModal}
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

export default Login;

// 358
