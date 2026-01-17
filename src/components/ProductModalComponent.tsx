import type { productType } from "../types/productType";

const ProductModalComponent = ({
  templateData,
  selectedProduct,
  productModalRef,
  productModal,
  modalType,
  setTemplateData,
  fetchProducts,
  axiosInstance,
  API_PATH,
}: any) => {
  // week3 - 設定 input onChange 的 function
  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateData((preData) => {
      const { name, value, type, checked } = e.target;
      return { ...preData, [name]: type === "checkbox" ? checked : value };
    });
  };

  // week3 - 新增產品api
  const createProduct = async (data: Omit<productType, "id" | "num">) => {
    try {
      const token = document.cookie
        .split(";")
        .find((txt) => txt.startsWith("someCookieName="))
        ?.split("=")[1];
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token;
        const response = await axiosInstance.post(
          `/v2/api/${API_PATH}/admin/product`,
          {
            data: data,
          },
        );
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // week3 - 編輯產品api
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

  // week3 - 確認鍵(新增產品or更新產品)
  const handleConfirm = (productId, modalType, data) => {
    if (modalType === "create") {
      createProduct(data);
    }
    if (modalType === "edit") {
      updateProduct(productId, data);
    }
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
            <div className="modal-header">
              <h1 id="exampleModalLabel" className="modal-title fs-5">
                編輯資料
              </h1>
              <button
                type="button"
                aria-label="Close"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
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
                          // setImageUrl(e.target.value);
                          handleModalInputChange(e);
                        }}
                      />
                      <label htmlFor="imageUrl">主圖片</label>
                      <img
                        alt=""
                        className="w-100"
                        src={templateData.imageUrl}
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
                                <label htmlFor="imagesUrl1">輸入圖片網址</label>
                              </form>
                            </div>
                          );
                        },
                      )}
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="btn btn-outline-primary w-100"
                    >
                      新增圖片
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="btn btn-outline-danger w-100"
                    >
                      刪除圖片
                    </button>
                  </div>
                  <div className="col">
                    {/* title */}
                    <form className="form-floating mb-3">
                      <input
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
                      <label htmlFor="title">產品名稱(標題)</label>
                    </form>
                    <div className="row">
                      <div className="col mb-3">
                        {/* category */}
                        <form className="form-floating">
                          <input
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
                          <label htmlFor="category">分類(必填)</label>
                        </form>
                      </div>
                      <div className="col mb-3">
                        {/* unit */}
                        <form className="form-floating">
                          <input
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
                        </form>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col mb-3">
                        {/* origin_price */}
                        <form className="form-floating">
                          <input
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
                        </form>
                      </div>
                      <div className="col mb-3">
                        {/* price */}
                        <form className="form-floating">
                          <input
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
                    <form className="form-floating mb-3">
                      <input
                        type="text"
                        placeholder=""
                        id="is_enabled"
                        name="is_enabled"
                        className="form-control"
                        checked={templateData.is_enabled}
                        onChange={(e) => {
                          // setIsEnabled(e.target.value);
                          handleModalInputChange(e);
                        }}
                      />
                      <label htmlFor="is_enabled">是否啟用</label>
                    </form>
                  </div>
                </div>
              </div>
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
                className="btn btn-primary"
                onClick={() => {
                  handleConfirm(selectedProduct?.id, modalType, {
                    title: templateData.title,
                    category: templateData.category,
                    origin_price: Number.parseInt(templateData.origin_price),
                    price: Number.parseInt(templateData.price),
                    unit: templateData.unit,
                    description: templateData.description,
                    content: templateData.content,
                    is_enabled: templateData.is_enabled,
                    imageUrl: templateData.imageUrl,
                    imagesUrl: [
                      templateData.imagesUrl1,
                      templateData.imagesUrl2,
                      templateData.imagesUrl3,
                      templateData.imagesUrl4,
                      templateData.imagesUrl5,
                    ],
                  });
                  productModal.current?.hide();
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
