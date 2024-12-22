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
exports.AreaOfExpertise = void 0;
const typeorm_1 = require("typeorm");
const participant_1 = require("./participant");
const activity_1 = require("./activity");
let AreaOfExpertise = class AreaOfExpertise {
    constructor(name) {
        this.name = name;
    }
};
exports.AreaOfExpertise = AreaOfExpertise;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], AreaOfExpertise.prototype, "idArea", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], AreaOfExpertise.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => participant_1.Participant, participant => participant.areaOfExpertise, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], AreaOfExpertise.prototype, "participant", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => activity_1.Activity, activity => activity.areaOfExpertise, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], AreaOfExpertise.prototype, "activity", void 0);
exports.AreaOfExpertise = AreaOfExpertise = __decorate([
    (0, typeorm_1.Entity)({ name: 'AreaOfExpertise' }),
    __metadata("design:paramtypes", [String])
], AreaOfExpertise);
