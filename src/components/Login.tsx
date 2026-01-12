import axios from "axios";
import { Modal } from "bootstrap";
import React, { useEffect, useRef, useState } from "react";

import type { productType } from "../types/productType";
import Card from "./Card";
import NewProduct from "./NewProduct";
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
  // 新增產品
  const newProductModalRef = useRef<HTMLDivElement | null>(null);
  const newProductModal = useRef<Modal | null>(null);
  // 修改產品
  const editProductModalRef = useRef<HTMLDivElement | null>(null);
  const editProductModal = useRef<Modal | null>(null);

  // week1
  const [selectedProduct, setSelectedProduct] = useState<productType | null>(
    null,
  );
  const [productList, setProductList] = useState<productType[]>([]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount((preData) => {
      const { name, value } = e.target;
      return { ...preData, [name]: value };
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        // console.log(response);
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
      const response = await axiosInstance.get(
        `/v2/api/${API_PATH}/admin/products`,
      );
      setProductList(response.data.products);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // week3 - 新增產品
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

  // * 使用JS 操作 Modal
  useEffect(() => {
    if (newProductModalRef.current) {
      newProductModal.current = new Modal(newProductModalRef.current);
    }
    if (editProductModalRef.current) {
      editProductModal.current = new Modal(editProductModalRef.current);
    }
  }, [isAuthenticated]);

  const openNewProductModal = () => {
    if (newProductModal.current) {
      newProductModal.current.show();
    }
  };

  const openEditProductModal = () => {
    if (editProductModal.current) {
      editProductModal.current.show();
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
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={account.username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={account.password}
                    onChange={handlePasswordChange}
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
          <div className="row row-cols-2">
            <div className="col text-center">
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  // data-bs-toggle="modal"
                  // data-bs-target="#exampleModal"
                  onClick={() => {
                    openNewProductModal();
                  }}
                >
                  新增產品
                </button>
              </div>
              {/* 確認登入狀態 */}
              {/* <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  checkLoginStatus();
                }}
              >
                確認登入狀態
              </button> */}
              {/* 左側列表 */}
              {/* Modal */}

              {/* 產品列表 */}
              <Table
                productList={productList}
                setSelectedProduct={setSelectedProduct}
                deleteProduct={deleteProduct}
                updateProduct={updateProduct}
                editProductModalRef={editProductModalRef}
                editProductModal={editProductModal}
                selectedProduct={selectedProduct}
                openEditProductModal={openEditProductModal}
              />

              {/* Modal */}
              <NewProduct
                newProductModalRef={newProductModalRef}
                createProduct={createProduct}
                newProductModal={newProductModal}
              />
            </div>
            <div className="col">
              {/* 右側列表 */}
              {selectedProduct && (
                <React.Fragment>
                  <div className="fs-2">商品明細</div>
                  <Card selectedProduct={selectedProduct} />
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Login;
