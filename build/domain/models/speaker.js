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
exports.Speaker = void 0;
const typeorm_1 = require("typeorm");
const activity_1 = require("./activity");
let Speaker = class Speaker {
    constructor(name, description, role, company) {
        this.name = name;
        this.description = description;
        this.role = role;
        this.company = company;
    }
};
exports.Speaker = Speaker;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], Speaker.prototype, "idSpeaker", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Speaker.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Speaker.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Speaker.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], Speaker.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => activity_1.Activity, activity => activity.speaker, { onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Speaker.prototype, "activity", void 0);
exports.Speaker = Speaker = __decorate([
    (0, typeorm_1.Entity)({ name: 'Speaker' }),
    __metadata("design:paramtypes", [String, String, String, String])
], Speaker);
