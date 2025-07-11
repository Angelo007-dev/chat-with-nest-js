import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, retry } from "rxjs";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private relfector: Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.relfector.getAllAndMerge<string[]>(
            ROLES_KEY,
            [context.getHandler(),context.getClass()],
        );
        if(!requiredRoles || requiredRoles.length === 0 ){
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        return requiredRoles.includes(user.role);
    }
}