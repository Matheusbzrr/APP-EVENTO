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
exports.Post = void 0;
const typeorm_1 = require("typeorm");
const participant_1 = require("./participant");
const like_1 = require("./like");
let Post = class Post {
    constructor(participant, imageUrl, description) {
        this.participant = participant;
        this.imageUrl = imageUrl;
        this.description = description;
    }
};
exports.Post = Post;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], Post.prototype, "idPost", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 300, nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 1000, nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_1.Like, like => like.post),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => participant_1.Participant, participant => participant.posts, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", participant_1.Participant)
], Post.prototype, "participant", void 0);
exports.Post = Post = __decorate([
    (0, typeorm_1.Entity)({ name: 'Post' }),
    __metadata("design:paramtypes", [participant_1.Participant, String, String])
], Post);
