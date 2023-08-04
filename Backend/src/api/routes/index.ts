import auth from "./auth.routes";
import restourantRoutes from "./restourant.routes";
import foodRoutes from "./food.routes";
import userRoutes from "./user.routes";
import restaurantCouriersRoutes from "./restaurant-courier.routes";
import adminRoutes from "./admin.routes";
import ratingRoutes from "./rating.routes";
import orderRoutes from "./order.routes";
import paymentRoutes from "./payment.routes";

export default [
  auth,
  restaurantCouriersRoutes,
  adminRoutes,
  ratingRoutes,
  orderRoutes,
  paymentRoutes,
  orderRoutes
];