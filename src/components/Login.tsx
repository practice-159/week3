import axios from "axios";
import { Fragment, useState } from "react";

const Login = ({ fetchProducts, setIsAuthenticated, axiosInstance }: any) => {
  const DEFAULT_EMAIL = import.meta.env.VITE_EMAIL;
  const DEFAULT_PASSWORD = import.meta.env.VITE_PASSWORD;
  const [account, setAccount] = useState<{
    username: string;
    password: string;
  }>({
    username: DEFAULT_EMAIL,
    password: DEFAULT_PASSWORD,
  });
  // week1 - 帳號密碼
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount((preData) => {
      const { name, value } = e.target;
      return { ...preData, [name]: value };
    });
  };

  // week1 - 登入按鈕
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

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Login;
