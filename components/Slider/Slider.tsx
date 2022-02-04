import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useGesture } from '@use-gesture/react';
import styles from './Slider.module.scss';
import { postEvent } from '../../utils/utils';

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

  function sendImageIndex(index: number) {

  }

  const handlers = useSwipeable({
    onSwipedLeft: () => postEvent({ type: 'image' , value: activeIndex + 1}),
    onSwipedRight: () => postEvent({ type: 'image' , value: activeIndex - 1}),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex(activeIndex + 1);
    }, 100000);

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
