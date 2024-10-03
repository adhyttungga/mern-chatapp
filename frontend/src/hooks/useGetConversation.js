import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user", { signal });

        if (!signal.aborted) {
          const data = await res.json();

          if (data.error) {
            throw new Error(data.error);
          }

          setConversations(data);
        }
      } catch (error) {
        if (!signal.aborted) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getConversation();

    return () => {
      // Cancel the request when the component unmount
      abortController.abort();
    };
  }, []);

  return { loading, conversations };
};

export default useGetConversation;
