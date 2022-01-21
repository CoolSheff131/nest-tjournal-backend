import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { subscribeOn } from "rxjs";
import { UserService } from "src/user/user.service";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'test',
        })
    }
    async validate(payload: {sub: number; email: string}){
        const data = {id: payload.sub, email: payload.email}
        const user = await this.userService.findByCond(data)
        if(!user){
            throw new UnauthorizedException()
        }
        return {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
}