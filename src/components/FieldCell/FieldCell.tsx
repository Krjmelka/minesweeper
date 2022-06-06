import React from "react";
import classnames from "classnames";
import {CELL_SIZE} from "../../constants";
import {TFieldCell, ECellType} from "../../types";
import "./FieldCell.scss";

type TFieldCellProps = TFieldCell & JSX.IntrinsicElements['rect'];

export const FieldCell = ({
  position: {x, y},
  type,
  number,
  userVisible,
  ...rest
}: TFieldCellProps) => {
  return (
    <g
      className="field"
      transform={`translate(${(x - 1) * CELL_SIZE}, ${(y - 1) * CELL_SIZE})`}
      {...rest}
    >
      <rect
        className={classnames("field-cell", {
            "visible": userVisible,
          "is-odd": !!((x + y) % 2),
        })}
        width={CELL_SIZE}
        height={CELL_SIZE}
      />
      {userVisible && type === ECellType.MINED && (
        <text dx={5} dy={9} className="field-text" fontSize="5" fill="red">
          💣
        </text>
      )}
      {type === ECellType.FLAGGED && <text dx={4} dy={9} className="field-text" fontSize="5" fill="red">
        🚩
      </text>}
      {userVisible && number && (
        <text dx={6} dy={9.5} className="field-text" fontSize="5" fill="black">
          {number}
        </text>
      )}
    </g>
  );
};
