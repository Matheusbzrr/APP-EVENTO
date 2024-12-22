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
exports.Activity = void 0;
const typeorm_1 = require("typeorm");
const checkin_1 = require("./checkin");
const speaker_1 = require("./speaker");
const areaOfExpertise_1 = require("./areaOfExpertise");
let Activity = class Activity {
    constructor(title, description, time, location) {
        this.title = title;
        this.description = description;
        this.time = time;
        this.location = location;
    }
};
exports.Activity = Activity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], Activity.prototype, "idActivity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Activity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 250 }),
    __metadata("design:type", String)
], Activity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Activity.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Activity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Activity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => checkin_1.Checkin, checkin => checkin.activity),
    __metadata("design:type", Array)
], Activity.prototype, "checkins", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => speaker_1.Speaker, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Activity.prototype, "speaker", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => areaOfExpertise_1.AreaOfExpertise, areaOfExpertise => areaOfExpertise.activity, { onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Activity.prototype, "areaOfExpertise", void 0);
exports.Activity = Activity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Activity' }),
    __metadata("design:paramtypes", [String, String, String, String])
], Activity);
