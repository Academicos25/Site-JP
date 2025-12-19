const express = require("express");
const cors = require("cors");
const multer = require("multer");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* CONFIG UPLOAD */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

/* ROTA - LISTAR IMAGENS */
app.get("/imagens", (req, res) => {
  db.query("SELECT * FROM imagens", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

/* ROTA - UPLOAD */
app.post("/upload", upload.single("imagem"), (req, res) => {
  const imagem = req.file.filename;

  db.query("INSERT INTO imagens (imagem) VALUES (?)", [imagem]);

  res.json({ sucesso: true });
});
/* ROTA - Login */
const login = require("./auth");
app.post("/login", login);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

/* ROTA - NEWSLETTER */
const form = document.getElementById("newsletterForm");
const msg = document.getElementById("newsletterMsg");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("newsletterEmail").value;


    fetch("http://localhost:3000/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })
    .then(res => res.json())
    .then(data => {
      if (data.sucesso) {
        msg.innerText = "✅ Email cadastrado com sucesso!";
        msg.style.color = "#4cff9f";
        form.reset();
      } else {
        msg.innerText = "❌ Erro ao cadastrar email";
        msg.style.color = "#ff6b6b";
      }
    })
    .catch(() => {
      msg.innerText = "❌ Erro de conexão";
      msg.style.color = "#ff6b6b";
    });
  });
}
