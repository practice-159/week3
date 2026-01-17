import type { productModalComponentType } from "../types/productModalComponentType";

const ProductModalComponent = ({
  templateData,
  productModalRef,
  productModal,
  modalType,
  setTemplateData,
  fetchProducts,
  axiosInstance,
  API_PATH,
}: productModalComponentType) => {
  // week3 - 設定 input onChange 的 function
  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateData((preData) => {
      const { name, value, type, checked } = e.target;
      return { ...preData, [name]: type === "checkbox" ? checked : value };
    });
  };

  // week3 - 新增產品api+編輯產品api
  const createOrUpdateProduct = async (id: string) => {
    let url = `/v2/api/${API_PATH}/admin/product`;
    let method: "post" | "put" = "post";
    if (modalType === "edit") {
      url = `/v2/api/${API_PATH}/admin/product/${id}`;
      method = "put";
    }

    const productData = {
      data: {
        ...templateData,
        origin_price: Number(templateData.origin_price),
        price: Number(templateData.price),
        is_enabled: Number(templateData.is_enabled),
        imagesUrl: [
          ...templateData.imagesUrl.filter((url: string) => url !== ""),
        ],
      },
    };
    try {
      const token = document.cookie
        .split(";")
        .find((txt) => txt.startsWith("someCookieName="))
        ?.split("=")[1];
      if (token) {
        // axiosInstance.defaults.headers.common["Authorization"] = token;
        const config = { headers: { Authorization: token } };
        const response = await axiosInstance[method](url, productData, config);
        console.log(response.data.message);
        alert(response.data.message);
        fetchProducts();
        closeModal();
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  // week3 - 移除產品api
  const deleteProduct = async (id: string) => {
    try {
      const token = document.cookie
        .split(";")
        .find((txt) => txt.startsWith("someCookieName="))
        ?.split("=")[1];
      if (token) {
        // axiosInstance.defaults.headers.common["Authorization"] = token;
        const config = { headers: { Authorization: token } };
        const response = await axiosInstance.delete(
          `/v2/api/${API_PATH}/admin/product/${id}`,
          config,
        );
        console.log(response.data.message);
        // 移除產品後重新發送一次取得產品的request，讓畫面顯示最新的資料
        alert(response.data.message);
        fetchProducts();
        closeModal();
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };
  // week3 - 設定資料裡面的圖片array
  const handleModalImageChange = (index: number, value: string) => {
    setTemplateData((preData) => {
      const newImage = [...preData.imagesUrl];
      newImage[index] = value;
      if (
        value !== "" &&
        index === newImage.length - 1 &&
        newImage.length < 5
      ) {
        newImage.push("");
      }
      if (
        value === "" &&
        newImage.length > 1 &&
        newImage[newImage.length - 1] === ""
      ) {
        newImage.pop();
      }
      return { ...preData, imagesUrl: newImage };
    });
  };

  // week3 - 新增副圖片
  const handleAddImage = () => {
    setTemplateData((preData) => {
      const newImages = [...preData.imagesUrl];
      newImages.push("");
      return { ...preData, imagesUrl: newImages };
    });
  };

  // week3 - 移除副圖片
  const handleRemoveImage = () => {
    setTemplateData((preData) => {
      const newImages = [...preData.imagesUrl];
      newImages.pop();
      return { ...preData, imagesUrl: newImages };
    });
  };

  // week3 - 關閉鍵(Modal)
  const closeModal = () => {
    if (productModal.current) {
      productModal.current.hide();
    }
  };

  return (
    <div>
      <div
        tabIndex={-1}
        id="exampleModal"
        aria-hidden="true"
        ref={productModalRef}
        className="modal fade"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div
              className={`modal-header bg-${modalType === "delete" ? "danger" : "dark"} text-white`}
            >
              <h1 id="exampleModalLabel" className="modal-title fs-5">
                {modalType === "delete"
                  ? "刪除產品"
                  : modalType === "edit"
                    ? "編輯產品"
                    : "新增產品"}
              </h1>
              <button
                type="button"
                aria-label="Close"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {modalType === "delete" ? (
                <p className="fs-4">
                  確定要刪除
                  <span className="text-danger">{templateData.title}</span>嗎？
                </p>
              ) : (
                <div className="container">
                  <div className="row">
                    <div className="col-4">
                      {/* imageUrl */}
                      <form className="form-floating">
                        <input
                          type="text"
                          id="imageUrl"
                          placeholder=""
                          name="imageUrl"
                          className="form-control"
                          value={templateData.imageUrl}
                          onChange={(e) => {
                            handleModalInputChange(e);
                          }}
                        />
                        <label htmlFor="imageUrl">主圖片</label>
                        <img
                          alt=""
                          className="w-100"
                          src={templateData.imageUrl || undefined}
                        />
                      </form>
                      {/* imagesUrl */}
                      {templateData.imagesUrl &&
                        templateData.imagesUrl.map(
                          (url: string, index: number) => {
                            return (
                              <div key={index}>
                                <form className="form-floating mt-3">
                                  <input
                                    type="text"
                                    value={url}
                                    placeholder=""
                                    className="form-control"
                                    onChange={(e) => {
                                      handleModalImageChange(
                                        index,
                                        e.target.value,
                                      );
                                    }}
                                  />
                                  <img
                                    alt=""
                                    className="w-100"
                                    src={url || undefined}
                                  />
                                  <label htmlFor="imagesUrl1">
                                    輸入圖片網址
                                  </label>
                                </form>
                              </div>
                            );
                          },
                        )}
                      {templateData.imagesUrl.length < 5 &&
                        templateData.imagesUrl[
                          templateData.imagesUrl.length - 1
                        ] !== "" && (
                          <button
                            type="button"
                            onClick={handleAddImage}
                            className="btn btn-outline-primary w-100"
                          >
                            新增圖片
                          </button>
                        )}

                      {templateData.imagesUrl.length >= 1 && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="btn btn-outline-danger w-100"
                        >
                          刪除圖片
                        </button>
                      )}
                    </div>
                    <div className="col">
                      {/* title */}
                      <form className="form-floating mb-3 was-validated">
                        <input
                          required
                          id="title"
                          type="text"
                          name="title"
                          placeholder=""
                          className="form-control"
                          value={templateData.title}
                          onChange={(e) => {
                            handleModalInputChange(e);
                          }}
                        />
                        <label htmlFor="title">產品名稱(必填)</label>
                        <div className="invalid-feedback">
                          Please enter a message in the input.
                        </div>
                      </form>
                      <div className="row">
                        <div className="col mb-3">
                          {/* category */}
                          <form className="form-floating was-validated">
                            <input
                              required
                              type="text"
                              id="category"
                              placeholder=""
                              name="category"
                              className="form-control"
                              value={templateData.category}
                              onChange={(e) => {
                                handleModalInputChange(e);
                              }}
                            />
                            <label htmlFor="category" className="form-label">
                              分類(必填)
                            </label>
                            <div className="invalid-feedback">
                              Please enter a message in the input.
                            </div>
                          </form>
                        </div>
                        <div className="col mb-3">
                          {/* unit */}
                          <form className="form-floating was-validated">
                            <input
                              required
                              id="unit"
                              name="unit"
                              type="text"
                              placeholder=""
                              className="form-control"
                              value={templateData.unit}
                              onChange={(e) => {
                                // setUnit(e.target.value);
                                handleModalInputChange(e);
                              }}
                            />
                            <label htmlFor="unit">單位(必填)</label>
                            <div className="invalid-feedback">
                              Please enter a message in the input.
                            </div>
                          </form>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col mb-3">
                          {/* origin_price */}
                          <form className="form-floating was-validated">
                            <input
                              required
                              type="number"
                              placeholder=""
                              id="origin_price"
                              name="origin_price"
                              className="form-control"
                              value={templateData.origin_price}
                              onChange={(e) => {
                                // setOriginalPrice(Number.parseInt(e.target.value));
                                handleModalInputChange(e);
                              }}
                            />
                            <label htmlFor="original_price">原價(必填)</label>
                            <div className="invalid-feedback">
                              Please enter a message in the input.
                            </div>
                          </form>
                        </div>
                        <div className="col mb-3">
                          {/* price */}
                          <form className="form-floating was-validated">
                            <input
                              required
                              id="price"
                              name="price"
                              type="number"
                              placeholder=""
                              className="form-control"
                              value={templateData.price}
                              onChange={(e) => {
                                handleModalInputChange(e);
                              }}
                            />
                            <label htmlFor="price">售價(必填)</label>
                            <div className="invalid-feedback">
                              Please enter a message in the input.
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* description */}
                      <form className="form-floating mb-3">
                        <input
                          type="text"
                          placeholder=""
                          id="description"
                          name="description"
                          className="form-control"
                          value={templateData.description}
                          onChange={(e) => {
                            handleModalInputChange(e);
                          }}
                        />
                        <label htmlFor="description">介紹</label>
                      </form>

                      {/* content */}
                      <form className="form-floating mb-3">
                        <input
                          type="text"
                          id="content"
                          name="content"
                          placeholder=""
                          className="form-control"
                          value={templateData.content}
                          onChange={(e) => {
                            // setContent(e.target.value);
                            handleModalInputChange(e);
                          }}
                        />
                        <label htmlFor="content">內容</label>
                      </form>

                      {/* is_enabled */}
                      <form className="form-check mb-3">
                        <input
                          placeholder=""
                          // type="number"
                          type="checkbox"
                          id="is_enabled"
                          name="is_enabled"
                          // className="form-control"
                          className="form-check-input"
                          onChange={(e) => {
                            handleModalInputChange(e);
                          }}
                        />
                        <label
                          htmlFor="is_enabled"
                          className="form-check-label"
                        >
                          是否啟用
                        </label>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={() => {
                  closeModal();
                }}
              >
                取消
              </button>
              <button
                type="button"
                className={`btn btn-${modalType === "delete" ? "danger" : "primary"}`}
                onClick={() => {
                  (modalType === "delete"
                    ? deleteProduct
                    : createOrUpdateProduct)(templateData.id);
                }}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModalComponent;
