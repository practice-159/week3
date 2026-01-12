<p>
  <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*poaGV4iICp06Q-yTlA2g_g.png" alt="React"/>
</p>

# 使用語言

React + TypeScript + Vite

### 專案結構

```
week2/
├── src/
│   ├── App.jsx             # 主元件
│   ├── main.jsx            # 應用程式入口
│   ├── components/
│   │   ├── Card.jsx        # 產品介紹元件
│   │   ├── Login.jsx       # 登入元件
│   │   └── Table.jsx       # 全部產品主元件
│   └── type/
│   │   └── productType.jsx # 產品型別
│   └── styles/
│       └── style.css       # 樣式
├── index.html              # HTML 模板
├── package.json            # 專案設定
└── vite.config.js          # Vite 設定
```

### 稍微修改

1. 使用全域的baseURL
2. 使用useEffect在登入時檢查登入狀態
