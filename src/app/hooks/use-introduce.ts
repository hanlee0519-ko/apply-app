import { useEffect, useState } from "react";

export default function useIntroduce() {
  const [introduction, setIntroduction] = useState<string>("");
  const [delayIntroduction, setDelayIntroduction] = useState<string>("");

  const maxLength = 300;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length <= maxLength) {
      setIntroduction(value);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayIntroduction(introduction);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [introduction]);

  return {
    introduction,
    delayIntroduction,
    handleChange,
    maxLength,
  };
}
