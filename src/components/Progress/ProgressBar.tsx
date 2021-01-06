import React, { CSSProperties, useState } from "react";

export type ProgressBarProps = {
  totalFrames: number;
  currentFrames: number;
  onChange?: (progress: number, isDraggingEnded?: boolean) => any;
};

// Styles
const inputContainerStyles: CSSProperties = {};
const inputStyles: CSSProperties = {
  width: "100%",
};

const ProgressBar = (props: ProgressBarProps) => {
  const { totalFrames, currentFrames, onChange } = props;
  const isListeningForChanges = onChange && typeof onChange === "function";
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);

  /**
   * Handle any changes
   * @param event
   */
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const newFrame = Number(event.target.value);

    if (isListeningForChanges) {
      setSelectedFrame(newFrame);
      onChange?.(newFrame);
    }
  };

  /**
   * Handle the last change
   */
  const onMouseUpHandler: React.MouseEventHandler<HTMLInputElement> = () => {
    if (isListeningForChanges && selectedFrame) {
      onChange?.(selectedFrame, true);
      setSelectedFrame(null);
    }
  };

  return (
    <div style={inputContainerStyles}>
      <input
        type="range"
        style={inputStyles}
        onChange={onChangeHandler}
        onMouseUp={onMouseUpHandler}
        min="0"
        max={totalFrames}
        step="1" // TODO: should allow a bigger step?
        value={currentFrames}
        defaultValue="0"
      />
    </div>
  );
};

export default ProgressBar;