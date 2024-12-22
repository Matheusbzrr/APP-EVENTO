"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveActivity = void 0;
const typeorm_1 = require("typeorm");
const participant_1 = require("./participant");
const activity_1 = require("./activity");
let SaveActivity = class SaveActivity {
    constructor(participant, activity) {
        this.participant = participant;
        this.activity = activity;
    }
};
exports.SaveActivity = SaveActivity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], SaveActivity.prototype, "idSaveActivity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => participant_1.Participant, participant => participant.saveActivits, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", participant_1.Participant)
], SaveActivity.prototype, "participant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => activity_1.Activity, activity => activity.saveActivits, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", activity_1.Activity)
], SaveActivity.prototype, "activity", void 0);
exports.SaveActivity = SaveActivity = __decorate([
    (0, typeorm_1.Entity)({ name: 'SaveActivity' }),
    __metadata("design:paramtypes", [participant_1.Participant, activity_1.Activity])
], SaveActivity);
