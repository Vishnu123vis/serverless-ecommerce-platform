import rawItemData from './rawData';
//@ts-ignore
import { ItemsRecord, itemGroup } from '@libs/types/dyno';

const seedDataGenerator = (): ItemsRecord[] => {
    const records: ItemsRecord[] = [];

    for (const [category, categoryData] of Object.entries(rawItemData)) {
        for (const [type, typeData] of Object.entries(categoryData)) {
            for (const [brand, itemArray] of Object.entries(typeData as Record<string, ItemsRecord[]>)) {
                for (const item of itemArray) {
                    const fullItemData: ItemsRecord = {
                        ...item,
                        pk: category as itemGroup,
                        sk: `${type}#${brand}#${item.id}`
                    };
                    records.push(fullItemData);
                }
            }
        }
    }
    return records;
}

export default seedDataGenerator;