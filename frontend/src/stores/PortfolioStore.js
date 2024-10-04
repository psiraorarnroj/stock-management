import { makeAutoObservable } from "mobx";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class PortfolioStore {
  isLoading = false;
  stock = [];
  portfolio = [];
  totalPurchasePrice = 0;
  totalMarketPrice = 0;
  profitLoss = 0;
  stockQuote = {};

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(value) {
    this.isLoading = value;
  }

  async handleRequest(requestFn) {
    this.setLoading(true);
    try {
      await requestFn();
    } catch (error) {
      console.error("Error during API request:", error);
    } finally {
      this.setLoading(false);
    }
  }

  fetchStock() {
    this.handleRequest(async () => {
      const response = await axios.get(`${API_URL}/stock`);
      this.stock = response?.data;
    });
  }

  fetchPortfolio() {
    this.handleRequest(async () => {
      let portfolio = [];
      const [stock, response] = await Promise.all([
        axios.get(`${API_URL}/stock`),
        axios.get(`${API_URL}/portfolio`),
      ]);
      response?.data?.forEach((res) => {
        const matchingData = stock.data.find((s) => s.symbol === res.symbol);
        let temp = { ...res };
        if (matchingData) {
          temp = {
            ...res,
            name: matchingData.name,
            marketPrice: matchingData.price,
          };
        }
        portfolio = [...portfolio, temp];
      });
      this.portfolio = portfolio;
      this.totalPurchasePrice = this.portfolio.reduce(
        (total, stock) => total + stock.purchasePrice * stock.quantity,
        0
      );
      this.totalMarketPrice = this.portfolio.reduce(
        (total, stock) => total + stock.marketPrice * stock.quantity,
        0
      );
      this.ProfitLoss = this.totalPurchasePrice - this.totalMarketPrice;
    });
  }

  fetchStockFromPortfolio(id) {
    this.handleRequest(async () => {
      const response = await axios.get(`${API_URL}/portfolio/${id}`);
      this.stockQuote = response?.data;
    });
  }

  addStock(stock) {
    this.handleRequest(async () => {
      await axios.post(`${API_URL}/portfolio`, stock);
      await this.fetchPortfolio();
    });
  }

  updateStock(id, stock) {
    this.handleRequest(async () => {
      await axios.put(`${API_URL}/portfolio/${id}`, stock);
      await this.fetchPortfolio();
    });
  }

  deleteStock(id) {
    this.handleRequest(async () => {
      await axios.delete(`${API_URL}/portfolio/${id}`);
      await this.fetchPortfolio();
      this.portfolio.filter((stock) => stock._id !== id);
    });
  }
}

const store = new PortfolioStore();
export default store;
