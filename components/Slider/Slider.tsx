import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './Slider.module.scss';

export const SliderItem = ({ children, width }: { children: React.ReactElement, width: number }) => {
  return (
    <div
      className={styles['slider-item']}
      style={{ width: width }}
    >
      {children}
    </div>
  )
}

export default function Slider({ children, width } : { children: React.ReactElement[] , width: number } ) {
  const [ activeIndex, setActiveIndex ] = useState(0);

  const updateIndex = async ( index: number ) => {
    let newIndex = index;
    if (newIndex < 0) {
      newIndex = children.length - 1;
    } else if (newIndex >= children.length) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  }

  const handleSwipe = async (index: number) => {
    // await fetch('http://localhost:3000/api/stream' , {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors', // no-cors, *cors, same-origin
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: 'same-origin', // include, *same-origin, omit
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ type: 'image' , value: index })
    // });
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(activeIndex + 1),
    onSwipedRight: () => handleSwipe(activeIndex - 1),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex(activeIndex + 1);
    }, 12000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div className={styles.slider}>
      <div
        {...handlers}
        className={styles['inner-slider']}
        style={{
          transform: `translateX(-${activeIndex * width}px)`,
          width: children.length * width,
        }}
      >
        {React.Children.map(children, (child, i) => React.cloneElement(child as React.ReactElement<any> , { width: width }))}
      </div>
    </div>
  )
}
