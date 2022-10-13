import { useEffect, useRef, useState } from "react";

type Props = {
  isFetching: boolean;
  array: [] | any[];
  maxHeightScrollBottom?: number;
};

export const useScrollIntoView = ({
  isFetching,
  array,
  maxHeightScrollBottom = 700,
}: Props) => {
  const scrollableRef = useRef<null | HTMLDivElement>(null);
  const targetRef = useRef<null | HTMLDivElement>(null);

  const [scrolledToBottom, setScrolledToBottom] = useState<boolean>(false);

  const resetScrolledBottom = () => setScrolledToBottom(false);

  const scrollToBottom = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!scrollableRef.current) return;
    if (!array.length) return;

    const height = scrollableRef.current?.getBoundingClientRect().height;
    const maxScrollHeight = scrollableRef.current?.scrollHeight;
    const clientHeight = scrollableRef.current.clientHeight;
    const scrollTop = scrollableRef.current?.scrollTop;

    if (!isFetching && !scrolledToBottom) {
      scrollableRef.current.scrollTop = maxScrollHeight - clientHeight;
      setScrolledToBottom(true);
    } else if (maxScrollHeight - scrollTop - height < maxHeightScrollBottom) {
      scrollToBottom();
    }
  }, [isFetching, array, maxHeightScrollBottom]);

  return {
    scrollToBottom,
    targetRef,
    scrollableRef,
    resetScrolledBottom,
  };
};
