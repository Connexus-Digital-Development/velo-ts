import React from 'react';

export const editClassName = (ref: React.RefObject<HTMLElement | null>, conditions: boolean, additionalName: string): void => {
  if (ref && ref.current) {
    if (conditions) {
      ref.current.className = ref.current.className + " " + additionalName;
    } else {
      removeClassName(ref, additionalName);
    }
  }
};
export const removeClassName = (ref: React.RefObject<HTMLElement | null>, additionalName: string): void => {
  if (ref && ref.current) {
    ref.current.className = ref.current.className.replace(new RegExp(additionalName, 'g'), "");
  }
};

