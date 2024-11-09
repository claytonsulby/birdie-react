import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// const express = require("express");
// const app = express();
// app.use(express.json());
// app.use(express.static("react-app/dist"));
// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

// app.get("/api/feed/:food", (req, res) => {
//     const food = req.params.food;
//     if (food != "seed") {
//       res.status(404).send({ error: `Dummy! Birds don't eat ${food}s` });
//     } else {
//       res.send({ data: `Yummy! Birds love ${food}s` });
//     }
//   });