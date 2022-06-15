import { useState, useEffect } from 'react';


const useWindowResize = () => {

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    // Debounce for optimized rendering
    const debounce = (fn, ms) => {
        let timer;
        return _ => {
            clearTimeout(timer)
            timer = setTimeout(_ => {
                timer = null
                fn();
            }, ms)
        };
    }


    useEffect(() => {
        const debouncedHandleResize = debounce(() => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }, 1000)
        window.addEventListener('resize', debouncedHandleResize)

        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)

        }
    })
    return { dimensions }
}

export default useWindowResize;