import { LayoutGroup } from "framer-motion";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import { arrayMoveImmutable } from "array-move";

export const PlayerHandContext = createContext<any | null>(null);

const EXAMPLE_CARDS = [
  {
    id: "1-SPADE-1",
    value: "1",
    suit: "SPADE",
  },
  {
    id: "2-SPADE-2",
    value: "2",
    suit: "SPADE",
  },
  {
    id: "3-SPADE-3",
    value: "3",
    suit: "SPADE",
  },
  {
    id: "4-SPADE-4",
    value: "4",
    suit: "SPADE",
  },
  {
    id: "5-SPADE-5",
    value: "5",
    suit: "SPADE",
  },
  {
    id: "6-SPADE-6",
    value: "6",
    suit: "SPADE",
  },
  {
    id: "7-SPADE-7",
    value: "7",
    suit: "SPADE",
  },
  {
    id: "8-SPADE-8",
    value: "8",
    suit: "SPADE",
  },
  {
    id: "9-SPADE-9",
    value: "9",
    suit: "SPADE",
  },
  {
    id: "10-SPADE-10",
    value: "10",
    suit: "SPADE",
  },
];

function isColliding(source: any, sample: any) {
  return (
    source.x > sample.x.min &&
    source.x < sample.x.max &&
    source.y > sample.y.min &&
    source.y < sample.y.max
  );
}

export function PlayerHand() {
  const [cards, setCards] = useState(EXAMPLE_CARDS);
  const [isReordering, setIsReordering] = useState(false);
  const positions = useRef<any[]>([]);
  const setPosition = (index: number, position: any) => {
    positions.current[index] = position;
  };

  const moveItem = (currentIndex: number, currentPoint: Object) => {
    const collidingIndices = [];
    for (
      let positionIndex = 0;
      positionIndex < positions.current.length;
      positionIndex++
    ) {
      if (currentIndex === positionIndex) {
        continue;
      }
      if (isColliding(currentPoint, positions.current[positionIndex])) {
        collidingIndices.push(positionIndex);
      }
    }
    if (collidingIndices.length > 0) {
      positions.current = arrayMoveImmutable(
        positions.current,
        currentIndex,
        collidingIndices[0]
      );

      setCards(arrayMoveImmutable(cards, currentIndex, collidingIndices[0]));
    }
  };

  return (
    <>
      <LayoutGroup>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            {...card}
            index={index}
            setCardPosition={setPosition}
            moveItem={moveItem}
            isReordering={isReordering}
          />
        ))}
      </LayoutGroup>
    </>
  );
}
