const dev = {
  url: "http://localhost:3001/api",
};

const prod = {
  url: "/prod/url",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
