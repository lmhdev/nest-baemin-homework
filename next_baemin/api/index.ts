import { axiosClient } from "@/utils";

// ------ USERS ------ //

export const getAllUsers = async (
  page: string | number,
  limit: string | number
) => {
  return axiosClient.get("/users/list", {
    params: { page: page, limit: limit },
  });
};

export const getUserById = async (id: number | string) => {
  return axiosClient.get("/users", {
    params: { id: id },
  });
};

export const createUser = async (dataBody: any) => {
  return axiosClient.post("/users", dataBody);
};

export const updateUser = async (dataBody: any) => {
  return axiosClient.put("/users", dataBody);
};

// ------ RESTAURANTS ------ //

export const getAllRestaurants = async (
  page: string | number,
  limit: string | number
) => {
  return axiosClient.get("/restaurants/list", { params: { page, limit } });
};

export const getRestaurantById = async (id: number | string) => {
  return axiosClient.get("/restaurants", { params: { id } });
};

export const createRestaurant = async (dataBody: any) => {
  return axiosClient.post("/restaurants", dataBody);
};

export const updateRestaurant = async (dataBody: any) => {
  return axiosClient.put("/restaurants", dataBody);
};

// ------ MENUS ------ //

export const getAllMenus = async (
  page: string | number,
  limit: string | number
) => {
  return axiosClient.get("/menus/list", { params: { page, limit } });
};

export const getMenuById = async (id: number | string) => {
  return axiosClient.get("/menus", { params: { id } });
};

export const getMenuByRestaurantId = async (id: number | string) => {
  return axiosClient.get("/menus/restaurant", { params: { id } });
};

// ------ MENU ITEMS ------ //

export const getAllMenuItems = async (
  page: string | number,
  limit: string | number
) => {
  return axiosClient.get("/menu-items/list", { params: { page, limit } });
};

export const getMenuItemById = async (id: number | string) => {
  return axiosClient.get("/menu-items", { params: { id } });
};

export const getMenuItemByRestaurantId = async (id: number | string) => {
  return axiosClient.get("/menu-items/restaurant", { params: { id } });
};

// ------ CATEGORIES ------ //

export const getAllCategories = async () => {
  return axiosClient.get("/categories");
};

export const getCategoryById = async (id: number | string) => {
  return axiosClient.get("/categories", { params: { id } });
};

export const createCategory = async (dataBody: any) => {
  return axiosClient.post("/categories", dataBody);
};

export const updateCategory = async (dataBody: any) => {
  return axiosClient.put("/categories", dataBody);
};

// ------ MENU ITEM CATEGORIES ------ //

export const getAllMenuItemCategories = async (
  page: string | number,
  limit: string | number
) => {
  return axiosClient.get("/menu_item_categories/list", {
    params: { page, limit },
  });
};

export const getMenuItemCategoryById = async (id: number | string) => {
  return axiosClient.get("/menu_item_categories", { params: { id } });
};

export const createMenuItemCategory = async (dataBody: any) => {
  return axiosClient.post("/menu_item_categories", dataBody);
};

export const updateMenuItemCategory = async (dataBody: any) => {
  return axiosClient.put("/menu_item_categories", dataBody);
};

// ------ ORDERS ------ //

export const getAllOrders = async (
  page: string | number,
  limit: string | number
) => {
  return axiosClient.get("/orders/list", { params: { page, limit } });
};

export const getOrderById = async (id: number | string) => {
  return axiosClient.get("/orders", { params: { id } });
};

export const createOrder = async (dataBody: any) => {
  return axiosClient.post("/orders", dataBody);
};

export const updateOrder = async (dataBody: any) => {
  return axiosClient.put("/orders", dataBody);
};

// ------ ORDER ITEMS ------ //

export const getAllOrderItems = async (
  page: string | number,
  limit: string | number
) => {
  return axiosClient.get("/order_items/list", { params: { page, limit } });
};

export const getOrderItemById = async (id: number | string) => {
  return axiosClient.get("/order_items", { params: { id } });
};

export const createOrderItem = async (dataBody: any) => {
  return axiosClient.post("/order_items", dataBody);
};

export const updateOrderItem = async (dataBody: any) => {
  return axiosClient.put("/order_items", dataBody);
};

// ------ PAYMENTS ------ //

export const getAllPayments = async (
  page: string | number,
  limit: string | number
) => {
  return axiosClient.get("/payments/list", { params: { page, limit } });
};

export const getPaymentById = async (id: number | string) => {
  return axiosClient.get("/payments", { params: { id } });
};

export const createPayment = async (dataBody: any) => {
  return axiosClient.post("/payments", dataBody);
};

export const updatePayment = async (dataBody: any) => {
  return axiosClient.put("/payments", dataBody);
};

// ------ DELIVERY DETAILS ------ //

export const getAllDeliveryDetails = async (
  page: string | number,
  limit: string | number
) => {
  return axiosClient.get("/delivery_details/list", { params: { page, limit } });
};

export const getDeliveryDetailById = async (id: number | string) => {
  return axiosClient.get("/delivery_details", { params: { id } });
};

export const createDeliveryDetail = async (dataBody: any) => {
  return axiosClient.post("/delivery_details", dataBody);
};

export const updateDeliveryDetail = async (dataBody: any) => {
  return axiosClient.put("/delivery_details", dataBody);
};

// ------ REVIEWS ------ //

export const getAllReviews = async (
  page: string | number,
  limit: string | number
) => {
  return axiosClient.get("/reviews/list", { params: { page, limit } });
};

export const getReviewById = async (id: number | string) => {
  return axiosClient.get("/reviews", { params: { id } });
};

export const createReview = async (dataBody: any) => {
  return axiosClient.post("/reviews", dataBody);
};

export const updateReview = async (dataBody: any) => {
  return axiosClient.put("/reviews", dataBody);
};
