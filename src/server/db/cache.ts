import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => Promise<any>;

export function cache<T extends Callback>(
  db: T,
  keyParts: (...args: Parameters<T>) => string[], // دالة تعيد مصفوفة من السلاسل النصية
  option: { revalidate?: number | false; tags?: string[] }
) {
  // تعديل هذا السطر لاستخدام `nextCache` مع دالة keyParts بشكل صحيح.
  return (...args: Parameters<T>) => {
    const key = keyParts(...args); // استدعاء الدالة مع البارامترات لتوليد المفتاح
    return nextCache(reactCache(db), key, option)(...args); // استخدام المفتاح مع `nextCache`
  };
}
