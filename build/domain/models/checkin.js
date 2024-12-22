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
exports.Checkin = void 0;
const typeorm_1 = require("typeorm");
const participant_1 = require("./participant");
const activity_1 = require("./activity");
let Checkin = class Checkin {
    constructor(participant, activity) {
        this.participant = participant;
        this.activity = activity;
    }
};
exports.Checkin = Checkin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], Checkin.prototype, "idCheckin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => participant_1.Participant, participant => participant.checkins, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", participant_1.Participant)
], Checkin.prototype, "participant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => activity_1.Activity, activity => activity.checkins, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", activity_1.Activity)
], Checkin.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Checkin.prototype, "checkinDateTime", void 0);
exports.Checkin = Checkin = __decorate([
    (0, typeorm_1.Entity)({ name: 'Checkin' }),
    __metadata("design:paramtypes", [participant_1.Participant, activity_1.Activity])
], Checkin);
