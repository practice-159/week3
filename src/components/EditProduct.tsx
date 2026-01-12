import { useState } from "react";

const EditProduct = ({
  selectProduct,
  editProductModalRef,
  editProductModal,
  editProduct,
}: any) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [origin_price, setOriginalPrice] = useState(NaN);
  const [price, setPrice] = useState(NaN);
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [is_enabled, setIsEnabled] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagesUrl1, setImagesUrl1] = useState("");
  const [imagesUrl2, setImagesUrl2] = useState("");
  const [imagesUrl3, setImagesUrl3] = useState("");
  const [imagesUrl4, setImagesUrl4] = useState("");
  const [imagesUrl5, setImagesUrl5] = useState("");
  return (
    <div>
      <div
        className="modal fade"
        // id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={editProductModalRef}
      >
        <div className="modal-dialog">
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
              {/* title */}
              <form className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder=""
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <label htmlFor="title">產品名稱</label>
              </form>

              {/* category */}
              <form className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  placeholder=""
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
                <label htmlFor="floatingInputValue">分類</label>
              </form>

              {/* origin_price */}
              <form className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  id="original_price"
                  placeholder=""
                  value={origin_price}
                  onChange={(e) => {
                    setOriginalPrice(Number.parseInt(e.target.value));
                  }}
                />
                <label htmlFor="original_price">原價</label>
              </form>

              {/* price */}
              <form className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  placeholder=""
                  value={price}
                  onChange={(e) => {
                    setPrice(Number.parseInt(e.target.value));
                  }}
                />
                <label htmlFor="price">售價</label>
              </form>

              {/* unit */}
              <form className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="unit"
                  placeholder=""
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                />
                <label htmlFor="unit">單位</label>
              </form>

              {/* description */}
              <form className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder=""
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <label htmlFor="description">介紹</label>
              </form>

              {/* content */}
              <form className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  placeholder=""
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
                <label htmlFor="content">內容</label>
              </form>

              {/* is_enabled */}
              <form className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="is_enabled"
                  placeholder=""
                  value={is_enabled}
                  onChange={(e) => {
                    setIsEnabled(e.target.value);
                  }}
                />
                <label htmlFor="is_enabled">是否啟用</label>
              </form>

              {/* imageUrl */}
              <form className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="imageUrl"
                  placeholder=""
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                />
                <label htmlFor="imageUrl">主圖片</label>
              </form>

              {/* imagesUrl1 */}
              <form className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="imagesUrl1"
                  placeholder=""
                  value={imagesUrl1}
                  onChange={(e) => {
                    setImagesUrl1(e.target.value);
                  }}
                />
                <label htmlFor="imagesUrl">其他圖片1</label>
              </form>

              {/* imagesUrl2 */}
              <form className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="imagesUrl2"
                  placeholder=""
                  value={imagesUrl2}
                  onChange={(e) => {
                    setImagesUrl2(e.target.value);
                  }}
                />
                <label htmlFor="imagesUrl">其他圖片2</label>
              </form>
              {/* imagesUrl3 */}
              <form className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="imagesUrl3"
                  placeholder=""
                  value={imagesUrl3}
                  onChange={(e) => {
                    setImagesUrl3(e.target.value);
                  }}
                />
                <label htmlFor="imagesUrl">其他圖片3</label>
              </form>
              {/* imagesUrl4 */}
              <form className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="imagesUrl4"
                  placeholder=""
                  value={imagesUrl4}
                  onChange={(e) => {
                    setImagesUrl4(e.target.value);
                  }}
                />
                <label htmlFor="imagesUrl4">其他圖片4</label>
              </form>
              {/* imagesUrl5 */}
              <form className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="imagesUrl5"
                  placeholder=""
                  value={imagesUrl5}
                  onChange={(e) => {
                    setImagesUrl5(e.target.value);
                  }}
                />
                <label htmlFor="imagesUrl5">其他圖片5</label>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  console.log("編輯成功");
                  console.log(selectProduct?.id);
                  editProduct(selectProduct?.id, {
                    title,
                    category,
                    origin_price,
                    price,
                    unit,
                    description,
                    content,
                    is_enabled,
                    imageUrl,
                    imagesUrl: [
                      imagesUrl1,
                      imagesUrl2,
                      imagesUrl3,
                      imagesUrl4,
                      imagesUrl5,
                    ],
                  });
                  editProductModal.current?.hide();
                }}
              >
                新增產品
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
