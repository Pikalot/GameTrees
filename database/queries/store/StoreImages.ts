import executeQuery from "@/database/mysqldb";
import ImageRow from "@/types/models/ImageRow";
import blobToBase64 from "@/utils/blobToBase64";
import RawImageRow from "@/types/models/RawImageRow"

// export class StoreImages {
//     // Returns a Promise containing an array of ImageRow type
//     public async getStoreImages(storeId: string): Promise<ImageRow[]> {
//         const query = `
//             SELECT
//                 P.spid AS photoId,
//                 P.image
//             FROM storePhotos P
//             WHERE P.sid = ?;
//             `;
//         const results = await executeQuery(query, [storeId]) as RawImageRow[];

//         if (!Array.isArray(results)) {
//             throw new Error("Invalid format");
//         }

//         const processedResults: ImageRow[] = results.map((result) => ({
//             ...result,
//             image: result.image ? blobToBase64(result.image) : undefined,
//         }));
//         return processedResults;
//     }
// }

export async function getStoreImages(storeId: string | number): Promise<ImageRow[] | undefined> {
    const query = `
        SELECT
                P.spid AS photoId,
                P.image
        FROM storePhotos P
        WHERE P.sid = ?;
    `;

    const values = [storeId];

    try {
        const result = await executeQuery(query, values) as RawImageRow[];

        if (result.length > 0 && result[0].image) {
            const processedResults: ImageRow[] = result.map((result) => ({
                ... result,
                image: result.image ? blobToBase64(result.image) : undefined,
            }));
            return processedResults;
        }
    }
    catch (error) {
        console.error("Error fetching store images:", error);
    }
}

export default getStoreImages;