const dev = {
  url: "http://localhost:3001/api",
};

const prod = {
  url: "https://fpltools-api.onrender.com/api",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
