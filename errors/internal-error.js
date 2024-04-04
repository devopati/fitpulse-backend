import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class InternalError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export default InternalError;
