import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface StandardResponse<T = unknown> {
    timestamp: string;
    message: string;
    data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, StandardResponse<T>> {
    intercept(_ctx: ExecutionContext, next: CallHandler<T>): Observable<StandardResponse<T>> {
        return next.handle().pipe(
            map((response) => {
                const isObject =
                    response !== null &&
                    response !== undefined &&
                    typeof response === "object" &&
                    !Array.isArray(response);

                const message =
                    isObject && "message" in (response as object)
                        ? String((response as Record<string, unknown>).message)
                        : "Success";

                const data: unknown = (() => {
                    if (!isObject) return response;

                    const { message: _msg, ...rest } = response as Record<string, unknown>;
                    return Object.keys(rest).length > 0 ? rest : null;
                })();

                return {
                    timestamp: new Date().toISOString(),
                    message,
                    data: data as T,
                };
            }),
        );
    }
}
