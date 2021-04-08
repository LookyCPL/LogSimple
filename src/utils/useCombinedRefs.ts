import { useRef, useEffect, RefObject, MutableRefObject } from 'react';

export type Ref = ((instance: any) => void) | MutableRefObject<any> | undefined | null;

export const useCombinedRefs = (...refs: Ref[]): RefObject<any> => {
    const targetRef = useRef<any>();

    useEffect(() => {
        refs.forEach((ref) => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
};