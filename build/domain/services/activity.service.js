"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const activity_repository_1 = __importDefault(require("../repositories/activity.repository"));
class ActivityService {
    getAllActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield activity_repository_1.default.findAll();
        });
    }
    createActivity(activityData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield activity_repository_1.default.create(activityData);
        });
    }
    deleteActivity(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield activity_repository_1.default.delete(id);
        });
    }
}
exports.default = new ActivityService();
