import axios from "axios";

import type { productType } from "../types/productType";

const ProductModalComponent = ({
  templateData,
  selectedProduct,
  productModalRef,
  productModal,
  modalType,
  setTemplateData,
  updateProduct,
  fetchProducts,
  createProduct,
}: any) => {
  // .env 的資訊
  const API_BASE_URL = import.meta.env.VITE_API_BASE;
  const API_PATH = import.meta.env.VITE_API_PATH;
  // * 設定全域baseURL
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  // week3 - 設定 input onChange 的 function
  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateData((preData) => {
      const { name, value, type, checked } = e.target;
      return { ...preData, [name]: type === "checkbox" ? checked : value };
    });
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
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={productModalRef}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                編輯資料
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
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
                        className="form-control"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder=""
                        value={templateData.imageUrl}
                        onChange={(e) => {
                          // setImageUrl(e.target.value);
                          handleModalInputChange(e);
                        }}
                      />
                      <label htmlFor="imageUrl">主圖片</label>
                      <img
                        src={templateData.imageUrl}
                        className="w-100"
                        alt=""
                      />
                    </form>
                    {/* imagesUrl */}
                    {templateData.imagesUrl &&
                      templateData.imagesUrl.map(
                        (url: string, index: number) => {
                          return (
                            <div key={index}>
                              <form className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  // id="imagesUrl1"
                                  // name="imagesUrl1"
                                  placeholder=""
                                  value={url}
                                  onChange={(e) => {
                                    handleModalImageChange(
                                      index,
                                      e.target.value,
                                    );
                                  }}
                                />
                                <img src={url} alt="" className="w-100" />
                                <label htmlFor="imagesUrl1">輸入圖片網址</label>
                              </form>
                            </div>
                          );
                        },
                      )}
                    <button type="button" onClick={handleAddImage}>
                      新增圖片
                    </button>
                    <button type="button" onClick={handleRemoveImage}>
                      刪除圖片
                    </button>
                  </div>
                  <div className="col">
                    {/* title */}
                    <form className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder=""
                        value={templateData.title}
                        onChange={(e) => {
                          handleModalInputChange(e);
                          console.log(templateData.title);
                        }}
                      />
                      <label htmlFor="title">產品名稱</label>
                    </form>
                    <div className="row">
                      <div className="col mb-3">
                        {/* category */}
                        <form className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="category"
                            name="category"
                            placeholder=""
                            value={templateData.category}
                            onChange={(e) => {
                              // setCategory(e.target.value);
                              handleModalInputChange(e);
                            }}
                          />
                          <label htmlFor="category">分類</label>
                        </form>
                      </div>
                      <div className="col mb-3">
                        {/* unit */}
                        <form className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="unit"
                            name="unit"
                            placeholder=""
                            value={templateData.unit}
                            onChange={(e) => {
                              // setUnit(e.target.value);
                              handleModalInputChange(e);
                            }}
                          />
                          <label htmlFor="unit">單位</label>
                        </form>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col mb-3">
                        {/* origin_price */}
                        <form className="form-floating">
                          <input
                            type="number"
                            className="form-control"
                            id="origin_price"
                            name="origin_price"
                            placeholder=""
                            value={templateData.origin_price}
                            onChange={(e) => {
                              // setOriginalPrice(Number.parseInt(e.target.value));
                              handleModalInputChange(e);
                            }}
                          />
                          <label htmlFor="original_price">原價</label>
                        </form>
                      </div>
                      <div className="col mb-3">
                        {/* price */}
                        <form className="form-floating">
                          <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            placeholder=""
                            value={templateData.price}
                            onChange={(e) => {
                              // setPrice(Number.parseInt(e.target.value));
                              handleModalInputChange(e);
                            }}
                          />
                          <label htmlFor="price">售價</label>
                        </form>
                      </div>
                    </div>
                    {/* description */}
                    <form className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder=""
                        value={templateData.description}
                        onChange={(e) => {
                          // setDescription(e.target.value);
                          handleModalInputChange(e);
                        }}
                      />
                      <label htmlFor="description">介紹</label>
                    </form>

                    {/* content */}
                    <form className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="content"
                        name="content"
                        placeholder=""
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
                        className="form-control"
                        id="is_enabled"
                        name="is_enabled"
                        placeholder=""
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
                type="button"
                className="btn btn-secondary"
                // data-bs-dismiss="modal"
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
                  console.log("編輯成功");
                  console.log(selectedProduct?.id);
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
