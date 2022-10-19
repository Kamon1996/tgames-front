import { useEffect, useRef, useState } from "react";

type Props = {
  isFetching: boolean;
  content?: [] | any[];
  setContent?: (content: any[]) => void;
  maxHeightScrollBottom?: number;
};

export const useScrollBottom = ({
  isFetching,
  content,
  setContent,
  maxHeightScrollBottom = 700,
}: Props) => {
  const scrollableRef = useRef<null | HTMLDivElement>(null);
  const targetRef = useRef<null | HTMLDivElement>(null);

  const [scrolledToBottom, setScrolledToBottom] = useState<boolean>(false);

  const resetScrolledBottom = () => {
    setScrolledToBottom(false);
    setContent && setContent([]);
  };

  const scrollToBottom = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!scrollableRef.current) return;
    if (!content?.length) return;
    if (isFetching) return;
    const height = scrollableRef.current?.getBoundingClientRect().height;
    const maxScrollHeight = scrollableRef.current?.scrollHeight;
    const clientHeight = scrollableRef.current.clientHeight;
    const scrollTop = scrollableRef.current?.scrollTop;
    if (!scrolledToBottom) {
      scrollableRef.current.scrollTop = maxScrollHeight - clientHeight;
      setScrolledToBottom(true);
    } else if (maxScrollHeight - scrollTop - height < maxHeightScrollBottom) {
      scrollToBottom();
    }
  }, [isFetching, content, maxHeightScrollBottom]);

  return {
    content,
    setContent,
    scrollToBottom,
    targetRef,
    scrollableRef,
    resetScrolledBottom,
  };
};
