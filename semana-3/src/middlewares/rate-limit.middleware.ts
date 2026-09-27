
import rateLimit from "express-rate-limit";

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 100,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    error: "Demasiadas solicitudes",
    message: "Has excedido el límite de solicitudes. Intenta nuevamente más tarde."
  }
});

