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
const speaker_repository_1 = __importDefault(require("../repositories/speaker.repository"));
class SpeakerService {
    getAllSpeakers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield speaker_repository_1.default.findAll();
        });
    }
    createSpeaker(speakerData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield speaker_repository_1.default.create(speakerData);
        });
    }
    deleteSpeaker(idSpeaker) {
        return __awaiter(this, void 0, void 0, function* () {
            yield speaker_repository_1.default.delete(idSpeaker);
        });
    }
}
exports.default = new SpeakerService();
