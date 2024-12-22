"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const participant_routes_1 = __importDefault(require("./participant.routes"));
const areaOfExpertise_routes_1 = __importDefault(require("./areaOfExpertise.routes"));
const checkin_routes_1 = __importDefault(require("./checkin.routes"));
const activity_routes_1 = __importDefault(require("./activity.routes"));
const speaker_routes_1 = __importDefault(require("./speaker.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const like_routes_1 = __importDefault(require("./like.routes"));
const post_routes_1 = __importDefault(require("./post.routes"));
class Routes {
    constructor(app) {
        app.use("/appevento", participant_routes_1.default);
        app.use("/appevento", areaOfExpertise_routes_1.default);
        app.use("/appevento", checkin_routes_1.default);
        app.use("/appevento", activity_routes_1.default);
        app.use("/appevento", speaker_routes_1.default);
        app.use("/appevento", auth_routes_1.default);
        app.use("/appevento", like_routes_1.default);
        app.use("/appevento", post_routes_1.default);
    }
}
exports.default = Routes;
