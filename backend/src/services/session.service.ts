import { cacheService } from "./index";

import { CacheKeys } from "../utils/cache-key";

export class SessionService {

    async saveRefreshToken(

        userId: string,

        deviceId: string,

        refreshToken: string

    ) {

        await cacheService.set(

            CacheKeys.refreshToken(

                userId,

                deviceId

            ),

            refreshToken,

            60 * 60 * 24 * 7

        );

    }

    async getRefreshToken(

        userId: string,

        deviceId: string

    ) {

        return cacheService.get<string>(

            CacheKeys.refreshToken(

                userId,

                deviceId

            )

        );

    }

    async deleteRefreshToken(

        userId: string,

        deviceId: string

    ) {

        await cacheService.delete(

            CacheKeys.refreshToken(

                userId,

                deviceId

            )

        );

    }

}