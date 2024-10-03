import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/message/${selectedConversation._id}`, {
          signal,
        });

        if (!signal.aborted) {
          const data = await res.json();

          if (data.error) throw new Error(data.error);

          setMessages(data);
        }
      } catch (error) {
        if (!signal.aborted) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();

    return () => {
      abortController.abort();
    };
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
