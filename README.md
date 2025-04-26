# Codigma MCP Server

Welcome to the **Codigma MCP Server** repository!

**Codigma MCP Server** is the backend service behind [Codigma.io](https://codigma.io) — a free tool that helps you easily turn any public Figma link into clean, semantic HTML and CSS.

You just paste your Figma link, and Codigma.io does the rest!

---

## 🔄 What You Can Do

- Fetch Figma public file data.
- Convert Figma designs into structured Codigma Models.
- Generate clean, semantic HTML and CSS code.
- Optionally generate TailwindCSS class-based HTML.
- Support for responsive design, fonts, borders, shadows, and gradients.

---

## 📚 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/rastmob/codigma-mcp-server.git
cd codigma-mcp-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add Figma API token

Create a `.env` file:

```plaintext
FIGMA_PERSONAL_ACCESS_TOKEN=your_figma_token_here
```

[How to get a Figma Token?](https://www.figma.com/developers/api#access-tokens)

### 4. Run the server

#### Development mode
```bash
npm run dev
```

#### Production mode
```bash
npm run build
npm start
```

---

## 🌐 Main API Endpoints

| Endpoint | Method | Description |
|:---|:---|:---|
| `/api/fetch-figma-data` | POST | Fetch public Figma file JSON data. |
| `/api/map-figma-node` | POST | Convert Figma Node to Codigma Model. |
| `/api/generate-html` | POST | Create HTML from Codigma Model. |
| `/api/generate-css` | POST | Create CSS from Codigma Model. |
| `/api/generate-bundle` | POST | Create full bundle (HTML + CSS). |
| `/api/figma-to-bundle` | POST | Full process from Figma URL to code output (supports TailwindCSS too). |

---

## 📅 Example

### POST `/api/figma-to-bundle`

**Request Body:**
```json
{
  "figmaUrl": "https://www.figma.com/file/abcd1234/Design-System?node-id=123%3A456",
  "outputType": "plain" // or "tailwind"
}
```

**Response:**
- Codigma Model (structured)
- HTML + CSS bundle (or TailwindCSS HTML)

---

## 🔧 Technology

- Node.js 18+
- Express 5
- TypeScript
- Axios
- Jest (for tests)
- ESLint (for code quality)

---

## 📊 Roadmap

- ✅ Fetch public Figma files
- ✅ TailwindCSS output option
- ✅ Font, border, shadow support
- ⬆️ Better responsive support
- ⬆️ OAuth login for private files
- ⬆️ Snapshot and versioning features
- ⬆️ Admin Dashboard

---

## 👤 About the Author

**Mehmet Alp**  
Founder of [Rast Mobile](https://www.rastmobile.com)

- GitHub: [@rastmob](https://github.com/rastmob)
- Email: mehmet.alp@rastmobile.com

---

## 📄 License

Licensed under the ISC License.

---

## 📈 Contributing

We welcome pull requests! 

> Fork the repo → Create a branch → Commit your changes → Open a pull request → Done! 📚

---

## 🐝 Reporting Bugs

Found a bug? Please open an issue [here](https://github.com/rastmob/codigma-mcp-server/issues).

Thanks for using **Codigma MCP Server**!  
And don't forget to try [Codigma.io](https://codigma.io) for FREE!
