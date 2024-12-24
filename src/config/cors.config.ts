import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      console.log("Request without Origin header accepted.");
      callback(null, true);
    } else {
      console.log("Origin received:", origin);
      callback(null, true);
    }
  },
};