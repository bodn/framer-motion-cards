import { Box, motion, PanInfo } from "framer-motion";
import { useEffect, useRef } from "react";

const CARD_ASSET_MAP: {
  [key: string]: URL;
} = {
  SPADE_1: new URL("../assets/cards/SPADE-1.svg", import.meta.url),
  SPADE_2: new URL("../assets/cards/SPADE-2.svg", import.meta.url),
  SPADE_3: new URL("../assets/cards/SPADE-3.svg", import.meta.url),
  SPADE_4: new URL("../assets/cards/SPADE-4.svg", import.meta.url),
  SPADE_5: new URL("../assets/cards/SPADE-5.svg", import.meta.url),
  SPADE_6: new URL("../assets/cards/SPADE-6.svg", import.meta.url),
  SPADE_7: new URL("../assets/cards/SPADE-7.svg", import.meta.url),
  SPADE_8: new URL("../assets/cards/SPADE-8.svg", import.meta.url),
  SPADE_9: new URL("../assets/cards/SPADE-9.svg", import.meta.url),
  SPADE_10: new URL("../assets/cards/SPADE-10.svg", import.meta.url),
};

export function Card({ value, suit, setCardPosition, index, moveItem }: any) {
  const measuredLayout = useRef<Box | null>(null);

  const handleDrag = (_: any, gesturePoint: PanInfo) => {
    const { velocity } = gesturePoint;

    if (velocity.x || velocity.y) {
      moveItem(index, gesturePoint.point);
    }
  };

  useEffect(() => {
    setCardPosition(index, measuredLayout.current);
  });

  return (
    <motion.img
      layout
      whileDrag={{ opacity: 0.8, zIndex: "4" }}
      className="card"
      src={CARD_ASSET_MAP[`${suit}_${value}`].toString()}
      drag
      dragSnapToOrigin
      onDrag={handleDrag}
      onLayoutMeasure={(measure) => {
        measuredLayout.current = measure;
      }}
    />
  );
}
