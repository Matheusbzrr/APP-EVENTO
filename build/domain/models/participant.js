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
exports.Participant = void 0;
const typeorm_1 = require("typeorm");
const checkin_1 = require("./checkin");
const post_1 = require("./post");
const areaOfExpertise_1 = require("./areaOfExpertise");
const like_1 = require("./like");
const saveActivity_1 = require("./saveActivity");
let Participant = class Participant {
    constructor(name, email, companyName, postPermission) {
        this.name = name;
        this.email = email;
        this.companyName = companyName;
        this.postPermission = postPermission;
    }
};
exports.Participant = Participant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], Participant.prototype, "idParticipant", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 300 }),
    __metadata("design:type", String)
], Participant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Participant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Participant.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], Participant.prototype, "postPermission", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => checkin_1.Checkin, checkin => checkin.participant),
    __metadata("design:type", Array)
], Participant.prototype, "checkins", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_1.Post, post => post.participant),
    __metadata("design:type", Array)
], Participant.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => saveActivity_1.SaveActivity, saveActivity => saveActivity.participant),
    __metadata("design:type", Array)
], Participant.prototype, "saveActivits", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => areaOfExpertise_1.AreaOfExpertise, areaofexpertise => areaofexpertise.participant, { onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Participant.prototype, "areaOfExpertise", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_1.Like, like => like.participant),
    __metadata("design:type", Array)
], Participant.prototype, "likes", void 0);
exports.Participant = Participant = __decorate([
    (0, typeorm_1.Entity)({ name: 'Participant' }),
    __metadata("design:paramtypes", [String, String, String, Number])
], Participant);
